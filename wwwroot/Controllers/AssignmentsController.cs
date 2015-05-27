using AutoMapper;
using ewide.web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Description;

namespace ewide.web.Controllers
{
    [Authorize]
    public class AssignmentsController : BaseApiController
    {
        private IQueryable<Assignment> GetAssignments(ApplicationUser currentUser)
        {
            var assignments = AppDb.Assignment
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id);
            return assignments;
        }

        private IQueryable<CoachingProgram> GetCoachingPrograms(ApplicationUser currentUser)
        {
            var programs = AppDb.CoachingPrograms
                .Include(i => i.Coach)
                .Include(i => i.Coachee)
                .Where(i =>
                    i.Coach.Id == currentUser.Id ||
                    i.Coachee.Id == currentUser.Id);
            return programs;
        }

        // GET: api/Assignments
        public IQueryable<Assignment> GetAssignments(int programId)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            return GetAssignments(currentUser)
                .Where(i => i.CoachingProgram.Id == programId);
        }

        // GET: api/Assignments/5
        [ResponseType(typeof(Assignment))]
        public IHttpActionResult GetAssignment(int id)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var assignment = GetAssignments(currentUser)
                .SingleOrDefault(i => i.Id == id);
            if (assignment == null)
            {
                return NotFound();
            }
            return Ok(assignment);
        }

        //[Route("DownloadPDF")]
        //public HttpResponseMessage GetAssignmentAsPDF(int id)
        //{
        //    var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
        //    var assignment = GetAssignments(currentUser)
        //        .SingleOrDefault(i => i.Id == id);
        //    Request.Headers.Accept.Clear();
        //    Request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/pdf"));
        //    return Request.CreateResponse(HttpStatusCode.OK, assignment);
        //}

        //// PUT: api/Assignments/5
        //[ResponseType(typeof(void))]
        //[Authorize(Roles = "Coach")]
        //public IHttpActionResult PutAssignment(int id, Assignment assignment)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    if (id != assignment.Id)
        //    {
        //        return BadRequest();
        //    }
        //    AppDb.Entry(assignment).State = EntityState.Modified;
        //    try
        //    {
        //        AppDb.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AssignmentExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }
        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        // POST: api/Assignments
        [ResponseType(typeof(Assignment))]
        [Authorize(Roles = "Coach")]
        public IHttpActionResult PostAssignment(AssignmentDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var coachingProgram = GetCoachingPrograms(currentUser)
                .SingleOrDefault(i => i.Id == dto.CoachingProgramId);
            if (coachingProgram == null)
            {
                ModelState.AddModelError("CoachingProgramId", "Coaching Program Is Required");
                return BadRequest(ModelState);
            }

            var assignment = dto.CreateAssignment(coachingProgram);
            AppDb.Assignment.Add(assignment);
            AppDb.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = assignment.Id }, assignment);
        }

        //// DELETE: api/Assignments/5
        //[ResponseType(typeof(Assignment))]
        //[Authorize(Roles = "Coach")]
        //public IHttpActionResult DeleteAssignment(int id)
        //{
        //    Assignment assignment = AppDb.Assignment.Find(id);
        //    if (assignment == null)
        //    {
        //        return NotFound();
        //    }
        //    AppDb.Assignment.Remove(assignment);
        //    AppDb.SaveChanges();
        //    return Ok(assignment);
        //}

        //private bool AssignmentExists(int id)
        //{
        //    return AppDb.Assignment.Count(e => e.Id == id) > 0;
        //}
    }
}