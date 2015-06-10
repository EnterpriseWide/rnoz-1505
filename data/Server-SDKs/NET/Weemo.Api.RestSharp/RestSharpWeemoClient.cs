namespace Weemo.Api
{
    using Newtonsoft.Json;
    using RestSharp;
    using System;
    using System.Net;
    using System.Threading.Tasks;

    public class RestSharpWeemoClient : IWeemoAsyncClient
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="config">An IWeemoConfig implementation; the props should have valid values</param>
        /// <param name="certValidator">An ICertificateValidator implementation to use to validate the response certificate</param>
        public RestSharpWeemoClient(IWeemoConfig config, ICertificateValidator certValidator) 
        {
            this.config = config;
            this.certValidator = certValidator;
        }

        IWeemoConfig config;
        ICertificateValidator certValidator;

        public async Task<AuthResponse> GetAuthTokenAsync(AuthRequest request)
        {
            var _response = await GetAuthTokenIRestResponseAsync(request);

            return JsonConvert.DeserializeObject<AuthResponse>(_response.Content);
        }

        private async Task<IRestResponse> GetAuthTokenIRestResponseAsync(AuthRequest request) 
        {
            // create web request
            var endPointWithClientInfo = BuildFqdnEndpointWithClientInfo(config.QueryString);
            var restRequest = BuildWeemoPostRequest(endPointWithClientInfo, request);
            var client = new RestClient();
            client.ClientCertificates = new System.Security.Cryptography.X509Certificates.X509CertificateCollection();
            client.ClientCertificates.Add(config.ClientCert);
            return await client.ExecutePostTaskAsync(restRequest);
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
        /// Make the RestRequest object and set appropriate headers and params
        /// </summary>
        /// <param name="url">the url to be used for Authentication</param>
        /// <returns>A RestRequest object</returns>
        private RestRequest BuildWeemoPostRequest(string url, AuthRequest body)
        {
            var request = new RestRequest(url, Method.POST);
            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddParameter("uid", body.EncodedUid);
            request.AddParameter("identifier_client", body.EncodedDomain);
            request.AddParameter("id_profile", body.EncodedLicenseType);
            ServicePointManager.ServerCertificateValidationCallback = certValidator.ValidateRemoteCertificate;

            return request;
        }
    }
}
