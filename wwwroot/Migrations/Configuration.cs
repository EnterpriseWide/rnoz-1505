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
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(ewide.web.Models.ApplicationDbContext context)
        {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

            if (roleManager.FindById("Super Admins") == null)
            {
                roleManager.Create(new IdentityRole { Name = "Super Admins" });
            }
            if (roleManager.FindById("Admins") == null)
            {
                roleManager.Create(new IdentityRole { Name = "Admins" });
            }
            if (roleManager.FindById("Users") == null)
            {
                roleManager.Create(new IdentityRole { Name = "Users" });
            }
            if (manager.FindByEmail("superadmin@ewide.biz") == null)
            {
                manager.Create(new ApplicationUser
                {
                    UserName = "superadmin@ewide.biz",
                    Email = "superadmin@ewide.biz",
                    EmailConfirmed = true,
                    FirstName = "SuperAdmin",
                    LastName = "Smith",
                }, "Abcd!234");
                var superadminUser = manager.FindByEmail("superadmin@ewide.biz");
                manager.AddToRoles(superadminUser.Id, new string[] { "Super Admins", "Admins", "Users" });
            }
            if (manager.FindByEmail("admin@ewide.biz") == null)
            {
                manager.Create(new ApplicationUser
                {
                    UserName = "admin@ewide.biz",
                    Email = "admin@ewide.biz",
                    EmailConfirmed = true,
                    FirstName = "Admin",
                    LastName = "Smith",
                }, "Abcd!234");
                var adminUser = manager.FindByEmail("admin@ewide.biz");
                manager.AddToRoles(adminUser.Id, new string[] { "Admins", "Users" });
            }
            if (manager.FindByEmail("user1@ewide.biz") == null)
            {
                manager.Create(new ApplicationUser
                {
                    UserName = "user1@ewide.biz",
                    Email = "user1@ewide.biz",
                    EmailConfirmed = true,
                    FirstName = "User 1",
                    LastName = "Smith",
                }, "Abcd!234");
                var user = manager.FindByEmail("user1@ewide.biz");
                manager.AddToRoles(user.Id, new string[] { "Users" });
            }
            if (manager.FindByEmail("user2@ewide.biz") == null)
            {
                manager.Create(new ApplicationUser
                {
                    UserName = "user2@ewide.biz",
                    Email = "user2@ewide.biz",
                    EmailConfirmed = true,
                    FirstName = "User 2",
                    LastName = "Smith",
                }, "Abcd!234");
                var user = manager.FindByEmail("user2@ewide.biz");
                manager.AddToRoles(user.Id, new string[] { "Users" });
            }
            if (manager.FindByEmail("user3@ewide.biz") == null)
            {
                manager.Create(new ApplicationUser
                {
                    UserName = "user3@ewide.biz",
                    Email = "user3@ewide.biz",
                    EmailConfirmed = true,
                    FirstName = "User 3",
                    LastName = "Smith",
                }, "Abcd!234");
                var user = manager.FindByEmail("user3@ewide.biz");
                manager.AddToRoles(user.Id, new string[] { "Users" });
            }

            if (context.CoachingPrograms.Count() <= 0)
            {
                var coachingProgram1 = new CoachingProgram
                {
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Coach = manager.FindByEmail("user1@ewide.biz"),
                    Coachee = manager.FindByEmail("user2@ewide.biz"),
                };
                context.CoachingPrograms.Add(coachingProgram1);

                var coachingProgram2 = new CoachingProgram
                {
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Coach = manager.FindByEmail("user1@ewide.biz"),
                    Coachee = manager.FindByEmail("user3@ewide.biz"),
                };
                context.CoachingPrograms.Add(coachingProgram2);

                context.CoachingSessions.Add(new CoachingSession
                {
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CoachingProgram = coachingProgram1,
                    Duration = 60,
                    IsCoachApproved = false,
                    IsCoacheeApproved = false,
                    StartedAt = DateTime.Now,
                });

                context.CoachingSessions.Add(new CoachingSession
                {
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CoachingProgram = coachingProgram1,
                    Duration = 60,
                    IsCoachApproved = false,
                    IsCoacheeApproved = false,
                    StartedAt = DateTime.Now.AddDays(2),
                });

                context.CoachingSessions.Add(new CoachingSession
                {
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CoachingProgram = coachingProgram2,
                    Duration = 60,
                    IsCoachApproved = false,
                    IsCoacheeApproved = false,
                    StartedAt = DateTime.Now,
                });

                context.CoachingSessions.Add(new CoachingSession
                {
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CoachingProgram = coachingProgram2,
                    Duration = 60,
                    IsCoachApproved = false,
                    IsCoacheeApproved = false,
                    StartedAt = DateTime.Now.AddDays(2),
                });

                context.CoachingSessions.Add(new CoachingSession
                {
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CoachingProgram = coachingProgram2,
                    Duration = 60,
                    IsCoachApproved = false,
                    IsCoacheeApproved = false,
                    StartedAt = DateTime.Now.AddDays(3),
                });

                context.SaveChanges();
            }
        }
    }
}
