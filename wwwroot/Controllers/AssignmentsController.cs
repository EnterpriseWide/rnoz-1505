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
    public class AssignmentsController : BaseApiController
    {
        private IQueryable<Assignment> GetAssignments(ApplicationUser currentUser)
        {
            var isAdmin = AppUserManager.IsInRole(currentUser.Id, "Admin");
            var assignments = AppDb.Assignment
                .Where(i =>
                    i.CoachingProgram.Coach.Id == currentUser.Id ||
                    i.CoachingProgram.Coachee.Id == currentUser.Id ||
                    isAdmin);
            return assignments;
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

        // PUT: api/Assignments/5
        [ResponseType(typeof(void))]
        [Authorize(Roles = "Coach")]
        public IHttpActionResult PutAssignment(int id, Assignment item)
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
            var assignment = GetAssignments(currentUser)
                .SingleOrDefault(i => i.Id == item.Id);
            if (id != item.Id)
            {
                return BadRequest("Assignment Not Found");
            }

            AppDb.Entry(assignment).State = EntityState.Modified;

            assignment.Name = item.Name;
            assignment.Description = item.Description;
            assignment.BodyText = item.BodyText;
            assignment.UpdatedAt = DateTime.Now;

            try
            {
                AppDb.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignmentExists(id, currentUser))
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

        // DELETE: api/Assignments/5
        [ResponseType(typeof(Assignment))]
        [Authorize(Roles = "Coach")]
        public IHttpActionResult DeleteAssignment(int id)
        {
            var currentUser = AppUserManager.FindById(User.Identity.GetUserId());
            var assignment = GetAssignments(currentUser)
                .SingleOrDefault(i => i.Id == id);
            if (assignment == null)
            {
                return NotFound();
            }
            AppDb.Assignment.Remove(assignment);
            AppDb.SaveChanges();
            return Ok(assignment);
        }

        private bool AssignmentExists(int id, ApplicationUser currentUser)
        {
            return GetAssignments(currentUser).Count(e => e.Id == id) > 0;
        }
    }
}