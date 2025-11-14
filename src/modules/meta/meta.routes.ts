import { Router } from 'express';
import { metaController } from './meta.controller';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '@prisma/client';

const router = Router();
router.get(
  '/',
  checkAuth(...Object.values(Role)),
  metaController.fetchDashboardData
);

export const metaRouter = router;
