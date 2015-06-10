namespace Weemo.Api
{
    using System;
    using System.Net;

    public class AuthRequest
    {
        private const string bodyFormat = "uid={0}&identifier_client={1}&id_profile={2}";

        /// <summary>
        /// A unique identifier for the user who is being authenticated
        /// </summary>
        public string Uid { get; set; }

        public string EncodedUid 
        { 
            get 
            {
                if (string.IsNullOrWhiteSpace(this.Uid))
                    throw new Exception("The AuthRequest Uid must be set before encoding it");
                return WebUtility.UrlEncode(this.Uid); 
            } 
        }

        /// <summary>
        /// The domain that the user belongs to
        /// </summary>
        public string Domain { get; set; }

        public string EncodedDomain
        {
            get
            {
                if (string.IsNullOrWhiteSpace(this.Domain))
                    throw new Exception("The AuthRequest Domain must be set before encoding it");
                return WebUtility.UrlEncode(this.Domain);
            }
        }

        /// <summary>
        /// The license type that should be used for authentication (i.e. standard or premium)
        /// </summary>
        public WeemoLicenseTypes LicenseType { get; set; }

        public string EncodedLicenseType
        {
            get
            {
                return WebUtility.UrlEncode(this.LicenseType.ToString());
            }
        }

        /// <summary>
        /// Encodes the values of this object in a query string that can be appended to an Authentication Request to Weemo
        /// </summary>
        public string QueryString 
        { 
            get 
            {
                return string.Format(bodyFormat, this.EncodedUid, this.EncodedDomain, this.EncodedLicenseType);
            } 
        }
    }
}
