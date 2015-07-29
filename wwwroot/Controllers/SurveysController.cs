using ewide.web.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Dynamic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize]
    [RoutePrefix("api/surveys")]
    public class SurveysController : BaseApiController
    {

        // GET: api/Surveys
        [Authorize(Roles = "Admin")]
        public IQueryable<Survey> GetSurvey()
        {
            return AppDb.Survey;
        }

        // GET: api/Surveys/5
        [ResponseType(typeof(Survey))]
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> GetSurvey(int id)
        {
            Survey survey = await AppDb.Survey.FindAsync(id);
            if (survey == null)
            {
                return NotFound();
            }
            var response = new GetSurveyResponse
            {
                Item = survey
            };
            response.UsageCount = AppDb.CoachingProgramSurvey
                .Count(i => i.SurveyId == survey.Id);
            return Ok(response);
        }

        // PUT: api/Surveys/5
        [ResponseType(typeof(void))]
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> PutSurvey(int id, Survey survey)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != survey.Id)
            {
                return BadRequest();
            }

            AppDb.Entry(survey).State = EntityState.Modified;

            try
            {
                await AppDb.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SurveyExists(id))
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

        // POST: api/Surveys
        [ResponseType(typeof(Survey))]
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> PostSurvey(Survey survey)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppDb.Survey.Add(survey);
            await AppDb.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = survey.Id }, survey);
        }

        // DELETE: api/Surveys/5
        [ResponseType(typeof(Survey))]
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> DeleteSurvey(int id)
        {
            Survey survey = await AppDb.Survey.FindAsync(id);
            if (survey == null)
            {
                return NotFound();
            }

            AppDb.Survey.Remove(survey);
            await AppDb.SaveChangesAsync();

            return Ok(survey);
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
        [Authorize(Roles = "Admin")]
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

        private bool SurveyExists(int id)
        {
            return AppDb.Survey.Count(e => e.Id == id) > 0;
        }

        private IQueryable<CoachingProgramSurvey> GetCoachingProgramSurveys(ApplicationUser currentUser)
        {
            var isAdmin = AppUserManager.IsInRole(currentUser.Id, "Admin");
            var surveys = AppDb.CoachingProgramSurvey
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id ||
                    isAdmin);
            return surveys;
        }

        public class GetSurveyResponse
        {
            public int UsageCount { get; set; }
            public Survey Item { get; set; }
        }

        public class GetSurveysForAdminResponse
        {
            public int TotalItems { get; set; }
            public List<Survey> Items { get; set; }
        }

    }
}