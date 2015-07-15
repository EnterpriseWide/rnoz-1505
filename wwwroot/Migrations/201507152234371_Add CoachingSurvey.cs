namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCoachingSurvey : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CoachingSurveys",
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CoachingSurveys", "SurveyId", "dbo.Surveys");
            DropForeignKey("dbo.CoachingSurveys", "CoachingProgramId", "dbo.CoachingPrograms");
            DropIndex("dbo.CoachingSurveys", new[] { "SurveyId" });
            DropIndex("dbo.CoachingSurveys", new[] { "CoachingProgramId" });
            DropTable("dbo.CoachingSurveys");
        }
    }
}
