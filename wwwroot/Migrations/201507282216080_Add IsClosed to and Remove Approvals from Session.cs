namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddIsClosedtoandRemoveApprovalsfromSession : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CoachingSessions", "IsClosed", c => c.Boolean(nullable: false));
            DropColumn("dbo.CoachingSessions", "IsCoachApproved");
            DropColumn("dbo.CoachingSessions", "IsCoacheeApproved");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CoachingSessions", "IsCoacheeApproved", c => c.Boolean(nullable: false));
            AddColumn("dbo.CoachingSessions", "IsCoachApproved", c => c.Boolean(nullable: false));
            DropColumn("dbo.CoachingSessions", "IsClosed");
        }
    }
}
