namespace Weemo.Api
{
    using System;
    using System.IO;
    using System.Security.Cryptography.X509Certificates;

    public class CertLoader : ICertLoader
    {
        public X509Certificate2 LoadCert(string path) 
        {
            return LoadCertHelper(path);
        }

        public X509Certificate2 LoadCert(string path, string password) 
        {
            return LoadCertHelper(path, password);
        }
        
        private X509Certificate2 LoadCertHelper(string path, string password = null)
        {
            if (!File.Exists(path))
                throw new ArgumentException("The certificate file " + path + " doesn't exist.");

            try
            {
                if (password == null)
                    return new X509Certificate2(path);
                return new X509Certificate2(path, password, X509KeyStorageFlags.MachineKeySet);
            }
            catch (Exception exception)
            {
                throw new ArgumentException("The certificate file " + path + " couldn't be loaded - " + exception.Message);
            }
        }
    }
}
