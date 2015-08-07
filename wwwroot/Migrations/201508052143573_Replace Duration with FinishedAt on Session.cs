namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ReplaceDurationwithFinishedAtonSession : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CoachingSessions", "FinishedAt", c => c.DateTime());
            Sql("UPDATE [dbo].[CoachingSessions] SET FinishedAt = DateAdd(minute, Duration, StartedAt)");
            AlterColumn("dbo.CoachingSessions", "FinishedAt", c => c.DateTime(nullable: false));
            DropColumn("dbo.CoachingSessions", "Duration");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CoachingSessions", "Duration", c => c.Int());
            Sql("UPDATE [dbo].[CoachingSessions] SET Duration = DateDiff(minute, StartedAt, FinishedAt)");
            AddColumn("dbo.CoachingSessions", "Duration", c => c.Int(nullable: false));
            DropColumn("dbo.CoachingSessions", "FinishedAt");
        }
    }
}
