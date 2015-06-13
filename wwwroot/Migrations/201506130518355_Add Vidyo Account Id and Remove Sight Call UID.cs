namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddVidyoAccountIdandRemoveSightCallUID : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "VidyoAccountId", c => c.String());
            DropColumn("dbo.AspNetUsers", "SightCallUID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "SightCallUID", c => c.String());
            DropColumn("dbo.AspNetUsers", "VidyoAccountId");
        }
    }
}
