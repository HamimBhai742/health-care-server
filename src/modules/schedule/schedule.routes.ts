import { Router } from 'express';
import { scheduleController } from './schedule.controller';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '@prisma/client';
import { validationRequest } from '../../middleware/validationRequest';
import { createScheduleZodSchema } from './schedule.schema';

const router = Router();

router.get('/', scheduleController.getAllSchedule);

router.post(
  '/create-schedule',
  checkAuth(Role.ADMIN),
  validationRequest(createScheduleZodSchema),
  scheduleController.createSchedule
);

router.delete('/delete-schedule/:id', scheduleController.deleteSchedule);

export const scheduleRouter = router;
