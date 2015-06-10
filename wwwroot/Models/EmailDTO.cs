using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ewide.web.Models
{
    public class EmailDTO
    {
        [Required]
        public int Id { get; set; }
        public String EmailBodyText { get; set; }
    }
}