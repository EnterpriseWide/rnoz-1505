using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ewide.web.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public DateTime UpdatedAt { get; set; }
        [Required]
        public String Name { get; set; }
        public String Description { get; set; }
        public String BodyText { get; set; }
        [Required]
        public int CoachingProgramId { get; set; }
        public virtual CoachingProgram CoachingProgram { get; set; }
    }
}