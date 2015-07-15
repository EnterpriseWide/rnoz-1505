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
    public class UsersController : BaseApiController
    {
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
}
