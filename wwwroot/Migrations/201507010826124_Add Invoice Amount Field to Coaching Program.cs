namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddInvoiceAmountFieldtoCoachingProgram : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CoachingPrograms", "InvoiceAmount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CoachingPrograms", "InvoiceAmount");
        }
    }
}
