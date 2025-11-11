import { Router } from 'express';
import { userController } from './user.controller';
import { fileUploader } from '../../utils/multer';
import { validationRequest } from '../../middleware/validationRequest';
import {
  createAdminZodeSchema,
  createDoctorZodeSchema,
  createPatientZodeSchema,
} from './user.zod.schema';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '@prisma/client';

const router = Router();

router.get(
  '/',
  //  checkAuth(...Object.values(Role)),
  userController.getAllUsers
);

router.get('/me', checkAuth(...Object.values(Role)), userController.getMe);

router.post(
  '/create-patient',
  fileUploader.upload.single('file'),
  validationRequest(createPatientZodeSchema),
  userController.createPatient
);

router.patch('/delete', checkAuth(Role.PATIENT), userController.deleteUser);

router.post(
  '/create-doctor',
  fileUploader.upload.single('file'),
  validationRequest(createDoctorZodeSchema),
  userController.createDoctor
);

router.post(
  '/create-admin',
  fileUploader.upload.single('file'),
  validationRequest(createAdminZodeSchema),
  userController.createAdmin
);

export const userRouter = router;
