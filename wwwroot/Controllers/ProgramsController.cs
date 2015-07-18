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
    [Authorize]
    [RoutePrefix("api/programs")]
    public class ProgramsController : BaseApiController
    {
        public IQueryable<CoachingProgram> GetCoachingProgram()
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var programs = GetCoachingPrograms(currentUser);
            return programs;
        }

        [ResponseType(typeof(GetCoachingProgramForAdminResponse))]
        [Authorize(Roles = "Admin")]
        [Route("ForAdmin")]
        public IHttpActionResult GetCoachingProgramForAdmin(int pageNumber = 1, int pageSize = 25, String sort = "CreatedAt desc")
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var programs = GetCoachingPrograms(currentUser);
            if (String.IsNullOrEmpty(sort) || sort == "null")
            {
                programs = programs.OrderByDescending(i => i.CreatedAt);
            }
            else
            {
                if (sort.EndsWith(","))
                {
                    sort = sort.TrimEnd(',');
                }
                programs = programs.OrderBy(sort);
            }
            var count = programs.Count();
            programs = programs
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);
            return Ok(new GetCoachingProgramForAdminResponse
            {
                TotalItems = count,
                Items = programs.ToList(),
            });
        }

        [ResponseType(typeof(CoachingProgram))]
        public IHttpActionResult GetCoachingProgram(int id)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var program = GetCoachingPrograms(currentUser)
                .SingleOrDefault(i => i.Id == id);
            if (program.CoachingProgramSurveys.Count > 0)
            {
                program.SurveyIds = program.CoachingProgramSurveys.Select(i => i.SurveyId).ToList();
            }
            return Ok(program);
        }

        [ResponseType(typeof(CoachingProgram))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PostProgram(CoachingProgramDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var isCoach = AppUserManager.FindById(dto.CoachId)
                .GetRoles(AppRoleManager)
                .Any(i => i == "Coach");
            if (!isCoach)
            {
                ModelState.AddModelError("Coach", "A User that has the Role of Coach Is Required");
                return BadRequest(ModelState);
            }

            var row = new CoachingProgram
            {
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Coach = AppUserManager.FindById(dto.CoachId),
                Coachee = AppUserManager.FindById(dto.CoacheeId),
            };
            foreach (var surveyId in dto.SurveyIds)
            {
                var cps = new CoachingProgramSurvey
                {
                    SurveyId = Convert.ToInt32(surveyId),
                    CoachingProgram = row,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                };
                AppDb.CoachingProgramSurvey.Add(cps);
            }

            AppDb.CoachingPrograms.Add(row);
            AppDb.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = row.Id }, row);
        }

        [ResponseType(typeof(CoachingProgram))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PutProgram(int id, CoachingProgramDTO dto)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isCoach = AppUserManager.FindById(dto.CoachId)
                .GetRoles(AppRoleManager)
                .Any(i => i == "Coach");
            if (!isCoach)
            {
                ModelState.AddModelError("Coach", "A User that has the Role of Coach Is Required");
                return BadRequest(ModelState);
            }

            var coachingProgram = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == id);
            if (coachingProgram == null)
            {
                return BadRequest("Program Not Found");
            }

            coachingProgram.InvoiceAmount = dto.InvoiceAmount;
            coachingProgram.IsClosed = dto.IsClosed;
            coachingProgram.CoachId = dto.CoachId;
            coachingProgram.CoacheeId = dto.CoacheeId;
            coachingProgram.UpdatedAt = DateTime.Now;

            foreach (var survey in coachingProgram.CoachingProgramSurveys.ToList())
            {
                if (!dto.SurveyIds.Any(i => i == survey.SurveyId))
                {
                    AppDb.CoachingProgramSurvey.Remove(survey);
                }
            }

            foreach (var surveyId in dto.SurveyIds)
            {
                if (!coachingProgram.CoachingProgramSurveys.Any(i => i.SurveyId == surveyId))
                {
                    var cps = new CoachingProgramSurvey
                    {
                        SurveyId = Convert.ToInt32(surveyId),
                        CoachingProgram = coachingProgram,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                    };
                    AppDb.CoachingProgramSurvey.Add(cps);
                }
            }

            try
            {
                AppDb.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoachingProgramExists(id, currentUser))
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

        [ResponseType(typeof(void))]
        [Authorize(Roles = "Coach")]
        [Route("Close")]
        public IHttpActionResult PutCloseCoachingProgram(int id)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var coachingProgram = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == id);
            if (coachingProgram == null || coachingProgram.IsClosed)
            {
                return BadRequest("Program Not Found");
            }

            coachingProgram.IsClosed = true;
            AppDb.Entry(coachingProgram).Property(i => i.IsClosed).IsModified = true;
            coachingProgram.UpdatedAt = DateTime.Now;
            AppDb.Entry(coachingProgram).Property(i => i.UpdatedAt).IsModified = true;

            try
            {
                AppDb.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoachingProgramExists(id, currentUser))
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

        [ResponseType(typeof(void))]
        [Authorize(Roles = "Coach")]
        [Route("SendInvoice")]
        public IHttpActionResult PutSendInvoiceForCoachingProgram(int id, Decimal amount)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var coachingProgram = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == id);
            if (coachingProgram == null || coachingProgram.IsClosed || coachingProgram.InvoiceAmount > 0)
            {
                return BadRequest("Program Not Found");
            }

            coachingProgram.InvoiceAmount = amount;
            AppDb.Entry(coachingProgram).Property(i => i.InvoiceAmount).IsModified = true;
            coachingProgram.UpdatedAt = DateTime.Now;
            AppDb.Entry(coachingProgram).Property(i => i.UpdatedAt).IsModified = true;

            var html = ViewRenderer.RenderView("~/Views/Send Invoice.cshtml",
                new System.Web.Mvc.ViewDataDictionary { 
                { "Program", coachingProgram },
                });

            try
            {
                AppDb.SaveChanges();
                SendEmail(currentUser.Email, "Admin",
                    ConfigurationManager.AppSettings["AdminEmail"], "Send Invoice", html, true);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoachingProgramExists(id, currentUser))
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

        private bool CoachingProgramExists(int id, ApplicationUser currentUser)
        {
            return GetCoachingPrograms(currentUser).Count(e => e.Id == id) > 0;
        }

        private static void SendEmail(string from, string from_name, string to, string subject, string body, bool isHtml)
        {
            var message = new MailMessage();
            if (!string.IsNullOrEmpty(from_name))
            {
                message.From = new MailAddress(from, from_name);
            }
            else
            {
                message.From = new MailAddress(from);
            }
            message.To.Add(new MailAddress(to));
            message.Subject = subject;
            message.Body = body;
            message.IsBodyHtml = isHtml;

            var mailClient = new SmtpClient();
            mailClient.Send(message);
        }

    }

    public class GetCoachingProgramForAdminResponse
    {
        public int TotalItems { get; set; }
        public List<CoachingProgram> Items { get; set; }
    }
}
