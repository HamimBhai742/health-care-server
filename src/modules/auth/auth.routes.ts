import { Router } from 'express';
import { authController } from './auth.controller';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '@prisma/client';

const router = Router();

router.post('/forget-password', authController.forgetPassword);
router.patch('/reset-password', authController.resetPassword);
router.post('/login', authController.login);
router.post(
  '/refresh-token',
  checkAuth(...Object.values(Role)),

  authController.getNewAccessToken
);

router.patch(
  '/change-password',
  checkAuth(...Object.values(Role)),
  authController.changePassword
);

export const authRouter = router;
