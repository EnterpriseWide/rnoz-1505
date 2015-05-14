using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ewide.web.Controllers
{
    [Authorize]
    [RoutePrefix("api/programs")]
    public class ProgramsController : BaseApiController
    {
        [Route("")]
        public IHttpActionResult Get()
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var programs = AppDb
                .CoachingPrograms
                .Include("Coach")
                .Include("Coachee")
                .Where(i => 
                    i.Coach.Id == currentUser.Id ||
                    i.Coachee.Id == currentUser.Id);
            return Ok(programs);
        }

        public IHttpActionResult Get(int id)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            return Ok(AppDb.CoachingPrograms
                .Where(i => i.Coach.Id == currentUser.Id)
                .FirstOrDefault(i => i.Id == id));
        }

    }
}
