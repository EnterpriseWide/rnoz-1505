using ewide.web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using Weemo.Api;
using Weemo.Api.HttpWebRequest;

namespace ewide.web.Controllers
{
    [Authorize]
    public class WebRTCController : BaseApiController
    {
        
        public IHttpActionResult GetSightcallAuth()
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());

            if(String.IsNullOrEmpty(currentUser.SightCallUID))
            {
                return BadRequest("SightCall UID is Mandatory");
            }

            //var baseDir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var _appData = HttpContext.Current.Server.MapPath("~/App_Data/weemo.config/");
            //var pathToPrivateCA = Path.Combine(baseDir, "Certs", "authCA.crt").ToString();
            //var pathToClientCert = Path.Combine(baseDir, "Certs", "client.p12").ToString();

            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3;
            ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

            var config = new WeemoConfig(new CertLoader())
            {
                AuthUrl = "https://auth.rtccloud.net/auth/",
                ClientId = "cfbfd7ea119498d80564fcecd0d9b6",
                ClientSecret = "67bbfd0c22f1e0580b80bd84b2d4ba",
                ClientRootCertAuthorityIsInstalledOnServer = false
            }
                .SetClientRootCertAuthorityFromPath(_appData + "authCA.crt")
                .SetClientCertFromPath(_appData + "client.p12", "XnyexbUF");

            var validator = new CertificateValidator(config);
            var client = new HttpWebRequestWeemoClient(config, validator);
            var request = new AuthRequest
            {
                Uid = currentUser.SightCallUID,
                Domain = ConfigurationManager.AppSettings.Get("Domain"),
                LicenseType = ConfigurationManager.AppSettings.Get("LicenseType").ToLower() == "standard" ? WeemoLicenseTypes.standard : WeemoLicenseTypes.premium
            };

            //Response.Write("\n\n\nuid = " + request.Uid + ", " + request.LicenseType.ToString());

            //var token = client.GetAuthToken(request);
            //return Json(token, JsonRequestBehavior.AllowGet);

            AuthResponse token = null;
            var gotit = false;

            // ugly hack loop to get around inconsistent "Could not create SSL/TLS secure channel" exception
            for (var i = 0; i < 10; i++)
            {
                try
                {
                    token = client.GetAuthToken(request);
                    gotit = true;
                    break;
                }
                catch
                {
                    //Response.Write("\n\n\ni = " + i + ", " + DateTime.Now.ToString("hh:mm:ss") + "\n" + ex.Message);
                    System.Threading.Thread.Sleep(1000);
                }
            }
            if (gotit)
            {
                return Ok(token);
            }
            else
            {
                return BadRequest("Token could not be created!");
            }
        }
    }
}
