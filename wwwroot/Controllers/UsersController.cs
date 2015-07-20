using ewide.web.Models;
using ewide.web.Utils;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Dynamic;
using System.Net;
using System.Net.Mail;
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
                })
                .ToList();
            return users;
        }

    }

    public class UserHttpResponse
    {
        public string Id { get; set; }
        public bool IsCoach { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class GetUserForAdminResponse
    {
        public int TotalItems { get; set; }
        public List<UserHttpResponse> Items { get; set; }
    }

}
