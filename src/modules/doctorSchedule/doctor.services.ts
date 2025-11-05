import httpStatusCode from 'http-status-codes';
import { prisma } from '../../config/prisma.config';
import { AppError } from '../../error/coustome.error';
import { DoctorSchedulePayload, IUserRequest } from '../../types/interface';

const createDoctorSchedule = async (
  user: IUserRequest,
  payload: DoctorSchedulePayload
) => {
  const { scheduleIds } = payload;
  console.log(user);
  // Step 1: Check if all IDs exist
  const existingSchedules = await prisma.schedule.findMany({
    where: {
      id: { in: scheduleIds },
    },
    select: { id: true },
  });

  // Step 2: Extract existing IDs
  const existingIds = existingSchedules.map((s) => s.id);

  // Step 3: Check for any invalid IDs
  const invalidIds = scheduleIds.filter((id) => !existingIds.includes(id));

  if (invalidIds.length > 0) {
    throw new AppError(
      `These schedule IDs do not exist: ${invalidIds.join(', ')}`,
      httpStatusCode.BAD_REQUEST
    );
  }

  const doctorData = await prisma.doctor.findUnique({
    where: {
      email: user?.email,
    },
  });
  if (!doctorData) {
    throw new AppError('Doctor not found', httpStatusCode.NOT_FOUND);
  }

  const doctorScheduleData = scheduleIds.map((scheduleId: string) => {
    return {
      doctorId: doctorData.id,
      scheduleId,
    };
  });
  const doctorSchedule = await prisma.doctorSchedule.createMany({
    data: doctorScheduleData,
  });
  return doctorSchedule;
};

export const doctorScheduleServices = {
  createDoctorSchedule,
};
