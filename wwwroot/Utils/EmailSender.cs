using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace ewide.web.Utils
{
    public class EmailSender
    {
        public static void SendEmail(string to, string subject, string body, Attachment attachment = null, string from = null, string from_name = null, bool isHtml = true)
        {
            var message = new MailMessage();
            if (!string.IsNullOrEmpty(from_name) && !string.IsNullOrEmpty(from))
            {
                message.From = new MailAddress(from, from_name);
            }
            else if (!string.IsNullOrEmpty(from))
            {
                message.From = new MailAddress(from);
            }
            message.To.Add(new MailAddress(to));
            message.Subject = subject;
            message.Body = body;
            message.IsBodyHtml = isHtml;
            if (attachment != null)
            {
                message.Attachments.Add(attachment);
            }
            var mailClient = new SmtpClient();
            mailClient.Send(message);
        }
    }
}