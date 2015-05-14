namespace ewide.web.Migrations
{
    using ewide.web.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateProgramandSession : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            CreateTable(
                "dbo.CoachingPrograms",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreatedAt = c.DateTime(nullable: false, defaultValueSql: "getdate()"),
                        UpdatedAt = c.DateTime(nullable: false, defaultValueSql: "getdate()"),
                        LearningPlan = c.String(),
                        Coach_Id = c.String(nullable: false, maxLength: 128),
                        Coachee_Id = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Coach_Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Coachee_Id)
                .Index(t => t.Coach_Id)
                .Index(t => t.Coachee_Id);
            
            CreateTable(
                "dbo.CoachingSessions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreatedAt = c.DateTime(nullable: false, defaultValueSql: "getdate()"),
                        UpdatedAt = c.DateTime(nullable: false, defaultValueSql: "getdate()"),
                        StartedAt = c.DateTime(nullable: false),
                        Duration = c.Int(nullable: false),
                        IsCoachApproved = c.Boolean(nullable: false),
                        IsCoacheeApproved = c.Boolean(nullable: false),
                        CoachingProgram_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CoachingPrograms", t => t.CoachingProgram_Id)
                .Index(t => t.CoachingProgram_Id);
            
            AddForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles", "Id");
            AddForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.CoachingSessions", "CoachingProgram_Id", "dbo.CoachingPrograms");
            DropForeignKey("dbo.CoachingPrograms", "Coachee_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.CoachingPrograms", "Coach_Id", "dbo.AspNetUsers");
            DropIndex("dbo.CoachingSessions", new[] { "CoachingProgram_Id" });
            DropIndex("dbo.CoachingPrograms", new[] { "Coachee_Id" });
            DropIndex("dbo.CoachingPrograms", new[] { "Coach_Id" });
            DropTable("dbo.CoachingSessions");
            DropTable("dbo.CoachingPrograms");
            AddForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles", "Id", cascadeDelete: true);
        }
    }
}
