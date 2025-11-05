import { Router } from 'express';
import { prescriptionController } from './prescription.controller';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '@prisma/client';

const router = Router();

router.get(
  '/my-prescriptions',
  checkAuth(Role.PATIENT),
  prescriptionController.getMyPrescription
);

router.post(
  '/create',
  checkAuth(Role.DOCTOR),
  prescriptionController.createPrescription
);

export const prescriptionRouter = router;
