import { app } from './../../app';
import { Doctor } from '@prisma/client';
import { prisma } from '../../config/prisma.config';
import { AppError } from '../../error/coustome.error';
import { pagination } from '../../utils/pagination';
import { doctorSearchFileds } from './doctors.constain';
import httpStatusCode from 'http-status-codes';
import { IDoctor } from './doctor.interface';
import { openai } from '../../utils/ask.ai';
import { parseAIResponse } from '../../utils/parse.json';

const getAllDoctors = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { search } = options;
  const searchTerm = doctorSearchFileds.map((field) => ({
    [field]: {
      contains: search,
      mode: 'insensitive',
    },
  }));

  console.log(options, filters, searchTerm);

  const where: any = {
    AND: [
      filters && Object.keys(filters).length
        ? filters?.specialties
          ? {
              doctorSpecialties: {
                some: {
                  specialities: {
                    title: filters?.specialties,
                  },
                },
              },
            }
          : filters
        : undefined,
      search && { OR: searchTerm },
    ].filter(Boolean),
  };
  const doctors = await prisma.doctor.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialities: true,
        },
      },
    },
  });
  return doctors;
};

const getSingleDoctor = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialities: true,
        },
      },
      doctorSchedules: {
        include: {
          schedule: true,
        },
      },
    },
  });
  return doctor;
};

const updateDoctor = async (id: string, payload: Partial<IDoctor>) => {
  const fiDoctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
  });

  if (!fiDoctor) {
    throw new AppError('Doctor not found', httpStatusCode.NOT_FOUND);
  }
  const { specialties, ...data } = payload;
  return await prisma.$transaction(async (tx) => {
    if (specialties && specialties.length > 0) {
      console.log(specialties);
      const deleteSpecialties = specialties.filter((s) => s.isDeleted);
      for (const speciality of deleteSpecialties) {
        await tx.doctorSpecialties.deleteMany({
          where: {
            doctorId: id,
            specialitiesId: speciality.specialtiyId,
          },
        });
      }
      const createSpecialties = specialties.filter((s) => !s.isDeleted);
      console.log(createSpecialties);
      for (const speciality of createSpecialties) {
        await tx.doctorSpecialties.create({
          data: {
            doctorId: id,
            specialitiesId: speciality.specialtiyId,
          },
        });
      }
    }
    const result = await tx.doctor.update({
      where: {
        id,
      },
      data,
      include: {
        doctorSpecialties: {
          include: {
            specialities: true,
          },
        },
      },
    });
    return result;
  });
};

const getDoctorSuggestions = async (payload: { symptoms: string }) => {
  if (!(payload && payload.symptoms)) {
    throw new AppError('symptoms is required', httpStatusCode.BAD_REQUEST);
  }
  const doctors = await prisma.doctor.findMany({
    include: {
      doctorSpecialties: {
        include: {
          specialities: true,
        },
      },
    },
  });

  console.log(doctors, payload);

  const promt = `
  You are a medical assistant AI. Based on the patient's symptoms, suggest the top 3 most suitable each doctor has specialties and years of experience.

  Only sugget doctors who are relevant to the given symptoms.

  Patient Symptoms: "${payload.symptoms}"

  Here is the doctor list:(in JSON format)
${JSON.stringify(doctors, null, 2)}

Return your response in JSON formate with full individual doctor details.
    `;

  const completion = await openai.chat.completions.create({
    model: 'z-ai/glm-4.5-air:free',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that provides  doctors suggestions based on patient symptoms.',
      },
      {
        role: 'user',
        content: promt,
      },
    ],
  });
  const result = parseAIResponse(
    completion.choices[0].message.content as string
  );
  console.log(completion.choices[0].message);
  return result;
};

const deleteDoctor = async (id: string) => {
  const result = await prisma.doctor.delete({
    where: {
      id,
    },
  });
  return result;
};

export const doctorServices = {
  getAllDoctors,
  updateDoctor,
  getSingleDoctor,
  deleteDoctor,
  getDoctorSuggestions,
};
