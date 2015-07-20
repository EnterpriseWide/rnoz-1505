using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace ewide.web.Models
{
    public class CoachingProgram
    {
        public int Id { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public DateTime UpdatedAt { get; set; }
        [Required]
        public String CoachId { get; set; }
        public virtual ApplicationUser Coach { get; set; }
        [Required]
        public String CoacheeId { get; set; }
        public virtual ApplicationUser Coachee { get; set; }
        public String LearningPlan { get; set; }
        public bool IsClosed { get; set; }
        public Decimal InvoiceAmount { get; set; }
        public virtual List<Int32> SurveyIds { get; set; }

        public ICollection<CoachingSession> CoachingSessions { get; set; }
        public ICollection<CoachingProgramSurvey> CoachingProgramSurveys { get; set; }
        public ICollection<ProgramMedia> ProgramMedias { get; set; }
        public ICollection<Assignment> Assignments { get; set; }

        public string GetRootFolder()
        {
            var path = String.Format("{0}/{1}/",
                HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["Program Media Folder"]),
                this.Id
                );
            Directory.CreateDirectory(path);
            return path;
        }

    }
}