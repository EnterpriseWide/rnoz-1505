namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAssignmentTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Assignments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        Name = c.String(nullable: false),
                        Description = c.String(),
                        BodyText = c.String(),
                        CoachingProgram_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CoachingPrograms", t => t.CoachingProgram_Id)
                .Index(t => t.CoachingProgram_Id);
            
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
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Assignments", t => t.Assignment_Id)
                .Index(t => t.Assignment_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AssignmentFiles", "Assignment_Id", "dbo.Assignments");
            DropForeignKey("dbo.Assignments", "CoachingProgram_Id", "dbo.CoachingPrograms");
            DropIndex("dbo.AssignmentFiles", new[] { "Assignment_Id" });
            DropIndex("dbo.Assignments", new[] { "CoachingProgram_Id" });
            DropTable("dbo.AssignmentFiles");
            DropTable("dbo.Assignments");
        }
    }
}
