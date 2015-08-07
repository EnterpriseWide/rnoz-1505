using ewide.web.Extensions;
using ewide.web.Models;
using ewide.web.Utils;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize]
    [RoutePrefix("api/sessions")]
    public class SessionsController : BaseApiController
    {

        public IQueryable<CoachingSession> Get()
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var isAdmin = AppUserManager.IsInRole(currentUser.Id, "Admin");
            var sessions = AppDb
                .CoachingSessions
                .Include("CoachingProgram.Coach")
                .Include("CoachingProgram.Coachee")
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id ||
                    isAdmin)
                .Where(i => !i.IsClosed)
                .Where(i => !i.CoachingProgram.IsClosed)
                .OrderBy(i => i.StartedAt);
            return sessions;
        }

        public IEnumerable<CoachingSession> GetByDate(DateTime date)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var sessions = AppDb.CoachingSessions
                .Include(i => i.Room)
                .OnDay(date)
                .ToList();
            return sessions;
        }

        [Route("ByProgram")]
        public IQueryable<CoachingSession> GetByProgramId(int id)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var isAdmin = AppUserManager.IsInRole(currentUser.Id, "Admin");
            var sessions = AppDb
                .CoachingSessions
                .Include("CoachingProgram.Coach")
                .Include("CoachingProgram.Coachee")
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id ||
                    isAdmin)
                .Where(i => i.CoachingProgram.Id == id);
            return sessions;
        }

        public IHttpActionResult Get(int id)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var isAdmin = AppUserManager.IsInRole(currentUser.Id, "Admin");
            var session = AppDb
                .CoachingSessions
                .Include("CoachingProgram")
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id ||
                    isAdmin)
                .FirstOrDefault(i => i.Id == id);
            return Ok(session);
        }

        // PUT: api/CoachingSessions/5
        [ResponseType(typeof(void))]
        [Authorize(Roles = "Admin,Coach")]
        public async Task<IHttpActionResult> PutCoachingSession(int id, CoachingSession dto)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var isAdmin = AppUserManager.IsInRole(currentUser.Id, "Admin");
            var coachingSession = AppDb.CoachingSessions
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id ||
                    isAdmin)
                .FirstOrDefault(i => i.Id == id);
            if (coachingSession == null)
            {
                return BadRequest("Session Not Found");
            }

            coachingSession.StartedAt = dto.StartedAt;
            coachingSession.FinishedAt = dto.FinishedAt;
            coachingSession.IsClosed = dto.IsClosed;
            coachingSession.UpdatedAt = DateTime.Now;

            try
            {
                await AppDb.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoachingSessionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var newRecord = AppDb.CoachingSessions
                .Include(i => i.CoachingProgram.Coach)
                .Include(i => i.CoachingProgram.Coachee)
                .FirstOrDefault(i => i.Id == coachingSession.Id);
            var emailContent = ViewRenderer.RenderView("~/Views/Email/Session Updated.cshtml",
                new System.Web.Mvc.ViewDataDictionary { 
                { "Session", newRecord },
                { "Url", String.Format("{0}/#/program/{1}/", Request.RequestUri.Authority, newRecord.CoachingProgramId) },
                });
            EmailSender.SendEmail(newRecord.CoachingProgram.Coach.Email, "right.now. Video Coaching Session Updated", emailContent);
            EmailSender.SendEmail(newRecord.CoachingProgram.Coachee.Email, "right.now. Video Coaching Session Updated", emailContent);

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CoachingSessions
        [ResponseType(typeof(CoachingSession))]
        [Authorize(Roles = "Admin,Coach")]
        public async Task<IHttpActionResult> PostCoachingSession(CoachingSession coachingSession)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppDb.CoachingSessions.Add(coachingSession);
            await AppDb.SaveChangesAsync();

            var newRecord = AppDb.CoachingSessions
                .Include(i => i.CoachingProgram.Coach)
                .Include(i => i.CoachingProgram.Coachee)
                .FirstOrDefault(i => i.Id == coachingSession.Id);
            var emailContent = ViewRenderer.RenderView("~/Views/Email/Session Created.cshtml",
                new System.Web.Mvc.ViewDataDictionary { 
                { "Session", newRecord },
                { "Url", String.Format("{0}/#/program/{1}/", Request.RequestUri.Authority, newRecord.CoachingProgramId) },
                });
            EmailSender.SendEmail(newRecord.CoachingProgram.Coach.Email, "right.now. Video Coaching Session Created", emailContent);
            EmailSender.SendEmail(newRecord.CoachingProgram.Coachee.Email, "right.now. Video Coaching Session Created", emailContent);

            return CreatedAtRoute("DefaultApi", new { id = coachingSession.Id }, coachingSession);
        }

        // DELETE: api/CoachingSessions/5
        [ResponseType(typeof(CoachingSession))]
        [Authorize(Roles = "Admin,Coach")]
        public async Task<IHttpActionResult> DeleteCoachingSession(int id)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var coachingSession = AppDb.CoachingSessions
                .Include(i => i.CoachingProgram.Coach)
                .Include(i => i.CoachingProgram.Coachee)
                .FirstOrDefault(i => i.Id == id);
            if (coachingSession == null)
            {
                return NotFound();
            }

            var newRecord = new CoachingSession
            {
                StartedAt = coachingSession.StartedAt,
                FinishedAt = coachingSession.FinishedAt,
                CoachingProgramId = coachingSession.CoachingProgramId,
                CoachingProgram = new CoachingProgram
                {
                    Coach = new ApplicationUser
                    {
                        Email = coachingSession.CoachingProgram.Coach.Email
                    },
                    Coachee = new ApplicationUser
                    {
                        Email = coachingSession.CoachingProgram.Coachee.Email
                    }
                }
            };

            AppDb.CoachingSessions.Remove(coachingSession);
            await AppDb.SaveChangesAsync();

            var emailContent = ViewRenderer.RenderView("~/Views/Email/Session Deleted.cshtml",
                new System.Web.Mvc.ViewDataDictionary { 
                { "Session", newRecord },
                { "Url", String.Format("{0}/#/program/{1}/", Request.RequestUri.Authority, newRecord.CoachingProgramId) },
                });
            EmailSender.SendEmail(newRecord.CoachingProgram.Coach.Email, "right.now. Video Coaching Session Cancelled", emailContent);
            EmailSender.SendEmail(newRecord.CoachingProgram.Coachee.Email, "right.now. Video Coaching Session Cancelled", emailContent);

            return Ok(coachingSession);
        }

        private bool CoachingSessionExists(int id)
        {
            return AppDb.CoachingSessions.Count(e => e.Id == id) > 0;
        }
    }

}
