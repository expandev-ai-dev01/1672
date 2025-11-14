import { Router } from 'express';
import internalRoutes from './internalRoutes';
import externalRoutes from './externalRoutes';

const router = Router();

// Internal routes (require authentication)
router.use('/internal', internalRoutes);

// External routes (public access)
router.use('/external', externalRoutes);

export default router;
