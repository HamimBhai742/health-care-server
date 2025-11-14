import { PaymentStatus } from '@prisma/client';
import { prisma } from '../../config/prisma.config';
import { AppError } from '../../error/coustome.error';
import { IJWTPayload } from '../../types/interface';

const fetchDashboardData = (user: IJWTPayload) => {
  switch (user.role) {
    case 'ADMIN':
      return getAdminMetadata();
    case 'DOCTOR':
      return 'Doctor';
    case 'PATIENT':
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




export const metaServices = {
  fetchDashboardData,
};
