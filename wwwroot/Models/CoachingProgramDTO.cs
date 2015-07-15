using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ewide.web.Models
{
    public class CoachingProgramDTO
    {
        public int Id { get; set; }
        [Required]
        public virtual ApplicationUser Coach { get; set; }
        [Required]
        public virtual ApplicationUser Coachee { get; set; }
        public List<int> SurveyIds { get; set; }
    }
}