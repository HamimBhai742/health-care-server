import { prisma } from '../../config/prisma.config';
import { AppError } from '../../error/coustome.error';
import { IJWTPayload } from '../../types/interface';
import httpStatusCode from 'http-status-codes';

const createReview = async (user: IJWTPayload, payload: any) => {
  console.log(user,payload)
  const patientData = await prisma.patient.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!patientData) {
    throw new AppError('Patient not found', httpStatusCode.NOT_FOUND);
  }

  const appoinmentData = await prisma.appointment.findUnique({
    where: {
      id: payload.appointmentId,
    },
  });

  if (!appoinmentData) {
    throw new AppError('Appoinment not found', httpStatusCode.NOT_FOUND);
  }

  if (appoinmentData.patientId !== patientData.id) {
    throw new AppError(
      'You are not authorized to rate this appoinment',
      httpStatusCode.FORBIDDEN
    );
  }

  console.log(patientData)
  return await prisma.$transaction(async (tx) => {
    const result = await tx.review.create({
      data: {
        appointmentId: payload.appointmentId,
        patientId: patientData.id,
        doctorId: appoinmentData.doctorId,
        rating: payload.rating,
        comment: payload.comment,
      },
    });

    const avgRating = await tx.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        doctorId: appoinmentData.doctorId,
      },
    });
    console.log(avgRating);
    await tx.doctor.update({
      where: {
        id: appoinmentData.doctorId,
      },
      data: {
        avgRating: avgRating._avg.rating as number,
      },
    });

    return result;
  });
};

export const reviewServices = {
  createReview,
};
