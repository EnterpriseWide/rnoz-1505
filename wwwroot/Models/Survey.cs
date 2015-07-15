using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ewide.web.Models
{
    public class Survey
    {
        public int Id { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public DateTime UpdatedAt { get; set; }
        [Required]
        public String Name { get; set; }
        [Required]
        public String Link { get; set; }
        public ICollection<CoachingProgramSurvey> CoachingProgramSurveys { get; set; }
    }
}