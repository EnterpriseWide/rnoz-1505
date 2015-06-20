using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ewide.web.Models
{
    public enum MediaType
    {
        Resource,
        Upload,
    }
    public class ProgramMedia
    {
        public Int64 Id { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public DateTime UpdatedAt { get; set; }
        [Required]
        public Int32 CoachingProgramId { get; set; }
        public virtual CoachingProgram CoachingProgram { get; set; }
        [Required]
        public String Name { get; set; }
        public String FileName { get; set; }
        public String OriginalFileName { get; set; }
        public String BodyText { get; set; }
        [Required]
        public MediaType MediaType { get; set; }
        public String Link { get; set; }
    }
}