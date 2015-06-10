namespace Weemo.Api
{
    using System.Security.Cryptography.X509Certificates;

    /// <summary>
    /// Weemo Configuration. The CertificateValidator and Web Clients depend on this configuration.
    /// </summary>
    public interface IWeemoConfig
    {   
        /// <summary>
        /// Weemo's oAuth url
        /// (i.e. "https://oauths.weemo.com/auth/")
        /// </summary>
        string AuthUrl { get; set; }

        /// <summary>
        /// Created from the "weemo-ca.pem" file given to you by Weemo
        /// </summary>
        X509Certificate2 ClientRootCertAuthority { get; set; }

        /// <summary>
        /// Created from the "client.p12" file given to you by Weemo
        /// </summary>
        X509Certificate2 ClientCert { get; set; }

        /// <summary>
        /// The unique "Client_id" given to you by Weemo
        /// </summary>
        string ClientId { get; set; }

        /// <summary>
        /// The unique "Client_secret" given to you by Weemo
        /// </summary>
        string ClientSecret { get; set; }

        /// <summary>
        /// Encodes the values of this object in a query string that can be appended to an Authentication Request to Weemo
        /// </summary>
        string QueryString { get; }

        /// <summary>
        /// If the root certificate authority (the "weemo-ca.pem" file given to you by Weemo)
        /// is installed in the servers trusted storage or is implicitly trusted, set this to 
        /// true (recommended). Otherwise, set it to false, and the CertificateValidator will 
        /// perform a more relaxed validation of the response.
        /// </summary>
        /// <remarks>
        /// See Step 3 in http://msdn.microsoft.com/en-us/library/ff650751.aspx
        /// to learn how to install a cert in the server's trusted storage
        /// </remarks>
        bool ClientRootCertAuthorityIsInstalledOnServer { get; set; }

        /// <summary>
        /// Reads the the "weemo-ca.pem" file given to you by Weemo into an X509Certificate2
        /// </summary>
        /// <param name="privateCaPath">the filesystem path to the cert file</param>
        /// <returns>this IWeemoConfig for chainability</returns>
        IWeemoConfig SetClientRootCertAuthorityFromPath(string privateCaPath);

        /// <summary>
        /// Reads the "client.p12" file give to you by Weemo into an X509Certificate2
        /// </summary>
        /// <param name="clientCertPath">the filesystem path to the cert file</param>
        /// <param name="clientCertPrivateKey">the p12 "passphrase" given to you by Weemo</param>
        /// <returns>this IWeemoConfig for chainability</returns>
        IWeemoConfig SetClientCertFromPath(string clientCertPath, string clientCertPrivateKey);
    }
}
