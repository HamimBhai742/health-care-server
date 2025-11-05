import { Router } from 'express';
import { specialtiesController } from './specialties.controller';
import { validationRequest } from '../../middleware/validationRequest';
import { createSpecialityZodSchema } from './specialites.schema';
import { fileUploader } from '../../utils/multer';

const router = Router();

router.post(
  '/create-specialties',
  fileUploader.upload.single('file'),
  validationRequest(createSpecialityZodSchema),
  specialtiesController.createSpecialties
);
router.get('/', specialtiesController.getAllSpecialties);
router.delete(
  '/delete-specialties/:id',
  specialtiesController.deleteSpecialties
);

export const specialtiesRouter = router;
