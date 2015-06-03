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
        public int Id { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public DateTime UpdatedAt { get; set; }
        [Required]
        public int CoachingProgramId { get; set; }
        public virtual CoachingProgram CoachingProgram { get; set; }
        [Required]
        public String Name { get; set; }
        public String FileName { get; set; }
        [Required]
        public MediaType MediaType { get; set; }
        public Int64 Size { get; set; }
    }
}