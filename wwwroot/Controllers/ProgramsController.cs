using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

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

        [Route("")]
        public IHttpActionResult Get(int id)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var program = AppDb.CoachingPrograms
                .Include("Coach")
                .Include("Coachee")
                .Include("CoachingSessions")
                .Where(i =>
                    i.Coach.Id == currentUser.Id ||
                    i.Coachee.Id == currentUser.Id
                )
                .FirstOrDefault(i => i.Id == id);
            return Ok(program);
        }

        [Route("learningplanpdf")]
        public HttpResponseMessage GetLearningPlanPdf(int id)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
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

    }
}
