import { addMinutes, addHours, format } from 'date-fns';
import { prisma } from '../../config/prisma.config';
import { pagination } from '../../utils/pagination';
import { gte } from 'zod';
const createSchedule = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;
  console.log(startDate, endDate, startTime, endTime);
  const intervalTime = 30;
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  const schedules = [];
  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, 'yyyy-MM-dd')}`,
          Number(startTime.split(':')[0])
        ),
        Number(startTime.split(':')[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, 'yyyy-MM-dd')}`,
          Number(endTime.split(':')[0])
        ),
        Number(endTime.split(':')[1])
      )
    );
    while (startDateTime < endDateTime) {
      const soltSatrtTime = startDateTime;
      const soltEndTime = addMinutes(startDateTime, intervalTime);
      const scheduleData = {
        startDateTime: soltSatrtTime,
        endDateTime: soltEndTime,
      };

      const isExsist = await prisma.schedule.findFirst({
        where: scheduleData,
      });

      if (!isExsist) {
        const schedule = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(schedule);
      }

      soltSatrtTime.setMinutes(soltSatrtTime.getMinutes() + intervalTime);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return schedules;
};

const getAllSchedule = async (filters: any, options: any) => {
  const { page, limit, skip } = pagination(options);
  const { filterStartDateTime, filterEndDateTime } = filters;
  const where: any = {
    AND: [
      filterStartDateTime && filterEndDateTime
        ? {
            startDateTime: {
              gte: filterStartDateTime,
            },
            endDateTime: {
              lte: filterEndDateTime,
            },
          }
        : undefined,
    ].filter(Boolean),
  };
  const schedules = await prisma.schedule.findMany({
    where,
    skip,
    take: limit,
  });

  const total = await prisma.schedule.count({
    where,
  });
  const metaData = {
    page,
    limit,
    total,
    totalPage: Math.ceil(total / limit),
  };
  return {
    schedules,
    metaData,
  };
};

const deleteSchedule = async (id: string) => {
  const schedule = await prisma.schedule.delete({
    where: {
      id,
    },
  });
  return schedule;
};

export const scheduleServices = {
  createSchedule,
  getAllSchedule,
  deleteSchedule,
};
