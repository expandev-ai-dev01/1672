import { Router } from 'express';
import noteRoutes from './noteRoutes';

const router = Router();

// This is where you will add feature-specific internal routes.
router.use('/note', noteRoutes);

export default router;
