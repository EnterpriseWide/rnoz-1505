namespace Weemo.Api
{
    using System;
    using System.IO;
    using System.Net;
    using System.Security.Cryptography.X509Certificates;

    public class WeemoConfig : IWeemoConfig
    {
        private const string clientInfoFormat = "?client_id={0}&client_secret={1}";

        public WeemoConfig(ICertLoader certificateLoader) 
        {
            this.certloader = certificateLoader;

            // by default the validation should be more secure, allowing 
            // relaxation to be explicitly requested
            this.ClientRootCertAuthorityIsInstalledOnServer = true;
        }

        private ICertLoader certloader;

        private string authUrl { get; set; }
        public string AuthUrl { get { return this.authUrl.TrimEnd('/') + '/'; } set { this.authUrl = value; } }
        public X509Certificate2 ClientRootCertAuthority { get; set; }
        public X509Certificate2 ClientCert { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public bool ClientRootCertAuthorityIsInstalledOnServer { get; set; }

        public string EncodedClientId
        {
            get
            {
                if (string.IsNullOrWhiteSpace(this.ClientId))
                    throw new Exception("The WeemoConfig ClientId must be set before encoding it");
                return WebUtility.UrlEncode(this.ClientId);
            }
        }

        public string EncodedClientSecret
        {
            get
            {
                if (string.IsNullOrWhiteSpace(this.ClientSecret))
                    throw new Exception("The WeemoConfig ClientSecret must be set before encoding it");
                return WebUtility.UrlEncode(this.ClientSecret);
            }
        }


        /// <summary>
        /// Encodes the values of this object in a query string that can be appended to an Authentication Request to Weemo
        /// </summary>
        public string QueryString
        {
            get
            {
                return string.Format(clientInfoFormat, this.EncodedClientId, this.EncodedClientSecret);
            }
        }

        public IWeemoConfig SetClientRootCertAuthorityFromPath(string privateCaPath)
        {
            ClientRootCertAuthority = this.certloader.LoadCert(privateCaPath);
            return this;
        }

        public IWeemoConfig SetClientCertFromPath(string clientCertPath, string clientCertPrivateKey)
        {
            ClientCert = this.certloader.LoadCert(clientCertPath, clientCertPrivateKey);
            return this;
        }
    }
}
