namespace Weemo.Api
{
    /// <summary>
    /// Weemo Auth Client with Synchronous and Asynchronous methods
    /// </summary>
    public interface IWeemoClient : IWeemoAsyncClient, IWeemoSyncClient
    {
        // this just combines the Async and Sync interfaces, so no members are expected here
    }
}
