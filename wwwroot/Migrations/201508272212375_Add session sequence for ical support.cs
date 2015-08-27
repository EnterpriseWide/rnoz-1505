namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addsessionsequenceforicalsupport : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CoachingSessions", "Sequence", c => c.Int(nullable: false, defaultValue: 0));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CoachingSessions", "Sequence");
        }
    }
}
