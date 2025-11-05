import {
  AppointmentStatus,
  PaymentStatus,
  Prescription,
  Role,
} from '@prisma/client';
import { IJWTPayload } from '../../types/interface';
import { prisma } from '../../config/prisma.config';
import { AppError } from '../../error/coustome.error';
import httpStatusCode from 'http-status-codes';
import { pagination } from '../../utils/pagination';

const createPrescription = async (
  user: IJWTPayload,
  payload: Partial<Prescription>
) => {
  console.log(payload);
  const appoinmentData = await prisma.appointment.findUnique({
    where: {
      id: payload.appointmentId,
    },
    include: { doctor: true },
  });
  if (!appoinmentData) {
    throw new AppError('Appoinment not found', httpStatusCode.NOT_FOUND);
  }
  if (appoinmentData.status !== AppointmentStatus.COMPLETED) {
    throw new AppError('Appoinment is not completed', httpStatusCode.NOT_FOUND);
  }
  if (appoinmentData.paymentStatus !== PaymentStatus.PAID) {
    throw new AppError('Payment is not done', httpStatusCode.NOT_FOUND);
  }

  if (user.role === Role.DOCTOR) {
    if (appoinmentData.doctor.email !== user.email) {
      throw new AppError(
        'You are not authorized to create prescription',
        httpStatusCode.FORBIDDEN
      );
    }
  }

  const prescription = await prisma.prescription.create({
    data: {
      appointmentId: appoinmentData.id,
      patientId: appoinmentData.patientId,
      doctorId: appoinmentData.doctorId,
      flowUpDate: payload.flowUpDate || null,
      instructions: payload.instructions as string,
    },
  });
  return prescription;
};

const getMyPrescriptions = async (
  user: IJWTPayload,
  filters: any,
  options: any
) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const patient = await prisma.patient.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!patient) {
    throw new AppError('Patient not found', httpStatusCode.NOT_FOUND);
  }
  const where: any = {
    AND: [
      filters && Object.keys(filters).length ? filters : undefined,
      {
        patientId: patient.id,
      },
    ].filter(Boolean),
  };
  const result = await prisma.prescription.findMany({
    where,
    skip: skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: user.role === Role.PATIENT ? { doctor: true } : { patient: true },
  });

  const total = await prisma.appointment.count({
    where,
  });
  return {
    data: result,
    metaData: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const prescriptionServices = {
  createPrescription,
  getMyPrescriptions
};
