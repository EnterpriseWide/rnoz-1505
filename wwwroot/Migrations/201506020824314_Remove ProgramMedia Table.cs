namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveProgramMediaTable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProgramMedias", "CoachingProgramId", "dbo.CoachingPrograms");
            DropIndex("dbo.ProgramMedias", new[] { "CoachingProgramId" });
            DropTable("dbo.ProgramMedias");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ProgramMedias",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        CoachingProgramId = c.Int(nullable: false),
                        Name = c.String(nullable: false),
                        FileName = c.String(),
                        MediaType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.ProgramMedias", "CoachingProgramId");
            AddForeignKey("dbo.ProgramMedias", "CoachingProgramId", "dbo.CoachingPrograms", "Id");
        }
    }
}
