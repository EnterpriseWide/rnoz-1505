using ewide.web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize]
    public class ProgramsController : BaseApiController
    {
        private IQueryable<CoachingProgram> GetCoachingPrograms(ApplicationUser currentUser)
        {
            var programs = AppDb.CoachingPrograms
                .Include(i => i.Coach)
                .Include(i => i.Coachee)
                .Where(i =>
                    i.Coach.Id == currentUser.Id ||
                    i.Coachee.Id == currentUser.Id);
            return programs;
        }

        public IQueryable<CoachingProgram> GetCoachingProgram()
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var programs = GetCoachingPrograms(currentUser);
            return programs;
        }

        [ResponseType(typeof(CoachingProgram))]
        public IHttpActionResult GetCoachingProgram(int id)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());

            var program = GetCoachingPrograms(currentUser)
                .SingleOrDefault(i => i.Id == id);
            return Ok(program);
        }
    }
}
