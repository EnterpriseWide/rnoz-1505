namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatetoProfileTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "Phone", c => c.String());
            AddColumn("dbo.AspNetUsers", "Company", c => c.String());
            DropColumn("dbo.AspNetUsers", "Experience");
            DropColumn("dbo.AspNetUsers", "ABN");
            DropColumn("dbo.AspNetUsers", "BusinessName");
            DropColumn("dbo.AspNetUsers", "Address");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "Address", c => c.String());
            AddColumn("dbo.AspNetUsers", "BusinessName", c => c.String());
            AddColumn("dbo.AspNetUsers", "ABN", c => c.String());
            AddColumn("dbo.AspNetUsers", "Experience", c => c.String());
            DropColumn("dbo.AspNetUsers", "Company");
            DropColumn("dbo.AspNetUsers", "Phone");
        }
    }
}
