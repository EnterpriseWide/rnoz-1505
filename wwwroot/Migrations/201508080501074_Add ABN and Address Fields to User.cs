namespace ewide.web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddABNandAddressFieldstoUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "ABN", c => c.String());
            AddColumn("dbo.AspNetUsers", "Address", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "ABN");
        }
    }
}
