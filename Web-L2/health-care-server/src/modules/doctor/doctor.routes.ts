import { Router } from 'express';
import { doctorController } from './doctor.controller';

const router = Router();

router.get('/', doctorController.getAllDoctors);

router.get('/:id', doctorController.getSingleDoctor);

router.post('/suggestions', doctorController.getDoctorSuggestions);

router.put('/update-doctor/:id', doctorController.updateDoctor);

router.delete('/delete-doctor/:id', doctorController.deleteDoctor);

export const doctorRouter = router;
