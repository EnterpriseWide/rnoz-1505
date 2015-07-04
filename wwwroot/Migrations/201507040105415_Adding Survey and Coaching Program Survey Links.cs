namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingSurveyandCoachingProgramSurveyLinks : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CoachingProgramSurveys",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        CoachingProgramId = c.Int(nullable: false),
                        SurveyId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CoachingPrograms", t => t.CoachingProgramId)
                .ForeignKey("dbo.Surveys", t => t.SurveyId)
                .Index(t => t.CoachingProgramId)
                .Index(t => t.SurveyId);
            
            CreateTable(
                "dbo.Surveys",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        Name = c.String(nullable: false),
                        Link = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CoachingProgramSurveys", "SurveyId", "dbo.Surveys");
            DropForeignKey("dbo.CoachingProgramSurveys", "CoachingProgramId", "dbo.CoachingPrograms");
            DropIndex("dbo.CoachingProgramSurveys", new[] { "SurveyId" });
            DropIndex("dbo.CoachingProgramSurveys", new[] { "CoachingProgramId" });
            DropTable("dbo.Surveys");
            DropTable("dbo.CoachingProgramSurveys");
        }
    }
}
