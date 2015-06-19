using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ewide.web.Models;
using System.IO;
using System.Net.Http.Headers;
using System.Net.Mail;

namespace ewide.web.Controllers
{
    [Authorize]
    [RoutePrefix("api/LearningPlan")]
    public class LearningPlanController : BaseApiController
    {
        [ResponseType(typeof(LearningPlanDTO))]
        public IHttpActionResult GetLearningPlan(int id)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var item = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(new LearningPlanDTO
            {
                Id = item.Id,
                LearningPlan = item.LearningPlan,
                UpdatedAt = item.UpdatedAt,
            });
        }

        [Route("DownloadPDF")]
        [HttpGet]
        public HttpResponseMessage DownloadPDF(int id)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var program = AppDb.CoachingPrograms
                .FirstOrDefault(i => i.Id == id);
            Request.Headers.Accept.Clear();
            Request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/pdf"));
            return Request.CreateResponse(HttpStatusCode.OK,
                new LearningPlanDTO
                {
                    Id = program.Id,
                    LearningPlan = program.LearningPlan,
                    UpdatedAt = program.UpdatedAt,
                });
        }

        [ResponseType(typeof(void))]
        public IHttpActionResult PutLearningPlan(int id, LearningPlanDTO item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.Id)
            {
                return BadRequest();
            }

            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var coachingProgram = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == item.Id);
            if (id != item.Id)
            {
                return BadRequest("Learning Program Not Found");
            }

            coachingProgram.LearningPlan = item.LearningPlan;
            AppDb.Entry(coachingProgram).Property(i => i.LearningPlan).IsModified = true;
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
        public IHttpActionResult PostSendEmailWithPDF(int id, PostSendEmailWithPDFRequest request)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var program = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == id);
            var lp = new LearningPlanDTO
                {
                    Id = program.Id,
                    LearningPlan = program.LearningPlan,
                    UpdatedAt = program.UpdatedAt,
                };
            using (var fileStream = new MemoryStream())
            {
                var coacheeName = String.Format("{0} {1}", currentUser.FirstName, currentUser.LastName);
                var subject = String.Format("Learning Plan for {0}", coacheeName);

                var converter = new SelectPdf.HtmlToPdf();
                var html = String.Format("<html><body>{0}</body></html>", lp.LearningPlan);
                var doc = converter.ConvertHtmlString(html);
                doc.Save(fileStream);
                fileStream.Position = 0;
                var attachment = new Attachment(fileStream, subject, "application/pdf");

                SendEmail(currentUser.Email, coacheeName, request.recipients, subject,
                    String.Format("Find attached the Learning Plan for {0}", coacheeName), true,
                    attachment);
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        private static void SendEmail(string from, string from_name, string to, string subject, string body, bool isHtml, Attachment attachment)
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
            message.Attachments.Add(attachment);

            var mailClient = new SmtpClient();
            mailClient.Send(message);
        }

        private bool CoachingProgramExists(int id, ApplicationUser currentUser)
        {
            return GetCoachingPrograms(currentUser).Count(e => e.Id == id) > 0;
        }

        public class PostSendEmailWithPDFRequest
        {
            public string recipients { get; set; }
        }
    }
}