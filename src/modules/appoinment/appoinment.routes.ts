import { Router } from 'express';
import { appoinmentController } from './appoinment.controller';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '@prisma/client';

const router = Router();

router.get(
  '/my-appoinments',
  checkAuth(Role.PATIENT),
  appoinmentController.getMyAppoinments
);

router.get(
  '/',
  // checkAuth(Role.ADMIN),
  appoinmentController.getAllAppoinments
);

router.post(
  '/create',
  checkAuth(Role.PATIENT),
  appoinmentController.createAppoinment
);

router.patch(
  '/update/:appointmentId',
  checkAuth(Role.PATIENT),
  appoinmentController.updateAppoinment
);

export const appoinmentRouter = router;
