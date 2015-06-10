namespace Weemo.Api
{
    using System.Threading.Tasks;

    /// <summary>
    /// Weemo Auth Client with Asynchronous methods
    /// </summary>
    public interface IWeemoAsyncClient
    {
        /// <summary>
        /// Get the authorization token from Weemo
        /// </summary>
        /// <param name="callerUid">The uid of the person making the call</param>
        /// <param name="tenantDomain">The domain of the tenant</param>
        /// <param name="licenseType">The license type for the token (i.e. standard or premium)</param>
        /// <returns>An AuthResponse with an authorization token</returns>
        Task<AuthResponse> GetAuthTokenAsync(AuthRequest request);
    }
}
