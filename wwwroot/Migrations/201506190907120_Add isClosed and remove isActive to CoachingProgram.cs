namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddisClosedandremoveisActivetoCoachingProgram : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CoachingPrograms", "IsClosed", c => c.Boolean(nullable: false));
            DropColumn("dbo.CoachingPrograms", "IsActive");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CoachingPrograms", "IsActive", c => c.Boolean(nullable: false));
            DropColumn("dbo.CoachingPrograms", "IsClosed");
        }
    }
}
