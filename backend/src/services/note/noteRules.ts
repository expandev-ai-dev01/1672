import { dbRequest, ICreateObjectResult, IRecordSet } from '@/utils/database/sql';
import { NoteCreateRequest } from './noteTypes';

/**
 * Creates a new note in the database.
 * @param params - The parameters for creating a note.
 * @returns The ID of the newly created note.
 */
export async function noteCreate(params: NoteCreateRequest): Promise<ICreateObjectResult> {
  const request = await dbRequest();

  const result = await request
    .input('idAccount', params.idAccount)
    .input('idUser', params.idUser)
    .input('title', params.title)
    .input('content', params.content)
    .execute<IRecordSet<ICreateObjectResult>>('[functional].[spNoteCreate]');

  return result.recordset[0];
}
