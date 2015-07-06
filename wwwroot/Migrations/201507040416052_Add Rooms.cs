namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRooms : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.CoachingSessions", name: "CoachingProgram_Id", newName: "CoachingProgramId");
            RenameIndex(table: "dbo.CoachingSessions", name: "IX_CoachingProgram_Id", newName: "IX_CoachingProgramId");
            CreateTable(
                "dbo.Rooms",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        Name = c.String(nullable: false),
                        UserName = c.String(nullable: false),
                        Password = c.String(nullable: false),
                        Link = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);

            Sql("INSERT INTO dbo.Rooms (CreatedAt, UpdatedAt, Name, UserName, Password, Link) VALUES (GETDATE(), GETDATE(), 'Trial Room', '', '', '')");
            
            AddColumn("dbo.CoachingSessions", "RoomId", c => c.Int(nullable: false));
            Sql("UPDATE [CoachingSessions] SET [RoomId] = (Select Id from Rooms)");

            CreateIndex("dbo.CoachingSessions", "RoomId");
            AddForeignKey("dbo.CoachingSessions", "RoomId", "dbo.Rooms", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CoachingSessions", "RoomId", "dbo.Rooms");
            DropIndex("dbo.CoachingSessions", new[] { "RoomId" });
            DropColumn("dbo.CoachingSessions", "RoomId");
            DropTable("dbo.Rooms");
            RenameIndex(table: "dbo.CoachingSessions", name: "IX_CoachingProgramId", newName: "IX_CoachingProgram_Id");
            RenameColumn(table: "dbo.CoachingSessions", name: "CoachingProgramId", newName: "CoachingProgram_Id");
        }
    }
}
