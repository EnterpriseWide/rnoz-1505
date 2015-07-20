using ewide.web.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Web.Http;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize]
    [RoutePrefix("api/surveys")]
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

        [ResponseType(typeof(List<Survey>))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult GetSurveys()
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            return Ok(AppDb.Survey.ToList());
        }

        public IQueryable<Survey> GetSurveys(int programId)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            return GetCoachingProgramSurveys(currentUser)
                .Where(i => i.CoachingProgram.Id == programId)
                .Select(i => i.Survey)
                .Distinct();
        }

        [ResponseType(typeof(GetSurveysForAdminResponse))]
        [Route("ForAdmin")]
        public IHttpActionResult GetSurveysForAdmin(int pageNumber = 1, int pageSize = 25, String sort = "CreatedAt desc")
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var surveys = (IQueryable<Survey>)AppDb.Survey;
            if (String.IsNullOrEmpty(sort) || sort == "null")
            {
                surveys = surveys.OrderBy(i => i.CreatedAt);
            }
            else
            {
                if (sort.EndsWith(","))
                {
                    sort = sort.TrimEnd(',');
                }
                surveys = surveys.OrderBy(sort);
            }
            var count = surveys.Count();
            surveys = surveys
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);
            return Ok(new GetSurveysForAdminResponse
            {
                TotalItems = count,
                Items = surveys.ToList(),
            });
        }

        public class GetSurveysForAdminResponse
        {
            public int TotalItems { get; set; }
            public List<Survey> Items { get; set; }
        }

    }
}