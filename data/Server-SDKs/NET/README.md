# .NET Client for Weemo

The .NET client for Weemo is a library that can be used on your server to communicate with Weemo back-end services.  Its primary purpose is to enable your server as an authentication provider for Weemo video calls.

Requirements:

- .NET 4.5 or later

You must obtain Authentication Provider credentials from Weemo.


## Installing the Client

Get a copy of the dll files from the Release page and reference these dll files in your project

##Using the Client with an Inversion of Control Container

The Weemo .NET SDK is written to support multiple implementations, so you can choose the one that best suits your needs. Your project will need to reference the appropriate dependencies for the Weemo Client implementations to work. 

#### The RestSharp client depends on 

- Newtonsoft JSON.NET
- RestSharp

#### The HttpWebRequest client depends on 

- Newtonsoft JSON.NET


If you're already using an Inversion of Control container, our first example is for you.  It is based on a Nancy project using TinyIoC. If you're not using IoC, we'll also show you how to use it using a client factory.

In this Nancy example, we override the Bootstrapper's ConfigureApplicationContainer method

```
private IWeemoConfig GetWeemoConfig() 
{
    // TODO: Get the WeemoConfig from Settings
    var _appData = RootPathProvider.GetRootPath() + "App_Data\\";

    var _weemoConfig = new WeemoConfig(new CertLoader()) {
        AuthUrl = "https://oauths.weemo.com/auth/",
        ClientId = "YOUR_CLIENT_ID_HERE",
        ClientSecret = "YOUR_CLIENT_SECRET_HERE",
        ClientRootCertAuthorityIsInstalledOnServer = true // or false if you are not installing the root cert on your server
    }
    .SetClientRootCertAuthorityFromPath(_appData + "weemo-ca.pem")
    .SetClientCertFromPath(_appData + "client.p12", "PASSWORD_THAT_UNLOCKS_THE_.p12_FILE");

    return _weemoConfig;
}
        
protected override void ConfigureApplicationContainer(TinyIoCContainer container)
{
    // The WeemoConfig
    container.Register<IWeemoConfig>(GetWeemoConfig());

    // The WeemoClient
    container.Register<IWeemoAsyncClient, RestSharpWeemoClient>().AsMultiInstance();

    // The Weemo Cert Validator
    container.Register<ICertificateValidator, CertificateValidator>().AsMultiInstance();
}
```

People choose different places in .NET MVC projects, to be their composition root, so MVC instructions are a bit subjective. The instructions are the same as for Nancy, you just need to move the registration to the location that is appropriate for the Inversion of Control container you are using.

If you aren't using IoC, then the following example is for you:

```
public class WeemoClientFactory 
{
    /// <summary>
    /// Get Weemo Client configuration
    /// </summary>
    public IWeemoConfig GetWeemoConfig() 
    {
        // TODO: Get the WeemoConfig from Settings
        var _appData = RootPathProvider.GetRootPath() + "App_Data\\";

        var _weemoConfig = new WeemoConfig(new CertLoader()) {
            AuthUrl = "https://oauths.weemo.com/auth/",
            ClientId = "YOUR_CLIENT_ID_HERE",
            ClientSecret = "YOUR_CLIENT_SECRET_HERE",
            ClientRootCertAuthorityIsInstalledOnServer = true // or false if you are not installing the root cert on your server
        }
        .SetClientRootCertAuthorityFromPath(_appData + "weemo-ca.pem")
        .SetClientCertFromPath(_appData + "client.p12", "PASSWORD_THAT_UNLOCKS_THE_.p12_FILE");

        return _weemoConfig;
    }

    /// <summary>
    /// If you want to get an async RestSharp client, your method might look like this
    /// (you don't need both the RestSharp and HttpWebRequest clients - pick 1)
    /// </summary>
    public IWeemoAsyncClient CreateAsyncClient(IWeemoConfig config) 
    {
        var validator = new CertificateValidator(config);
        return new RestSharpWeemoClient(config, validator);    
    }

    /// <summary>
    /// Or if you prefer a synchronous HttpWebRequest client, your method might look like this
    /// (you don't need both the RestSharp and HttpWebRequest clients - pick 1)
    /// </summary>
    public IWeemoSyncClient CreateSyncClient(IWeemoConfig config) 
    {
        var validator = new CertificateValidator(config);
        return new HttpWebRequestWeemoClient(config, validator);    
    }
}

```
