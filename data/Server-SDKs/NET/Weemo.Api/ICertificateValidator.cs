namespace Weemo.Api
{
    using System.Net.Security;
    using System.Security.Cryptography.X509Certificates;

    /// <summary>
    /// Satisfies the System.Net.Security.RemoteCertificateValidationCallback signature 
    /// which is used to validate the certificates in Weemo Responses
    /// </summary>
    public interface ICertificateValidator
    {
        /// <summary>
        /// Validates whether certificate data being returned in a Response is valid
        /// </summary>
        /// <param name="privateCertAuthority">The known Private Cert Authority (i.e. from the "weemo-ca.pem" file given to you by Weemo)</param>
        /// <param name="toBeValidated">The certificated data from the response</param>
        /// <returns>true if the certificate data is valid, otherwise false</returns>
        bool ValidateRemoteCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors);
    }
}
