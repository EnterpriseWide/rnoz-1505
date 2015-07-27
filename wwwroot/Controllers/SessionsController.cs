using ewide.web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
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
            var sessions = AppDb
                .CoachingSessions
                .Include("CoachingProgram.Coach")
                .Include("CoachingProgram.Coachee")
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id);
            return sessions;
        }

        [Route("ByProgram")]
        public IQueryable<CoachingSession> GetByProgramId(int id)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var sessions = AppDb
                .CoachingSessions
                .Include("CoachingProgram.Coach")
                .Include("CoachingProgram.Coachee")
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id)
                .Where(i => i.CoachingProgram.Id == id);
            return sessions;
        }

        public IHttpActionResult Get(int id)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            return Ok(AppDb.CoachingPrograms
                .Where(i => i.Coach.Id == currentUser.Id)
                .FirstOrDefault(i => i.Id == id));
        }

        // PUT: api/CoachingSessions/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCoachingSession(int id, CoachingSession coachingSession)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != coachingSession.Id)
            {
                return BadRequest();
            }

            AppDb.Entry(coachingSession).State = EntityState.Modified;

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

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CoachingSessions
        [ResponseType(typeof(CoachingSession))]
        public async Task<IHttpActionResult> PostCoachingSession(CoachingSession coachingSession)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppDb.CoachingSessions.Add(coachingSession);
            await AppDb.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = coachingSession.Id }, coachingSession);
        }

        // DELETE: api/CoachingSessions/5
        [ResponseType(typeof(CoachingSession))]
        public async Task<IHttpActionResult> DeleteCoachingSession(int id)
        {
            var coachingSession = await AppDb.CoachingSessions.FindAsync(id);
            if (coachingSession == null)
            {
                return NotFound();
            }
            AppDb.CoachingSessions.Remove(coachingSession);
            await AppDb.SaveChangesAsync();
            return Ok(coachingSession);
        }

        private bool CoachingSessionExists(int id)
        {
            return AppDb.CoachingSessions.Count(e => e.Id == id) > 0;
        }
    }
}
