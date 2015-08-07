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
        public int CoachingProgramId { get; set; }
        public virtual CoachingProgram CoachingProgram { get; set; }
        [Required]
        public DateTime StartedAt { get; set; }
        [Required]
        public DateTime FinishedAt { get; set; }
        [Required]
        public int RoomId { get; set; }
        public virtual Room Room { get; set; }
        public bool IsClosed { get; set; }
    }
}