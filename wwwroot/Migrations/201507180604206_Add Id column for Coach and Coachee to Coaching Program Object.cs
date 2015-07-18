namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddIdcolumnforCoachandCoacheetoCoachingProgramObject : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.CoachingPrograms", name: "Coach_Id", newName: "CoachId");
            RenameColumn(table: "dbo.CoachingPrograms", name: "Coachee_Id", newName: "CoacheeId");
        }
        
        public override void Down()
        {
            RenameColumn(table: "dbo.CoachingPrograms", name: "CoacheeId", newName: "Coachee_Id");
            RenameColumn(table: "dbo.CoachingPrograms", name: "CoachId", newName: "Coach_Id");
        }
    }
}
