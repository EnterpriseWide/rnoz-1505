using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ewide.web.Models
{
    public class CoachingProgramSurvey
    {
        public int Id { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public DateTime UpdatedAt { get; set; }
        [Required]
        public int CoachingProgramId { get; set; }
        public virtual CoachingProgram CoachingProgram { get; set; }
        [Required]
        public int SurveyId { get; set; }
        public virtual Survey Survey { get; set; }
    }
}