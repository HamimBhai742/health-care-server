import { Request } from 'express';
import { prisma } from '../../config/prisma.config';
import { pagination } from '../../utils/pagination';
import { patientSearchFileds } from './patient.constain';
import { fileUploader } from '../../utils/multer';
import { IJWTPayload } from '../../types/interface';
import { AppError } from '../../error/coustome.error';
import httpStatusCode from 'http-status-codes';

const getAllPatients = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { search } = options;
  const searchTerm = patientSearchFileds.map((field) => ({
    [field]: {
      contains: search,
      mode: 'insensitive',
    },
  }));

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
      {
        isDeleted: false,
      },
    ].filter(Boolean),
  };
  const patients = await prisma.patient.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.patient.count({
    where,
  });
  return {
    data: patients,
    metaData: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSinglePatient = async (id: string) => {
  const patient = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  return patient;
};

const updatePatient = async (user: IJWTPayload, req: Request) => {
  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.profilePhoto = uploadToCloudinary?.secure_url;
  }
  const { medicalReport, patientHealthData, ...patientData } = req.body;
// console.log(medicalReport, patientHealthData, patientData)
  return await prisma.$transaction(async (tx) => {
    const patient = await tx.patient.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!patient) {
      throw new AppError('Patient not found', httpStatusCode.NOT_FOUND);
    }
    await tx.patient.update({
      where: {
        id: patient.id,
      },
      data: patientData,
    });
    if (patientHealthData) {
      await tx.patientHealthData.upsert({
        where: {
          patientId: patient.id,
        },
        update: patientHealthData,
        create: {
          ...patientHealthData,
          patientId: patient.id,
        },
      });
    }

    if (medicalReport) {
      await tx.medicalReport.create({
        data: {
          ...medicalReport,
          patientId: patient.id,
        },
      });
    }

    const result = await tx.patient.findUnique({
      where: {
        id: patient.id,
      },
      include: {
        PatientHealthData: true,
        MedicalReport: true,
      },
    });
    return result;
  });
};

const updateAndCreatePatient = async (user: IJWTPayload, payload: any) => {
  const { medicalReports, ...patientInfo } = payload;
  const patientData = await prisma.patient.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!patientData) {
    throw new AppError('Patient not found', httpStatusCode.NOT_FOUND);
  }

  return await prisma.$transaction(async (tx) => {
    const patient = await tx.patient.update({
      where: {
        id: patientData.id,
      },
      data: patientInfo,
    });
  });
};

export const patientServices = {
  getAllPatients,
  getSinglePatient,
  updatePatient,
  updateAndCreatePatient,
};
