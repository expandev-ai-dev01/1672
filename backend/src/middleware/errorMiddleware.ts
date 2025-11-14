import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { errorResponse } from '@/utils/response/customResponse';
import { AppError } from '@/utils/errors/AppError';

export const errorMiddleware = (
  err: Error | AppError | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('ERROR 💥', err);

  if (res.headersSent) {
    return;
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(errorResponse(err.message, err.statusCode, err.details));
  }

  if (err instanceof ZodError) {
    return res.status(400).json(errorResponse('Validation failed', 400, err.flatten().fieldErrors));
  }

  // Handle mssql errors from stored procedures
  if ('number' in err && 'procName' in err) {
    const sqlError = err as { number: number; message: string };
    if (sqlError.number >= 50000) {
      // Custom business rule errors
      return res.status(400).json(errorResponse(sqlError.message, 400));
    }
  }

  const message = 'An unexpected error occurred on the server.';
  res.status(500).json(errorResponse(message, 500));
};
