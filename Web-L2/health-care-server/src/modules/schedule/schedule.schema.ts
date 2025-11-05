import z from 'zod';

export const createScheduleZodSchema = z.object({
  startDateTime: z.string(),
  endDateTime: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});
