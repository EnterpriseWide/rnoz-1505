using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ewide.web.Models
{
    public class CoachingSession
    {
        public int Id { get; private set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public DateTime UpdatedAt { get; set; }
        [Required]
        public virtual CoachingProgram CoachingProgram { get; set; }
        [Required]
        public DateTime StartedAt { get; set; }
        [Required]
        public int Duration { get; set; }
        public bool IsCoachApproved { get; set; }
        public bool IsCoacheeApproved { get; set; }
    }
}