namespace Weemo.Api
{
    using System;
    using System.Security.Cryptography.X509Certificates;

    /// <summary>
    /// Loads Certificate files into X509Certificate2 objects
    /// </summary>
    public interface ICertLoader
    {
        /// <summary>
        /// Loads an X509Certificate2 from a file path
        /// </summary>
        /// <param name="path">The path to the certificate file</param>
        /// <returns>The X509Certificate2</returns>
        X509Certificate2 LoadCert(string path);

        /// <summary>
        /// Loads an X509Certificate2 from a file path, using the given password. Also 
        /// defaults the Storage Flags to X509KeyStorageFlags.MachineKeySet.
        /// </summary>
        /// <param name="path">The path to the certificate file</param>
        /// <param name="password">A passphrase for the certificate file</param>
        /// <returns>The X509Certificate2</returns>
        X509Certificate2 LoadCert(string path, string password);
    }
}
