using ewide.web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize]
    [RoutePrefix("api/ProgramMedia")]
    public class ProgramMediaController : BaseApiController
    {
        private IEnumerable<ProgramMedia> GetProgramMediaList(ApplicationUser currentUser)
        {
            return AppDb.ProgramMedia
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id);
        }

        private IEnumerable<ProgramMedia> GetProgramMediaListFull(ApplicationUser currentUser)
        {
            return AppDb.ProgramMedia
                .Include(i => i.CoachingProgram.Coach)
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id);
        }

        private static string GetRootFolder(CoachingProgram program)
        {
            var path = String.Format("{0}/{1}/",
                HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["Program Media Folder"]),
                program.Id
                );
            Directory.CreateDirectory(path);
            return path;
        }

        public IHttpActionResult GetProgramMedias(Int64 programId, MediaType mediaType)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var program = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == programId);
            if (program == null)
            {
                return NotFound();
            }
            var root = GetRootFolder(program);
            var list = GetProgramMediaList(currentUser)
                .Where(i => i.MediaType == mediaType);
            return Ok(list);
        }

        [ResponseType(typeof(ProgramMedia))]
        public IHttpActionResult GetProgramMedia(Int64 id, MediaType mediaType)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var item = GetProgramMediaList(currentUser)
                .Where(i => i.MediaType == mediaType)
                .FirstOrDefault(i => i.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [ResponseType(typeof(void))]
        public IHttpActionResult PutProgramMedia(int id, ProgramMedia item)
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
            var programMedia = GetProgramMediaList(currentUser)
                .FirstOrDefault(i => i.Id == item.Id);
            if (id != item.Id)
            {
                return NotFound();
            }
            if (programMedia.MediaType == MediaType.Resource && !(AppUserManager.IsInRole(currentUser.Id, "Coach") || AppUserManager.IsInRole(currentUser.Id, "Admin")))
            {
                return BadRequest("Only Coaches can upload Resources");
            }

            var isLink = !String.IsNullOrEmpty(programMedia.Link);
            if (isLink && String.IsNullOrEmpty(item.Link))
            {
                return BadRequest("Links cannot be empty");
            }
            if (!isLink && !String.IsNullOrEmpty(item.Link))
            {
                return BadRequest("Non Links do not have a Link Property");
            }

            AppDb.Entry(programMedia).State = EntityState.Modified;

            programMedia.Name = item.Name;
            programMedia.BodyText = item.BodyText;
            programMedia.Link = item.Link;
            programMedia.UpdatedAt = DateTime.Now;

            try
            {
                AppDb.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgramMediaExists(id, currentUser))
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

        public async Task<HttpResponseMessage> PostFormData(int programId, MediaType mediaType)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            if (mediaType == MediaType.Resource && !(AppUserManager.IsInRole(currentUser.Id, "Coach") || AppUserManager.IsInRole(currentUser.Id, "Admin")))
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Only Coaches can upload Resources");
            }
            var program = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == programId);
            if (program == null)
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden);
            }
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            string root = GetRootFolder(program);
            var provider = new MultipartFormDataStreamProvider(root);
            try
            {
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);
                var programMediaList = new List<ProgramMedia>();
                foreach (var file in provider.FileData)
                {
                    var originalFileName = file.Headers.ContentDisposition.FileName.Replace("\"", string.Empty);
                    var programMedia = new ProgramMedia
                    {
                        BodyText = String.Empty,
                        CoachingProgram = program,
                        CreatedAt = DateTime.Now,
                        Name = originalFileName,
                        OriginalFileName = originalFileName,
                        FileName = Path.GetFileName(file.LocalFileName),
                        MediaType = mediaType,
                        UpdatedAt = DateTime.Now,
                    };
                    AppDb.ProgramMedia.Add(programMedia);
                    programMediaList.Add(programMedia);
                }
                AppDb.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, programMediaList);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [ResponseType(typeof(ProgramMedia))]
        [Route("AddLink")]
        public IHttpActionResult PostAddLink(MediaType mediaType, ProgramMediaDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            if (mediaType == MediaType.Resource && !(AppUserManager.IsInRole(currentUser.Id, "Coach") || AppUserManager.IsInRole(currentUser.Id, "Admin")))
            {
                return BadRequest("Only Coaches can upload Resources");
            }
            var coachingProgram = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == dto.CoachingProgramId);
            if (coachingProgram == null)
            {
                if (coachingProgram == null)
                {
                    ModelState.AddModelError("CoachingProgramId", "Coaching Program Is Required");
                    return BadRequest(ModelState);
                }
            }

            var programMedia = new ProgramMedia
            {
                BodyText = String.Empty,
                CoachingProgram = coachingProgram,
                CreatedAt = DateTime.Now,
                Link = dto.Link,
                Name = String.IsNullOrEmpty(dto.Name) ? dto.Link : dto.Name,
                MediaType = mediaType,
                UpdatedAt = DateTime.Now,
            };
            AppDb.ProgramMedia.Add(programMedia);

            AppDb.SaveChanges();
            return Ok(programMedia);
        }

        [ResponseType(typeof(ProgramMedia))]
        public IHttpActionResult DeleteProgramMedia(int id)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var programMedia = GetProgramMediaListFull(currentUser)
                .FirstOrDefault(i => i.Id == id);
            if (programMedia == null)
            {
                return NotFound();
            }
            if (!AppUserManager.IsInRole(currentUser.Id, "Admin"))
            {
                switch (programMedia.MediaType)
                {
                    case MediaType.Resource:
                        if (currentUser.Id != programMedia.CoachingProgram.Coach.Id)
                        {
                            return BadRequest("Only Coaches can delete Resources");
                        }
                        break;
                    case MediaType.Upload:
                    default:
                        break;
                }
            }
            string ProgramMediaDirectory = GetRootFolder(programMedia.CoachingProgram);
            AppDb.ProgramMedia.Remove(programMedia);
            var fileName = String.Format("{0}{1}", ProgramMediaDirectory, programMedia.FileName);
            if (File.Exists(fileName))
            {
                File.Delete(fileName);
            }
            AppDb.SaveChanges();
            return Ok(programMedia);
        }

        private bool ProgramMediaExists(int id, ApplicationUser currentUser)
        {
            return GetProgramMediaList(currentUser).Count(e => e.Id == id) > 0;
        }
    }

    public class ProgramMediaDTO
    {
        public String Name { get; set; }
        [Required]
        public String Link { get; set; }
        public int CoachingProgramId { get; set; }
    }
}
