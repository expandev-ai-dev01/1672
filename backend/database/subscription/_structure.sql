/**
 * @schema subscription
 * Handles account management, subscription plans, and tenant-specific data.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'subscription')
BEGIN
    EXEC('CREATE SCHEMA subscription');
END;
GO
