namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddProgramMediaTable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AssignmentFiles", "Assignment_Id", "dbo.Assignments");
            DropIndex("dbo.AssignmentFiles", new[] { "Assignment_Id" });
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
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CoachingPrograms", t => t.CoachingProgramId)
                .Index(t => t.CoachingProgramId);
            
            DropTable("dbo.AssignmentFiles");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.AssignmentFiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        Name = c.String(nullable: false),
                        FileName = c.String(),
                        Assignment_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            DropForeignKey("dbo.ProgramMedias", "CoachingProgramId", "dbo.CoachingPrograms");
            DropIndex("dbo.ProgramMedias", new[] { "CoachingProgramId" });
            DropTable("dbo.ProgramMedias");
            CreateIndex("dbo.AssignmentFiles", "Assignment_Id");
            AddForeignKey("dbo.AssignmentFiles", "Assignment_Id", "dbo.Assignments", "Id");
        }
    }
}
