/**
 * @schema functional
 * Contains all business logic, entities, and operational objects for the application.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'functional')
BEGIN
    EXEC('CREATE SCHEMA functional');
END;
GO

/*
DROP TABLE [functional].[note];
*/

/**
 * @table {note} Stores user-created notes.
 * @multitenancy true
 * @softDelete true
 * @alias nte
 */
CREATE TABLE [functional].[note] (
  [idNote] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [idUser] INTEGER NOT NULL,
  [title] NVARCHAR(255) NOT NULL,
  [content] NVARCHAR(MAX) NOT NULL,
  [dateCreated] DATETIME2 NOT NULL,
  [dateModified] DATETIME2 NOT NULL,
  [deleted] BIT NOT NULL
);
GO

/**
 * @primaryKey {pkNote}
 * @keyType Object
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [pkNote] PRIMARY KEY CLUSTERED ([idNote]);
GO

/**
 * @default {dfNote_dateCreated} Sets the default creation date to the current UTC date and time.
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [dfNote_dateCreated] DEFAULT (GETUTCDATE()) FOR [dateCreated];
GO

/**
 * @default {dfNote_dateModified} Sets the default modification date to the current UTC date and time.
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [dfNote_dateModified] DEFAULT (GETUTCDATE()) FOR [dateModified];
GO

/**
 * @default {dfNote_deleted} Sets the default value for the soft delete flag to 0 (active).
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [dfNote_deleted] DEFAULT (0) FOR [deleted];
GO

-- NOTE: Assuming [subscription].[account] and [security].[user] tables will exist.
-- If they don't, these constraints will fail. For now, we define them as per architecture.
/*
/**
 * @foreignKey {fkNote_account} Ensures each note belongs to a valid account.
 * @target {subscription.account}
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [fkNote_account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

/**
 * @foreignKey {fkNote_user} Ensures each note is created by a valid user.
 * @target {security.userAccount}
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [fkNote_user] FOREIGN KEY ([idAccount], [idUser])
REFERENCES [security].[userAccount]([idAccount], [idUser]);
GO
*/

/**
 * @index {ixNote_Account} Optimizes queries filtering by account.
 * @type Performance
 */
CREATE NONCLUSTERED INDEX [ixNote_Account]
ON [functional].[note]([idAccount])
WHERE [deleted] = 0;
GO

/**
 * @index {ixNote_Account_User} Optimizes queries for notes belonging to a specific user within an account.
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixNote_Account_User]
ON [functional].[note]([idAccount], [idUser])
WHERE [deleted] = 0;
GO

/**
 * @index {uqNote_Account_Title} Ensures note titles are unique per account.
 * @type Unique
 * @unique true
 * @filter Excludes deleted notes from the uniqueness constraint.
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqNote_Account_Title]
ON [functional].[note]([idAccount], [title])
WHERE [deleted] = 0;
GO
