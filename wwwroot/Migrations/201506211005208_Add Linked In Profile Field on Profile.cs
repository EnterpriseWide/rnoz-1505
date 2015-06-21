namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddLinkedInProfileFieldonProfile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "LinkedInProfile", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "LinkedInProfile");
        }
    }
}
