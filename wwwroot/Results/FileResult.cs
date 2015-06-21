﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace ewide.web.Results
{
    public class FileResult : IHttpActionResult
    {
        private readonly string _filePath;
        private readonly string _fileName;
        private readonly string _contentType;

        public FileResult(string filePath, string contentType = null)
        {
            if (filePath == null) throw new ArgumentNullException("filePath");

            _filePath = filePath;
            _fileName = filePath;
            _contentType = contentType;
        }

        public FileResult(string filePath, string fileName, string contentType = null)
        {
            if (filePath == null) throw new ArgumentNullException("filePath");

            _filePath = filePath;
            _fileName = fileName;
            _contentType = contentType;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.Run(() =>
            {
                var response = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StreamContent(File.OpenRead(_filePath))
                };

                var contentType = _contentType ?? MimeMapping.GetMimeMapping(Path.GetExtension(_fileName));
                response.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);

                return response;

            }, cancellationToken);
        }
    }
}
