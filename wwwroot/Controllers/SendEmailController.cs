using ewide.web.Models;
using ewide.web.Utils;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Runtime.Serialization;
using System.Web.Http;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize]
    [RoutePrefix("api/SendEmail")]
    public class SendEmailController : BaseApiController
    {

        [ResponseType(typeof(void))]
        [Authorize(Roles = "Admin, Coach")]
        [Route("ToTheCoachee")]
        public IHttpActionResult PostToTheCoachee(EmailDTO emailDTO)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var program = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == emailDTO.Id);
            if (program == null)
            {
                return BadRequest("Program Not Found");
            }

            EmailSender.SendEmail(program.Coachee.Email, "Email to the Coachee", emailDTO.EmailBodyText, null, currentUser.Email, String.Format("{0} {1}", currentUser.FirstName, currentUser.LastName));
            return StatusCode(HttpStatusCode.NoContent);
        }

        [ResponseType(typeof(void))]
        [Route("ToTheCoach")]
        public IHttpActionResult PostToTheCoach(EmailDTO emailDTO)
        {
            var currentUser = this.AppUserManager.FindById(User.Identity.GetUserId());
            var program = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == emailDTO.Id);
            if (program == null)
            {
                return BadRequest("Program Not Found");
            }

            EmailSender.SendEmail(program.Coach.Email, "Email to the Coach", emailDTO.EmailBodyText, null, currentUser.Email, String.Format("{0} {1}", currentUser.FirstName, currentUser.LastName));
            return StatusCode(HttpStatusCode.NoContent);
        }

    }
}
