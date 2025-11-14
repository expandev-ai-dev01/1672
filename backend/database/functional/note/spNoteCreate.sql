/**
 * @summary
 * Creates a new note for a specific user and account.
 * 
 * @procedure spNoteCreate
 * @schema functional
 * @type stored-procedure
 * 
 * @endpoints
 * - POST /api/v1/internal/note
 * 
 * @parameters
 * @param {INT} idAccount 
 *   - Required: Yes
 *   - Description: The identifier of the account the note belongs to.
 * @param {INT} idUser
 *   - Required: Yes
 *   - Description: The identifier of the user creating the note.
 * @param {NVARCHAR(255)} title
 *   - Required: Yes
 *   - Description: The title of the note.
 * @param {NVARCHAR(MAX)} content
 *   - Required: Yes
 *   - Description: The content of the note.
 * 
 * @returns {INT} The ID of the newly created note.
 * 
 * @testScenarios
 * - Create a note with valid parameters.
 * - Attempt to create a note with a duplicate title for the same account (should fail due to unique index).
 * - Attempt to create a note with NULL title or content (should fail at application/SP level).
 */
CREATE OR ALTER PROCEDURE [functional].[spNoteCreate]
  @idAccount INT,
  @idUser INT,
  @title NVARCHAR(255),
  @content NVARCHAR(MAX)
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Ensure required parameters are not null.
   * @throw {TitleRequired}
   * @throw {ContentRequired}
   */
  IF @title IS NULL OR LTRIM(RTRIM(@title)) = ''
  BEGIN
    ;THROW 51000, 'TitleRequired', 1;
  END;

  IF @content IS NULL OR LTRIM(RTRIM(@content)) = ''
  BEGIN
    ;THROW 51000, 'ContentRequired', 1;
  END;

  BEGIN TRY
    INSERT INTO [functional].[note] (
      [idAccount],
      [idUser],
      [title],
      [content]
    )
    VALUES (
      @idAccount,
      @idUser,
      @title,
      @content
    );

    /**
     * @output {NewNote, 1, 1}
     * @column {INT} id
     *  - Description: The ID of the newly created note.
     */
    SELECT SCOPE_IDENTITY() AS [id];

  END TRY
  BEGIN CATCH
    -- Re-throw the original error to be caught by the application
    ;THROW;
  END CATCH;
END;
GO
