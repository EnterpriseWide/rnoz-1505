namespace Weemo.Api
{
    using System;
    using System.Net.Security;
    using System.Security.Cryptography.X509Certificates;

    public class CertificateValidator : ICertificateValidator
    {
        public CertificateValidator(IWeemoConfig config)
        {
            this.config = config;
        }

        IWeemoConfig config;

        public bool ValidateRemoteCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            if (this.config.ClientRootCertAuthority == null)
                throw new Exception("You must set the root cert authority, in the WeemoConfig, before executing ValidateRemoteCertificate.");

            // If the certificate is a valid, signed certificate, return true.
            if (sslPolicyErrors == SslPolicyErrors.None)
                return true;

            // If there are errors in the certificate chain, look at each error to determine the cause.
            if ((sslPolicyErrors & SslPolicyErrors.RemoteCertificateChainErrors) != 0)
            {
                if (chain != null)
                    return ValidateChain(chain);
                else // If there is no chain, there's no error.
                    return true;
            }
            else // In all other cases, return false.
            {
                return false;
            }
        } // / ValidateRemoteCertificate

        /// <summary>
        ///
        /// </summary>
        /// <param name="privateCertAuthority"></param>
        /// <param name="toBeValidated"></param>
        /// <returns></returns>
        private bool ValidateChain(X509Chain chain) 
        {
            // manually verify Untrusted Root
            bool isChainValid = true;

            foreach (var status in chain.ChainStatus)
            {
                switch (status.Status)
                {
                    case X509ChainStatusFlags.NoError:
                        isChainValid &= true;
                        break;
                    case X509ChainStatusFlags.UntrustedRoot:
                        isChainValid &= ValidateChainRootIsSameAsPrivateCA(chain);
                        break;
                    default:
                        // The Weemo private CA root certificate contains an invalid signature 
                        // and in turn throws an unknown error. If the root cert is installed 
                        // on this server, then the chain is invalid, otherwise we don't 
                        // have enough information to consider it valid or invalid
                        if (config.ClientRootCertAuthorityIsInstalledOnServer)
                            isChainValid &= false;
                        break;
                }
            }

            return isChainValid;
        } // /ValidateChain

        /// <summary>
        /// Untrusted Root error can happen if the private CA root is not installed 
        /// in the computer's trusted CA storage. Manual check must be done to see 
        /// if the root in the chain is the same as the private CA provided
        /// </summary>
        /// <param name="chain"></param>
        /// <returns></returns>
        public bool ValidateChainRootIsSameAsPrivateCA(X509Chain chain)
        {
            bool isRootTrusted = false;
            for (int i = 0; i < chain.ChainElements.Count; i++)
            {
                // root certificates will have subject == issuer
                if (chain.ChainElements[i].Certificate.Issuer == chain.ChainElements[i].Certificate.Subject)
                {
                    // check thumbprint
                    if (config.ClientRootCertAuthority.Thumbprint == chain.ChainElements[i].Certificate.Thumbprint)
                    {
                        // found the last cert as our private CA
                        isRootTrusted = true;
                    }

                    break;
                }
            }

            return isRootTrusted;
        }
    }
}
