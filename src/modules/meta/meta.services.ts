import { PaymentStatus, Role } from '@prisma/client';
import { prisma } from '../../config/prisma.config';
import { AppError } from '../../error/coustome.error';
import { IJWTPayload } from '../../types/interface';

const fetchDashboardData = (user: IJWTPayload) => {
  switch (user.role) {
    case Role.ADMIN:
      return getAdminMetadata();
    case Role.DOCTOR:
      return getDoctorMetadata(user);
    case Role.PATIENT:
      return 'Patient';
    default:
      throw new AppError('Role not found', 404);
  }
};

const getAdminMetadata = async () => {
  const totalPatient = await prisma.patient.count();
  const totalDoctor = await prisma.doctor.count();
  const totalAppoinment = await prisma.appointment.count();
  const totalPrescription = await prisma.prescription.count();
  const totalPayment = await prisma.payment.count();

  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: PaymentStatus.PAID,
    },
  });

  const totalAppointPerMonth = await barchartData();
  const appoinmentsStatusCount = await pieChartData();
  return {
    totalPatient,
    totalDoctor,
    totalAppoinment,
    totalPrescription,
    totalPayment,
    totalRevenue,
    totalAppointPerMonth,
    appoinmentsStatusCount,
  };
};

const barchartData = async () => {
  const totalAppointPerMonth = await prisma.$queryRaw`
  SELECT DATE_TRUNC('month', "createdAt") AS month,
  CAST(COUNT(*) AS INTEGER) AS count
  FROM "appointments"
  GROUP BY month
  ORDER BY month ASC
  `;

  return totalAppointPerMonth;
};

const pieChartData = async () => {
  const appoinmentsStatusCount = await prisma.appointment.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  });

  const data = appoinmentsStatusCount.map(({ status, _count }) => ({
    status,
    count: _count.id,
  }));

  return data;
};

const getDoctorMetadata = async (user: IJWTPayload) => {
  const doctor = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const totalAppoinment = await prisma.appointment.count({
    where: {
      doctorId: doctor.id,
    },
  });

  const totalPatient = await prisma.appointment.groupBy({
    by: ['patientId'],
    _count: {
      id: true,
    },
    where: {
      doctorId: doctor.id,
    },
  });

  const totalreview = await prisma.review.count({
    where: {
      doctorId: doctor.id,
    },
  });

  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      appointment: {
        doctorId: doctor.id,
      },
      status: PaymentStatus.PAID,
    },
  });

  const appoinmentsStatusCount = await prisma.appointment.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
    where: {
      doctorId: doctor.id,
    },
  });

  const data = appoinmentsStatusCount.map(({ status, _count }) => ({
    status,
    count: _count.id,
  }));
  return {
    totalAppoinment,
    totalPatient,
    totalreview,
    totalRevenue,
    appoinmentStatusCount: data,
  };
};

export const metaServices = {
  fetchDashboardData,
};
