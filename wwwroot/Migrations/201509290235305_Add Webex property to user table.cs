namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddWebexpropertytousertable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "Webex", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Webex");
        }
    }
}
