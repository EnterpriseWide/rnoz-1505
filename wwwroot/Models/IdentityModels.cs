using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity;
using System.Collections.Generic;

namespace ewide.web.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(100)]
        public string FirstName { get; set; }
        [MaxLength(100)]
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Company { get; set; }
        public string Avatar { get; set; }
        public string AvatarFileUrl { get; set; }
        public string Position { get; set; }
        public string CoachingExperience { get; set; }
        public string WorkExperience { get; set; }
        public string SightCallUID { get; set; }
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
        public List<string> GetRoles(ApplicationRoleManager appRoleManager)
        {
            var roles = new List<string>();
            foreach (var role in this.Roles)
            {
                var newRole = appRoleManager.FindById(role.RoleId);
                if (newRole != null)
                {
                    roles.Add(newRole.Name);
                }
            }
            return roles;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<CoachingProgram> CoachingPrograms { get; set; }
        public DbSet<CoachingSession> CoachingSessions { get; set; }
        public DbSet<Assignment> Assignment { get; set; }
        public DbSet<ProgramMedia> ProgramMedia { get; set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        protected override void OnModelCreating(System.Data.Entity.DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }
    }
}