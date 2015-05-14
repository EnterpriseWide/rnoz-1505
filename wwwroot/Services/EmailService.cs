using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;

namespace ewide.web.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            var myMessage = new MailMessage();
            myMessage.To.Add(message.Destination);
            myMessage.Subject = message.Subject;
            myMessage.Body = message.Body;

            using (var smtp = new SmtpClient())
            {
                await smtp.SendMailAsync(myMessage);
            }
        }
    }
}
