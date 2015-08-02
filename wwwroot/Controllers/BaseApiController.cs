using ewide.web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace ewide.web.Controllers
{
    public class BaseApiController : ApiController
    {
        //private ModelFactory _modelFactory;
        private ApplicationUserManager _AppUserManager = null;
        private ApplicationRoleManager _AppRoleManager = null;
        private ApplicationDbContext _AppDb = null;

        protected ApplicationUserManager AppUserManager { get { return _AppUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>(); } }
        protected ApplicationRoleManager AppRoleManager { get { return _AppRoleManager ?? Request.GetOwinContext().Get<ApplicationRoleManager>(); } }
        protected ApplicationDbContext AppDb { get { return _AppDb ?? Request.GetOwinContext().Get<ApplicationDbContext>(); } }

        public BaseApiController() { }

        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        protected IQueryable<CoachingProgram> GetCoachingPrograms(ApplicationUser currentUser)
        {
            var isAdmin = AppUserManager.IsInRole(currentUser.Id, "Admin");
            var programs = AppDb.CoachingPrograms
                .Include(i => i.Coach)
                .Include(i => i.Coachee)
                .Include(i => i.CoachingSessions)
                .Include("CoachingSessions.Room")
                .Include(i => i.CoachingProgramSurveys)
                .Where(i =>
                    i.Coach.Id == currentUser.Id ||
                    i.Coachee.Id == currentUser.Id ||
                    isAdmin);
            return programs;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                AppDb.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}