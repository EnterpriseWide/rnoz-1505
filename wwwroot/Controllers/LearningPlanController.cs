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

namespace ewide.web.Controllers
{
    [Authorize]
    [RoutePrefix("api/learningplan")]
    public class LearningPlanController : BaseApiController
    {
        private IQueryable<CoachingProgram> GetCoachingPrograms()
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var programs = AppDb.CoachingPrograms
                .Include("Coach")
                .Include("Coachee")
                .Where(i =>
                    i.Coach.Id == currentUser.Id ||
                    i.Coachee.Id == currentUser.Id
                );
            return programs;
        }

        [ResponseType(typeof(LearningPlanDTO))]
        public IHttpActionResult GetLearningPlan(int id)
        {
            var item = GetCoachingPrograms()
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

        [Route("DownloadPdf")]
        public HttpResponseMessage GetPdf(int id)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var program = AppDb.CoachingPrograms
                .Include("Coach")
                .Include("Coachee")
                //.Include("CoachingSessions")
                .Where(i =>
                    i.Coach.Id == currentUser.Id ||
                    i.Coachee.Id == currentUser.Id
                )
                .FirstOrDefault(i => i.Id == id);
            try
            {
                var converter = new SelectPdf.HtmlToPdf();
                var html = String.Format("<html><body>{0}</body></html>", program.LearningPlan);
                var doc = converter.ConvertHtmlString(html);
                var result = new HttpResponseMessage(HttpStatusCode.OK);
                var stream = new MemoryStream();
                doc.Save(stream);
                result.Content = new StreamContent(stream);
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = String.Format("LearningPlan.{0}.pdf", DateTime.Now.ToString("yyyyMMdd.HHmmss"));
                return result;
            }
            catch
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }
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

            var coachingProgram = GetCoachingPrograms()
                .SingleOrDefault(i => i.Id == item.Id);
            if (id != item.Id)
            {
                return BadRequest("Learning Program Not Found");
            }
            coachingProgram.LearningPlan = item.LearningPlan;
            coachingProgram.UpdatedAt = DateTime.Now;
            AppDb.Entry(coachingProgram).State = EntityState.Modified;

            try
            {
                AppDb.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoachingProgramExists(id))
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

        private bool CoachingProgramExists(int id)
        {
            return GetCoachingPrograms().Count(e => e.Id == id) > 0;
        }

    }
}