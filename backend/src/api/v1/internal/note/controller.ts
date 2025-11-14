import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { noteCreate } from '@/services/note';
import { successResponse } from '@/utils/response/customResponse';
import { AppError } from '@/utils/errors/AppError';
import type { NoteCreateRequest } from '@/services/note/noteTypes';

const noteCreateSchema = z.object({
  // In a real app, idAccount and idUser would come from an auth middleware.
  // For now, we'll expect them in the body for demonstration.
  idAccount: z.number().int().positive(),
  idUser: z.number().int().positive(),
  title: z.string().min(1, 'Title is required').max(255, 'Title cannot exceed 255 characters'),
  content: z.string().min(1, 'Content is required'),
});

export async function postHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const validationResult = noteCreateSchema.safeParse(req.body);

    if (!validationResult.success) {
      throw new AppError(
        'Validation failed',
        400,
        true,
        validationResult.error.flatten().fieldErrors
      );
    }

    const data = validationResult.data as NoteCreateRequest;

    const newNote = await noteCreate(data);

    res.status(201).json(successResponse(newNote, { message: 'Note created successfully.' }));
  } catch (error) {
    next(error);
  }
}
