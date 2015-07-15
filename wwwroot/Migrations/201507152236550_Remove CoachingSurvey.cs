namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveCoachingSurvey : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CoachingSurveys", "CoachingProgramId", "dbo.CoachingPrograms");
            DropForeignKey("dbo.CoachingSurveys", "SurveyId", "dbo.Surveys");
            DropIndex("dbo.CoachingSurveys", new[] { "CoachingProgramId" });
            DropIndex("dbo.CoachingSurveys", new[] { "SurveyId" });
            DropTable("dbo.CoachingSurveys");
        }
        
        public override void Down()
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
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.CoachingSurveys", "SurveyId");
            CreateIndex("dbo.CoachingSurveys", "CoachingProgramId");
            AddForeignKey("dbo.CoachingSurveys", "SurveyId", "dbo.Surveys", "Id");
            AddForeignKey("dbo.CoachingSurveys", "CoachingProgramId", "dbo.CoachingPrograms", "Id");
        }
    }
}
