/**
 * @interface NoteEntity
 * @description Represents a note entity in the system.
 */
export interface NoteEntity {
  idNote: number;
  idAccount: number;
  idUser: number;
  title: string;
  content: string;
  dateCreated: Date;
  dateModified: Date;
  deleted: boolean;
}

/**
 * @interface NoteCreateRequest
 * @description Defines the shape of the request body for creating a new note.
 */
export interface NoteCreateRequest {
  idAccount: number;
  idUser: number;
  title: string;
  content: string;
}
