namespace Weemo.Api.HttpWebRequest
{
    using Newtonsoft.Json;
    using System;
    using System.IO;
    using System.Net;
    using System.Text;

    public class HttpWebRequestWeemoClient : IWeemoSyncClient
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="config">An IWeemoConfig implementation; the props should have valid values</param>
        /// <param name="certValidator">An ICertificateValidator implementation to use to validate the response certificate</param>
        public HttpWebRequestWeemoClient(IWeemoConfig config, ICertificateValidator certValidator) 
        {
            this.config = config;
            this.certValidator = certValidator;
        }

        IWeemoConfig config;
        ICertificateValidator certValidator;

        /// <summary>
        /// Get the authorization token from Weemo
        /// </summary>
        /// <param name="callerUid">The uid of the person making the call</param>
        /// <param name="tenantDomain">The domain of the tenant</param>
        /// <param name="licenseType">The license type for the token (i.e. standard or premium)</param>
        /// <returns>An AuthResponse with an authorization token</returns>
        public AuthResponse GetAuthToken(AuthRequest request)
        {
            // create web request
            var endPointWithClientInfo = BuildFqdnEndpointWithClientInfo(config.QueryString);
            var webRequest = BuildWeemoPostRequest(endPointWithClientInfo);

            // make web request
            using (var webResponse = ExecuteRequest(webRequest, request.QueryString)) 
            {
                // read web response stream
                var resultString = ReadStringFromResponseStream(webResponse);

                // parse and return the result
                return JsonConvert.DeserializeObject<AuthResponse>(resultString);
            }
        }

        /// <summary>
        /// Make the URL that will be used for Authentication
        /// </summary>
        /// <param name="requestQueryString">The AuthRequest serialized and encoded as a query string</param>
        /// <returns>the fully qualified endpoint with client info</returns>
        private string BuildFqdnEndpointWithClientInfo(string requestQueryString)
        {
            return String.Concat(this.config.AuthUrl, requestQueryString);
        }

        /// <summary>
        /// Make the WebRequest object and set appropriate headers
        /// </summary>
        /// <param name="url">the url to be used for Authentication</param>
        /// <returns>An HttpWebRequest object</returns>
        private HttpWebRequest BuildWeemoPostRequest(string url)
        {
            var request = WebRequest.CreateHttp(url);
            request.Method = WebRequestMethods.Http.Post;
            request.ContentType = "application/x-www-form-urlencoded";

            request.ClientCertificates.Add(this.config.ClientCert);
            request.ServerCertificateValidationCallback = certValidator.ValidateRemoteCertificate;

            return request;
        }

        /// <summary>
        /// Execute the Request to Weemo
        /// </summary>
        /// <param name="webRequest">The Request object to execute</param>
        /// <param name="postBody">The body content</param>
        /// <returns>A Disposable HttpWebResponse that needs to be validated, read and disposed.</returns>
        private HttpWebResponse ExecuteRequest(HttpWebRequest webRequest, string postBody)
        {
            // prepare body in byte array
            var bodyBytes = Encoding.ASCII.GetBytes(postBody);
            webRequest.ContentLength = bodyBytes.Length;

            // get request stream / posting to body
            // SSL authentication will occur at this point
            // Might throw http errors if there are any. Client app should handle them.
            using (var requestStream = webRequest.GetRequestStream())
            {
                requestStream.Write(bodyBytes, 0, bodyBytes.Length);
            }

            // throws http errors, should be handled manually in client app.
            return (HttpWebResponse)webRequest.GetResponse();
        }

        /// <summary>
        /// Reads a response stream to a string
        /// </summary>
        /// <param name="webResponse"></param>
        /// <returns></returns>
        private string ReadStringFromResponseStream(HttpWebResponse webResponse)
        {
            using (var responseStream = webResponse.GetResponseStream())
            {
                using (var responseStreamReader = new StreamReader(responseStream))
                {
                    return responseStreamReader.ReadToEnd();
                }
            }
        }
    }
}
