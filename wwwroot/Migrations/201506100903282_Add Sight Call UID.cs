namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddSightCallUID : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "SightCallUID", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "SightCallUID");
        }
    }
}
