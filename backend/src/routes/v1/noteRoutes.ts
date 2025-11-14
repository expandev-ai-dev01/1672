import { Router } from 'express';
import * as noteController from '@/api/v1/internal/note/controller';

const router = Router();

// POST /api/v1/internal/note
router.post('/', noteController.postHandler);

export default router;
