/**
 * @schema security
 * Manages authentication, authorization, users, and security-related operations.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'security')
BEGIN
    EXEC('CREATE SCHEMA security');
END;
GO
