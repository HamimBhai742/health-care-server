import { Router } from 'express';
import { patientController } from './patient.controller';
import { validationRequest } from '../../middleware/validationRequest';
import { PatientZodeSchema } from './patient.schema';
import { fileUploader } from '../../utils/multer';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', patientController.getAllPatients);

router.get('/:id', patientController.getSinglePatient);

router.patch(
  '/update',
  fileUploader.upload.single('file'),
  validationRequest(PatientZodeSchema),
  checkAuth(Role.PATIENT),
  patientController.updatePatient
);

// router.patch('/update-and-create', patientController.updateAndCreatePatient);

export const patientRouter = router;
