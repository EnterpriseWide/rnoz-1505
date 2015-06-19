namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddisActivetoCoachingProgram : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CoachingPrograms", "IsActive", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CoachingPrograms", "IsActive");
        }
    }
}
