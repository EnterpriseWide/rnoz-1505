using AutoMapper;
using ewide.web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize]
    public class TimezonesController : BaseApiController
    {
        public IReadOnlyCollection<TimeZoneInfo> GetTimezones()
        {
            return TimeZoneInfo.GetSystemTimeZones();
        }
    }
}