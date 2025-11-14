import { Request, Response } from 'express';
import { errorResponse } from '@/utils/response/customResponse';

export const notFoundMiddleware = (_req: Request, res: Response) => {
  res.status(404).json(errorResponse('API endpoint not found', 404));
};
