using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ewide.web.Models
{
    public class AssignmentDTO
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }
        public String BodyText { get; set; }
        public int CoachingProgramId { get; set; }

        public Assignment CreateAssignment(CoachingProgram coachingProgram)
        {
            return new Assignment
            {
                BodyText = BodyText,
                CoachingProgramId = coachingProgram.Id,
                CreatedAt = DateTime.Now,
                Description = Description,
                Id = Id,
                Name = Name,
                UpdatedAt = DateTime.Now,
            };
        }
    }
}