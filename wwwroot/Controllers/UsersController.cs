using ewide.web.Models;
using ewide.web.Utils;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Dynamic;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/users")]
    public class UsersController : BaseApiController
    {
        [ResponseType(typeof(GetUserForAdminResponse))]
        [Route("ForAdmin")]
        public IHttpActionResult GetUsersForAdmin(int pageNumber = 1, int pageSize = 25, String sort = "CreatedAt desc")
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var coachRole = AppRoleManager.FindByName("Coach");
            var users = (IQueryable<ApplicationUser>)AppUserManager.Users;
            if (String.IsNullOrEmpty(sort) || sort == "null")
            {
                users = users.OrderBy(i => i.UserName);
            }
            else
            {
                if (sort.EndsWith(","))
                {
                    sort = sort.TrimEnd(',');
                }
                users = users.OrderBy(sort);
            }
            var count = users.Count();
            users = users
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);
            return Ok(new GetUserForAdminResponse
            {
                TotalItems = count,
                Items = users
                    .Select(i => new UserHttpResponse
                    {
                        Id = i.Id,
                        FirstName = i.FirstName,
                        LastName = i.LastName,
                        IsCoach = i.Roles.Any(j => j.RoleId == coachRole.Id),
                        Email = i.UserName,
                        Timezone = i.Timezone,
                        CVLink = i.CVLink,
                        Webex = i.Webex,
                    })
                    .ToList(),
            }); 
        }

        public IEnumerable<UserHttpResponse> GetUsers()
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var coachRole = AppRoleManager.FindByName("Coach");
            var users = AppUserManager.Users
                .Select(i => new UserHttpResponse
                {
                    Id = i.Id,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    IsCoach = i.Roles.Any(j => j.RoleId == coachRole.Id),
                    Email = i.UserName,
                    Timezone = i.Timezone,
                    CVLink = i.CVLink,
                    Webex = i.Webex,
                })
                .ToList();
            return users;
        }

        // GET: api/ApplicationUsers/5
        [ResponseType(typeof(ApplicationUser))]
        public async Task<IHttpActionResult> GetApplicationUser(string id)
        {
            var user = await AppUserManager.FindByIdAsync(id);
            var coachRole = AppRoleManager.FindByName("Coach");
            if (user == null)
            {
                return NotFound();
            }
            var response = new GetUserResponse
            {
                Item = new UserHttpResponse
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    IsCoach = user.Roles.Any(j => j.RoleId == coachRole.Id),
                    Email = user.UserName,
                    RoleIds = user.Roles.Select(i => i.RoleId).ToList(),
                    Timezone = user.Timezone,
                    CVLink = user.CVLink,
                    Webex = user.Webex,
                },
            };
            response.UsageCount = AppDb.CoachingPrograms
                .Count(i =>
                    i.Coach.Id == id ||
                    i.Coachee.Id == id);
            return Ok(response);
        }

        // PUT: api/ApplicationUsers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutApplicationUser(string id, UserHttpResponse applicationUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != applicationUser.Id)
            {
                return BadRequest();
            }

            var user = AppUserManager.FindById(applicationUser.Id);
            if (user == null)
            {
                return BadRequest("User Not Found");
            }

            user.FirstName = applicationUser.FirstName;
            user.LastName = applicationUser.LastName;
            user.Email = applicationUser.Email;
            user.UserName = applicationUser.Email;
            user.Timezone = applicationUser.Timezone;
            user.CVLink = applicationUser.CVLink;
            user.Webex = applicationUser.Webex;
            AppUserManager.Update(user);

            foreach (var role in user.Roles.ToList())
            {
                if (!applicationUser.RoleIds.Any(i => i == role.RoleId))
                {
                    AppUserManager.RemoveFromRole(user.Id, AppRoleManager.FindById(role.RoleId).Name);
                }
            }

            foreach (var roleId in applicationUser.RoleIds)
            {
                if (!user.Roles.Any(i => i.RoleId == roleId))
                {
                    AppUserManager.AddToRole(user.Id, AppRoleManager.FindById(roleId).Name);
                }
            }

            using (var db = AppDb.Database.BeginTransaction())
            {
                try
                {
                    if (!String.IsNullOrEmpty(applicationUser.Password))
                    {
                        var result1 = AppUserManager.RemovePassword(user.Id);
                        if (!result1.Succeeded)
                        {
                            return GetErrorResult(result1);
                        }
                        var result2 = AppUserManager.AddPassword(user.Id, applicationUser.Password);
                        if (!result2.Succeeded)
                        {
                            return GetErrorResult(result2);
                        }
                    }
                    db.Commit();
                }
                catch (Exception)
                {
                    db.Rollback();
                }
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ApplicationUsers
        [ResponseType(typeof(ApplicationUser))]
        public async Task<IHttpActionResult> PostApplicationUser(ApplicationUser applicationUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            applicationUser.UserName = applicationUser.Email;
            applicationUser.EmailConfirmed = true;

            try
            {
                var result = await AppUserManager.CreateAsync(applicationUser, applicationUser.PasswordHash);
                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }
            }
            catch (DbUpdateException)
            {
                if (ApplicationUserExists(applicationUser.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtRoute("DefaultApi", new { id = applicationUser.Id }, applicationUser);
        }

        // DELETE: api/ApplicationUsers/5
        [ResponseType(typeof(ApplicationUser))]
        public async Task<IHttpActionResult> DeleteApplicationUser(string id)
        {
            var applicationUser = await AppUserManager.FindByIdAsync(id);
            if (applicationUser == null)
            {
                return NotFound();
            }
            await AppUserManager.DeleteAsync(applicationUser);
            return Ok(applicationUser);
        }

        private bool ApplicationUserExists(string id)
        {
            return AppDb.Users.Count(e => e.Id == id) > 0;
        }
    }

    public class GetUserResponse
    {
        public int UsageCount { get; set; }
        public UserHttpResponse Item { get; set; }
    }
    
    public class UserHttpResponse
    {
        public string Id { get; set; }
        public bool IsCoach { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string Password { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public List<String> RoleIds { get; set; }
        [Required]
        public string Timezone { get; set; }
        public string CVLink { get; set; }
        public string Webex { get; set; }
    }

    public class GetUserForAdminResponse
    {
        public int TotalItems { get; set; }
        public List<UserHttpResponse> Items { get; set; }
    }

}
