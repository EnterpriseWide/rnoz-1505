namespace ewide.web.Migrations
{
    using ewide.web.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public class Configuration : DbMigrationsConfiguration<ewide.web.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(ewide.web.Models.ApplicationDbContext context)
        {
            //var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            //var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            //if (roleManager.FindById("Admin") == null)
            //{
            //    roleManager.Create(new IdentityRole { Name = "Admin" });
            //}
            //if (roleManager.FindById("Coach") == null)
            //{
            //    roleManager.Create(new IdentityRole { Name = "Coach" });
            //}
            //if (manager.FindByEmail("admin@ewide.biz") == null)
            //{
            //    manager.Create(new ApplicationUser
            //    {
            //        UserName = "admin@ewide.biz",
            //        Email = "admin@ewide.biz",
            //        EmailConfirmed = true,
            //        FirstName = "Admin",
            //        LastName = "Smith",
            //    }, "Abcd!234");
            //    var adminUser = manager.FindByEmail("admin@ewide.biz");
            //    manager.AddToRoles(adminUser.Id, new string[] { "Admin" });
            //}
            //if (manager.FindByEmail("user1@ewide.biz") == null)
            //{
            //    manager.Create(new ApplicationUser
            //    {
            //        UserName = "user1@ewide.biz",
            //        Email = "user1@ewide.biz",
            //        EmailConfirmed = true,
            //        FirstName = "User 1",
            //        LastName = "Smith",
            //    }, "Abcd!234");
            //    var user = manager.FindByEmail("user1@ewide.biz");
            //    manager.AddToRoles(user.Id, new string[] { "Coach" });
            //}
            //if (manager.FindByEmail("user2@ewide.biz") == null)
            //{
            //    manager.Create(new ApplicationUser
            //    {
            //        UserName = "user2@ewide.biz",
            //        Email = "user2@ewide.biz",
            //        EmailConfirmed = true,
            //        FirstName = "User 2",
            //        LastName = "Smith",
            //    }, "Abcd!234");
            //    var user = manager.FindByEmail("user2@ewide.biz");
            //}
            //context.SaveChanges();
        }
    }
}
