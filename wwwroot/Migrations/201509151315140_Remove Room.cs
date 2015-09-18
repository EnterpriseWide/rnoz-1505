namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveRoom : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CoachingSessions", "RoomId", "dbo.Rooms");
            DropIndex("dbo.CoachingSessions", new[] { "RoomId" });
            DropColumn("dbo.CoachingSessions", "RoomId");
            DropTable("dbo.Rooms");
        }
        
        public override void Down()
        {
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
            
            AddColumn("dbo.CoachingSessions", "RoomId", c => c.Int(nullable: false));
            CreateIndex("dbo.CoachingSessions", "RoomId");
            AddForeignKey("dbo.CoachingSessions", "RoomId", "dbo.Rooms", "Id");
        }
    }
}
