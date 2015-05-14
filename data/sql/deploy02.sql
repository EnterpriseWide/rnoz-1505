/*
   Saturday, 25 April 20155:27:06 PM
   User: local_global
   Server: .\
   Database: rightnow
   Application: 
*/

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.Program ADD
	IsInvoiced bit NOT NULL CONSTRAINT DF_Program_IsInvoiced DEFAULT 0,
	InvoiceAmount money NOT NULL CONSTRAINT DF_Program_InvoiceAmount DEFAULT 0
GO
ALTER TABLE dbo.Program SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
