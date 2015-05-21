using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ewide.web.Models
{
    public class LearningPlanDTO
    {
        [Required]
        public int Id { get; set; }
        public DateTime UpdatedAt { get; set; }
        public String LearningPlan { get; set; }
        public CoachingProgram GetCoachingProgram()
        {
            return new CoachingProgram
            {
                Id = this.Id,
                UpdatedAt = DateTime.Now,
                LearningPlan = this.LearningPlan,
            };
        }
    }
}