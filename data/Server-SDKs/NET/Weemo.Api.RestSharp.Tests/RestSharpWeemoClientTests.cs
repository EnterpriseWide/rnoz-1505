using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.IO;
using System.Reflection;

namespace Weemo.Api.RestSharp.Tests
{
    [TestClass]
    public class RestSharpWeemoClientTests
    {
        [TestMethod]
        public void WeemoApi_RestSharpWeemoClient_GetAuthTokenAsync_should_return_AuthResponse_with_token()
        {
            // given
            var baseDir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var pathToPrivateCA = Path.Combine(baseDir, "Certs", "weemo-ca.pem").ToString();
            var pathToClientCert = Path.Combine(baseDir, "Certs", "client.p12").ToString();

            var config = new WeemoConfig(new CertLoader())
                {
                    AuthUrl = "https://oauths.weemo.com/auth/",
                    ClientId = "CLIENT_ID_GOES_HERE",
                    ClientSecret = "CLIENT_SECRET_GOES_HERE",
                    ClientRootCertAuthorityIsInstalledOnServer = false
                }
                .SetClientRootCertAuthorityFromPath(pathToPrivateCA)
                .SetClientCertFromPath(pathToClientCert, "CERT_SECRET_GOES_HERE");

            var validator = new CertificateValidator(config);
            var client = new RestSharpWeemoClient(config, validator);
            var request = new AuthRequest
            {
                Uid = "UNIQUE_USER_ID_GOES_HERE",
                Domain = "your-domain.com",
                LicenseType = WeemoLicenseTypes.premium
            };

            // when
            var token = client.GetAuthTokenAsync(request).Result;

            // then
            Assert.IsNotNull(token);
            Assert.IsNotNull(token.Token);
            Assert.IsFalse(token.Token.Contains("error"));
            Assert.IsFalse(String.IsNullOrWhiteSpace(token.Token));
        }
    }
}
