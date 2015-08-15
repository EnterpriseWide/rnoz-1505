namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCVLinkFieldtouser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "CVLink", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "CVLink");
        }
    }
}
