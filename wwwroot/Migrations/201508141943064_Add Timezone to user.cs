namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTimezonetouser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "Timezone", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Timezone");
        }
    }
}
