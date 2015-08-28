using DDay.iCal;
using DDay.iCal.Serialization.iCalendar;
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
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Net.Mime;
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
                    i.CoachingProgram.Coachee.Id == currentUser.Id)
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

            var updateICal = coachingSession.StartedAt != dto.StartedAt || coachingSession.FinishedAt != dto.FinishedAt;
            if (updateICal)
            {
                coachingSession.Sequence += 1;
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
            var subject = String.Format("right.now. Coaching Session with {0} and {1}", newRecord.CoachingProgram.Coach.GetFullName(), newRecord.CoachingProgram.Coachee.GetFullName());
            var ical = GetiCal(newRecord, subject, "REQUEST");
            var attachment = System.Net.Mail.Attachment.CreateAttachmentFromString(ical, String.Format("{0}.ics", subject));
            var emailContentCoach = ViewRenderer.RenderView("~/Views/Email/Session Updated.cshtml",
                new System.Web.Mvc.ViewDataDictionary { 
                { "Session", newRecord },
                { "Url", String.Format("{0}/#/program/{1}/", Request.RequestUri.Authority, newRecord.CoachingProgramId) },
                { "StartedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.StartedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coach.Timezone)) },
                { "FinishedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.FinishedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coach.Timezone)) },
                });
            EmailSender.SendEmail(newRecord.CoachingProgram.Coach.Email, "right.now. Video Coaching Session Updated", emailContentCoach, updateICal ? attachment : null);
            var emailContentCoachee = ViewRenderer.RenderView("~/Views/Email/Session Updated.cshtml",
                new System.Web.Mvc.ViewDataDictionary { 
                { "Session", newRecord },
                { "Url", String.Format("{0}/#/program/{1}/", Request.RequestUri.Authority, newRecord.CoachingProgramId) },
                { "StartedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.StartedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coachee.Timezone)) },
                { "FinishedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.FinishedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coachee.Timezone)) },
                });
            EmailSender.SendEmail(newRecord.CoachingProgram.Coachee.Email, "right.now. Video Coaching Session Updated", emailContentCoachee, updateICal ? attachment : null);

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("AsClosed")]
        public async Task<IHttpActionResult> PutCoachingSession(int id)
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

            coachingSession.IsClosed = true;
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
            var emailContentCoach = ViewRenderer.RenderView("~/Views/Email/Session Updated.cshtml",
                new System.Web.Mvc.ViewDataDictionary {
                { "Session", newRecord },
                { "Url", String.Format("{0}/#/program/{1}/", Request.RequestUri.Authority, newRecord.CoachingProgramId) },
                { "StartedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.StartedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coach.Timezone)) },
                { "FinishedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.FinishedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coach.Timezone)) },
                });
            EmailSender.SendEmail(newRecord.CoachingProgram.Coach.Email, "right.now. Video Coaching Session Updated", emailContentCoach);
            var emailContentCoachee = ViewRenderer.RenderView("~/Views/Email/Session Updated.cshtml",
                new System.Web.Mvc.ViewDataDictionary { 
                { "Session", newRecord },
                { "Url", String.Format("{0}/#/program/{1}/", Request.RequestUri.Authority, newRecord.CoachingProgramId) },
                { "StartedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.StartedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coachee.Timezone)) },
                { "FinishedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.FinishedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coachee.Timezone)) },
                });
            EmailSender.SendEmail(newRecord.CoachingProgram.Coachee.Email, "right.now. Video Coaching Session Updated", emailContentCoachee);

            return StatusCode(HttpStatusCode.NoContent);
        }

        public String GetiCal(CoachingSession session, string subject, string method = "")
        {
            if (String.IsNullOrEmpty(session.CoachingProgram.Coach.Email))
            {
                throw new Exception("Organizer provided was null");
            }

            var iCal = new iCalendar
            {
                Method = "PUBLISH",
                Version = "2.0",
            };

            var evt = iCal.Create<Event>();

            switch (method)
            {
                case "CANCELLED":
                    iCal.Method = method;
                    evt.Status = EventStatus.Cancelled;
                    break;
                case "REQUEST":
                    iCal.Method = method;
                    break;
                default:
                    break;
            }

            evt.Summary = subject;
            evt.Start = new iCalDateTime(session.StartedAt);
            evt.End = new iCalDateTime(session.FinishedAt);
            evt.Description = subject;
            evt.IsAllDay = false;
            evt.UID = String.Format("rightnow.oztrain.com.au-{0}", session.Id);
            evt.Organizer = new Organizer(session.CoachingProgram.Coach.Email);
            evt.Sequence = session.Sequence;

            return new iCalendarSerializer().SerializeToString(iCal);
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

            using (var db = AppDb.Database.BeginTransaction())
            {
                try
                {
                    var start = coachingSession.StartedAt;
                    var end = coachingSession.FinishedAt;
                    // check if the coach is double booked
                    //var dbCoach = AppDb.CoachingSessions
                    //    .Where(i => i.CoachingProgram.Coach.Id == coachingSession.CoachingProgram.CoachId)
                    //    .Where(i => (i.StartedAt >= start && i.StartedAt < end) || (i.FinishedAt > start && i.FinishedAt <= end))
                    //    .ToList();
                    //if (dbCoach.Count() > 0)
                    //{
                    //    throw new Exception("Coach cannot be double booked");
                    //}

                    // check if the coachee is double booked
                    //var dbCoachee = AppDb.CoachingSessions
                    //    .Where(i => i.CoachingProgram.Coachee.Id == coachingSession.CoachingProgram.CoacheeId)
                    //    .OnAtSameTime(coachingSession.StartedAt, coachingSession.FinishedAt);
                    //if (dbCoach.Count() > 0)
                    //{
                    //    throw new Exception("Coachee cannot be double booked");
                    //}

                    //// check if the room is double booked
                    //var dbRoom = AppDb.CoachingSessions
                    //    .Where(i => i.Room.Id == coachingSession.RoomId)
                    //    .OnAtSameTime(coachingSession.StartedAt, coachingSession.FinishedAt);
                    //if (dbCoach.Count() > 0)
                    //{
                    //    throw new Exception("Room cannot be double booked");
                    //}

                    AppDb.CoachingSessions.Add(coachingSession);
                    await AppDb.SaveChangesAsync();
                    db.Commit();
                }
                catch (Exception)
                {
                    db.Rollback();
                }
            }

            var newRecord = AppDb.CoachingSessions
                .Include(i => i.CoachingProgram.Coach)
                .Include(i => i.CoachingProgram.Coachee)
                .FirstOrDefault(i => i.Id == coachingSession.Id);
            var subject = String.Format("right.now. Coaching Session with {0} and {1}", newRecord.CoachingProgram.Coach.GetFullName(), newRecord.CoachingProgram.Coachee.GetFullName());
            var ical = GetiCal(newRecord, subject);
            var attachment = System.Net.Mail.Attachment.CreateAttachmentFromString(ical, String.Format("{0}.ics", subject));
            var emailContentCoach = ViewRenderer.RenderView("~/Views/Email/Session Created.cshtml",
                new System.Web.Mvc.ViewDataDictionary { 
                    { "Session", newRecord },
                { "Url", String.Format("{0}/#/program/{1}/", Request.RequestUri.Authority, newRecord.CoachingProgramId) },
                { "StartedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.StartedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coach.Timezone)) },
                { "FinishedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.FinishedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coach.Timezone)) },
                });
            EmailSender.SendEmail(newRecord.CoachingProgram.Coach.Email, "right.now. Video Coaching Session Created", emailContentCoach, attachment);
            var emailContentCoachee = ViewRenderer.RenderView("~/Views/Email/Session Created.cshtml",
                new System.Web.Mvc.ViewDataDictionary { 
                { "Session", newRecord },
                { "Url", String.Format("{0}/#/program/{1}/", Request.RequestUri.Authority, newRecord.CoachingProgramId) },
                { "StartedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.StartedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coachee.Timezone)) },
                { "FinishedAt", TimeZoneInfo.ConvertTimeFromUtc(newRecord.FinishedAt, TimeZoneInfo.FindSystemTimeZoneById(newRecord.CoachingProgram.Coachee.Timezone)) },
                });
            EmailSender.SendEmail(newRecord.CoachingProgram.Coachee.Email, "right.now. Video Coaching Session Created", emailContentCoachee, attachment);

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
            var subject = String.Format("right.now. Coaching Session with {0} and {1}", coachingSession.CoachingProgram.Coach.GetFullName(), coachingSession.CoachingProgram.Coachee.GetFullName());
            coachingSession.Sequence += 1;
            var ical = GetiCal(coachingSession, subject, "CANCELLED");
            var attachment = System.Net.Mail.Attachment.CreateAttachmentFromString(ical, String.Format("{0}.ics", subject));
            if (coachingSession == null)
            {
                return NotFound();
            }
            var emailContentCoach = ViewRenderer.RenderView("~/Views/Email/Session Deleted.cshtml",
                new System.Web.Mvc.ViewDataDictionary { 
                { "Session", coachingSession },
                { "Url", String.Format("{0}/program/{1}/", Request.RequestUri.Authority, coachingSession.CoachingProgramId) },
                { "StartedAt", TimeZoneInfo.ConvertTimeFromUtc(coachingSession.StartedAt, TimeZoneInfo.FindSystemTimeZoneById(coachingSession.CoachingProgram.Coach.Timezone)) },
                { "FinishedAt", TimeZoneInfo.ConvertTimeFromUtc(coachingSession.FinishedAt, TimeZoneInfo.FindSystemTimeZoneById(coachingSession.CoachingProgram.Coach.Timezone)) },
            });
            var coachEmail = coachingSession.CoachingProgram.Coach.Email;
            var emailContentCoachee = ViewRenderer.RenderView("~/Views/Email/Session Deleted.cshtml",
                new System.Web.Mvc.ViewDataDictionary { 
                { "Session", coachingSession },
                { "Url", String.Format("{0}/program/{1}/", Request.RequestUri.Authority, coachingSession.CoachingProgramId) },
                { "StartedAt", TimeZoneInfo.ConvertTimeFromUtc(coachingSession.StartedAt, TimeZoneInfo.FindSystemTimeZoneById(coachingSession.CoachingProgram.Coachee.Timezone)) },
                { "FinishedAt", TimeZoneInfo.ConvertTimeFromUtc(coachingSession.FinishedAt, TimeZoneInfo.FindSystemTimeZoneById(coachingSession.CoachingProgram.Coachee.Timezone)) },
            });
            var coacheeEmail = coachingSession.CoachingProgram.Coachee.Email;

            AppDb.CoachingSessions.Remove(coachingSession);
            await AppDb.SaveChangesAsync();

            EmailSender.SendEmail(coachEmail, "right.now. Video Coaching Session Cancelled", emailContentCoach, attachment);
            EmailSender.SendEmail(coacheeEmail, "right.now. Video Coaching Session Cancelled", emailContentCoachee, attachment);

            return Ok(coachingSession);
        }

        private bool CoachingSessionExists(int id)
        {
            return AppDb.CoachingSessions.Count(e => e.Id == id) > 0;
        }
    }

}
