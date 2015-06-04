namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddProgramMediaTablebackinagain : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProgramMedias",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        CoachingProgramId = c.Int(nullable: false),
                        Name = c.String(nullable: false),
                        FileName = c.String(),
                        OriginalFileName = c.String(),
                        BodyText = c.String(),
                        MediaType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CoachingPrograms", t => t.CoachingProgramId)
                .Index(t => t.CoachingProgramId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProgramMedias", "CoachingProgramId", "dbo.CoachingPrograms");
            DropIndex("dbo.ProgramMedias", new[] { "CoachingProgramId" });
            DropTable("dbo.ProgramMedias");
        }
    }
}
