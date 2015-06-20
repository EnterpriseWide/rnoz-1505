using ewide.web.Models;
using ewide.web.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web;

namespace ewide.web.MediaTypeFormatters
{
    public class LearningPlanPDFMediaTypeFormatter : BufferedMediaTypeFormatter
    {
        private static readonly Type SupportedType = typeof(LearningPlanDTO);

        public LearningPlanPDFMediaTypeFormatter()
        {
            SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/pdf"));
            MediaTypeMappings.Add(new UriPathExtensionMapping("pdf", "application/pdf"));
        }

        public override void WriteToStream(Type type, object value, Stream writeStream, System.Net.Http.HttpContent content)
        {
            using (var writer = new StreamWriter(writeStream))
            {
                var lp = value as LearningPlanDTO;
                if (lp == null)
                {
                    throw new InvalidOperationException("Cannot serialize type");
                }
                var converter = new SelectPdf.HtmlToPdf();
                var html = ViewRenderer.RenderView("~/Views/LearningPlanPDF.cshtml", lp);
                var doc = converter.ConvertHtmlString(html);
                doc.Save(writeStream);
            }
        }

        public override bool CanReadType(Type type)
        {
            return false;
        }

        public override bool CanWriteType(Type type)
        {
            return type == typeof(LearningPlanDTO);
        }
    }
}