namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddLinkpropertytoProgramMedia : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ProgramMedias", "Link", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ProgramMedias", "Link");
        }
    }
}
