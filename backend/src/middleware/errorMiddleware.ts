import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '@/utils/response/customResponse';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorMiddleware = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'An unexpected error occurred on the server.';

  console.error('ERROR 💥', err);

  if (res.headersSent) {
    return;
  }

  res.status(statusCode).json(errorResponse(message, statusCode));
};
