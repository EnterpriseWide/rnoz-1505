using ewide.web.Models;
using ewide.web.Utils;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Dynamic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize(Roles = "Admin")]
    public class RolesController : BaseApiController
    {
        public IEnumerable<IdentityRole> GetRoles()
        {
            return AppRoleManager.Roles.ToList();
        }
    }
}
