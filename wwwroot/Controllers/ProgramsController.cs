using ewide.web.Models;
using ewide.web.Utils;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Cors;
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

        [ResponseType(typeof(CoachingProgram))]
        public IHttpActionResult GetCoachingProgram(int id)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var program = GetCoachingPrograms(currentUser)
                .SingleOrDefault(i => i.Id == id);
            return Ok(program);
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
            if (coachingProgram == null || coachingProgram.IsClosed)
            {
                return BadRequest("Program Not Found");
            }

            coachingProgram.InvoiceAmount = amount;
            AppDb.Entry(coachingProgram).Property(i => i.InvoiceAmount).IsModified = true;
            coachingProgram.UpdatedAt = DateTime.Now;
            AppDb.Entry(coachingProgram).Property(i => i.UpdatedAt).IsModified = true;

            var html = ViewRenderer.RenderView("~/Views/Send Invoice.cshtml", new System.Web.Mvc.ViewDataDictionary { { "Program Id", coachingProgram.Id }, { "Invoice Amount", amount } });

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
}
