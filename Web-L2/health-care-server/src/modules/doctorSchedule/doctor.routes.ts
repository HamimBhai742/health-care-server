import { Router } from 'express';
import { doctorScheduleController } from './doctor..schedulecontroller';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '@prisma/client';
import { validationRequest } from '../../middleware/validationRequest';
import { createDoctorScheduleZodSchema } from './doctor.schedule.schema';

const router = Router();
router.post(
  '/create-schedule',
  checkAuth(Role.DOCTOR),
  validationRequest(createDoctorScheduleZodSchema),
  doctorScheduleController.createDoctorSchedule
);

export const doctorScheduleRouter = router;
