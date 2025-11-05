import { prisma } from '../../config/prisma.config';
import { AppError } from '../../error/coustome.error';
import httpStatusCode from 'http-status-codes';
import { v4 as uuid } from 'uuid';
import { stripe } from '../../utils/stripe';
import { ENV } from '../../config/env';
import { IJWTPayload } from '../../types/interface';
import { pagination } from '../../utils/pagination';
import { AppointmentStatus, Role } from '@prisma/client';
const createAppoinment = async (user: IJWTPayload, payload: any) => {
  const isExsistPatient = await prisma.patient.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!isExsistPatient) {
    throw new AppError('Patient not found', httpStatusCode.NOT_FOUND);
  }
  const findDoctor = await prisma.doctor.findUnique({
    where: {
      id: payload.doctorId,
    },
  });

  if (!findDoctor) {
    throw new AppError('Doctor not found', httpStatusCode.NOT_FOUND);
  }

  const isBookedOrNot = await prisma.doctorSchedule.findFirst({
    where: {
      scheduleId: payload.scheduleId,
      doctorId: payload.doctorId,
      isBooked: false,
    },
  });

  if (!isBookedOrNot) {
    throw new AppError(
      'Schedule is already booked',
      httpStatusCode.BAD_REQUEST
    );
  }

  const videoCallLinkId = uuid();
  const data = {
    ...payload,
    videoCallLinkId,
    patientId: isExsistPatient.id,
  };
  console.log(data);

  return await prisma.$transaction(async (tx) => {
    const result = await tx.appointment.create({
      data,
    });

    await tx.doctorSchedule.update({
      where: {
        scheduleId_doctorId: {
          scheduleId: payload.scheduleId,
          doctorId: payload.doctorId,
        },
      },
      data: {
        isBooked: true,
      },
    });

    const transactionId = uuid();
    const payment = await tx.payment.create({
      data: {
        appointmentId: result.id,
        amount: findDoctor.apointmentFee,
        transactionId,
      },
    });

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: findDoctor.apointmentFee * 100,
    //   currency: 'usd',
    //   description: `Payment for appointment with Dr. ${findDoctor.name}`,
    //   automatic_payment_methods: {
    //     enabled: true,
    //   },

    // });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'bdt',
            product_data: {
              name: `Appointment with ${findDoctor.name}`,
            },
            unit_amount: findDoctor.apointmentFee * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        appointmentId: result.id,
        paymentId: payment.id,
      },
      mode: 'payment',
      success_url: `${
        ENV.CLIENT_URL || 'http://localhost:5000'
      }/success?appointmentId=${result.id}`,
      cancel_url: `${ENV.CLIENT_URL || 'http://localhost:5000'}/cancel`,
    });

    console.log(session);
    return { paymentUrl: session.url };
  });
};

const getMyAppoinments = async (
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
  const result = await prisma.appointment.findMany({
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

const getAllAppoinments = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const where: any = {
    AND: [filters && Object.keys(filters).length ? filters : undefined].filter(
      Boolean
    ),
  };
  const result = await prisma.appointment.findMany({
    where,
    skip: skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: { doctor: true, patient: true },
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

const updateAppoinment = async (
  appointmentId: string,
  status: AppointmentStatus,
  user: IJWTPayload
) => {
  const appoinmentData = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
    include: { doctor: true, patient: true },
  });

  if (!appoinmentData) {
    throw new AppError('Appoinment not found', httpStatusCode.NOT_FOUND);
  }
  if (user.role === Role.DOCTOR) {
    if (appoinmentData.doctor.email !== user.email) {
      throw new AppError(
        'You are not authorized to update this appoinment',
        httpStatusCode.FORBIDDEN
      );
    }
  }

  if (user.role === Role.PATIENT) {
    if (appoinmentData.patient.email !== user.email) {
      throw new AppError(
        'You are not authorized to update this appoinment',
        httpStatusCode.FORBIDDEN
      );
    }
  }

  const result = await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      status,
    },
  });
  return result;
};

export const appoinmentServices = {
  createAppoinment,
  getMyAppoinments,
  getAllAppoinments,
  updateAppoinment,
};
