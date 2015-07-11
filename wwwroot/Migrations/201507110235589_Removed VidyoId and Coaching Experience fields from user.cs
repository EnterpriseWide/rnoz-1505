namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedVidyoIdandCoachingExperiencefieldsfromuser : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.AspNetUsers", "CoachingExperience");
            DropColumn("dbo.AspNetUsers", "VidyoAccountId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "VidyoAccountId", c => c.String());
            AddColumn("dbo.AspNetUsers", "CoachingExperience", c => c.String());
        }
    }
}
