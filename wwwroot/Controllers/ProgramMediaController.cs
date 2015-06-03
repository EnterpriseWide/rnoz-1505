using ewide.web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
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
    public class ProgramMediaController : BaseApiController
    {
        private IEnumerable<FileInfo> GetList(ApplicationUser currentUser, string root)
        {
            var dir = Directory.CreateDirectory(root);
            return dir.GetFiles();
        }

        // GET: api/Assignments
        public IHttpActionResult GetResources(int programId, MediaType mediaType)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var program = GetCoachingPrograms(currentUser)
                .FirstOrDefault(i => i.Id == programId);
            if (program == null)
            {
                return NotFound();
            }
            string root = HttpContext.Current.Server.MapPath(String.Format("~/App_Data/ProgramMedia/{0}/{1}/", program.Id, MediaType.Resource));
            var list = GetList(currentUser, root)
                .Select(i => new ProgramMedia
                {
                    Name = i.Name,
                    CreatedAt = i.CreationTime,
                    UpdatedAt = i.LastWriteTime,
                    Size = i.Length / 1024,
                    CoachingProgram = program,
                    FileName = i.FullName,
                    MediaType = mediaType,
                });
            return Ok(list);
        }

        public async Task<HttpResponseMessage> PostFormData(int programId, MediaType mediaType)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            if (mediaType == MediaType.Upload && !(AppUserManager.IsInRole(currentUser.Id, "Coach") || AppUserManager.IsInRole(currentUser.Id, "Admin")))
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
            string root = HttpContext.Current.Server.MapPath(String.Format("~/App_Data/ProgramMedia/{0}/{1}/", programId, mediaType));
            Directory.CreateDirectory(root);
            var provider = new CustomMultipartFormDataStreamProvider(root);
            //var provider = new MultipartFormDataStreamProvider(root);
            try
            {
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);
                var programMediaList = new List<ProgramMedia>();
                foreach (var file in provider.FileData)
                {
                    var fileInfo = new FileInfo(file.LocalFileName);
                    programMediaList.Add(new ProgramMedia
                    {
                        Name = fileInfo.Name,
                        CreatedAt = fileInfo.CreationTime,
                        UpdatedAt = fileInfo.LastWriteTime,
                        Size = fileInfo.Length / 1024,
                        CoachingProgram = program,
                        FileName = fileInfo.FullName,
                        MediaType = mediaType,
                    });
                }
                return Request.CreateResponse(HttpStatusCode.OK, programMediaList);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }

    // We implement MultipartFormDataStreamProvider to override the filename of File which
    // will be stored on server, or else the default name will be of the format like Body-
    // Part_{GUID}. In the following implementation we simply get the FileName from 
    // ContentDisposition Header of the Request Body.
    public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public CustomMultipartFormDataStreamProvider(string path) : base(path) { }
        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            var ordinal = 1;
            var filename = headers.ContentDisposition.FileName.Replace("\"", string.Empty);
            var fileInfo = new FileInfo(filename);
            var newFileInfo = new FileInfo(Path.Combine(this.RootPath, fileInfo.Name));
            var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileInfo.Name);
            var fileNameExtension = fileInfo.Extension;
            while (File.Exists(newFileInfo.FullName))
            {
                newFileInfo = new FileInfo(Path.Combine(
                    this.RootPath,
                    String.Format("{0} ({1}){2}", fileNameWithoutExtension, ordinal++, fileNameExtension)
                    ));
            }
            return newFileInfo.Name;
        }
    }
}
