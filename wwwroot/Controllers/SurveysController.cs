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
    public class SurveysController : BaseApiController
    {
        private IQueryable<CoachingProgramSurvey> GetCoachingProgramSurveys(ApplicationUser currentUser)
        {
            var surveys = AppDb.CoachingProgramSurvey
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id);
            return surveys;
        }

        [Authorize(Roles = "Admin")]
        public IQueryable<Survey> GetSurveys()
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            return GetCoachingProgramSurveys(currentUser)
                .Select(i => i.Survey);
        }

        public IQueryable<Survey> GetSurveys(int programId)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            return GetCoachingProgramSurveys(currentUser)
                .Where(i => i.CoachingProgram.Id == programId)
                .Select(i => i.Survey)
                .Distinct();
        }

    }
}