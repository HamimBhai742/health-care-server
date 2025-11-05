import { Router } from 'express';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '@prisma/client';
import { reviewController } from './review.controller';

const router = Router();
router.post('/create', checkAuth(Role.PATIENT), reviewController.createReview);

export const reviewRouter = router;
