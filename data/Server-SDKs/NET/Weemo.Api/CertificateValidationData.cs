namespace Weemo.Api
{
    using System.Net.Security;
    using System.Security.Cryptography.X509Certificates;

    public class CertificateValidationData
    {
        public object Sender { get; set; }
        public X509Certificate CertificateToValdate { get; set; }
        public X509Chain Chain { get; set; }
        public SslPolicyErrors PolicyErrors { get; set; }
    }
}
