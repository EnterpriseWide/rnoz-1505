# Developing on Mavericks

With OSX 10.9 (Mavericks), Apple switched the built-in curl and libcurl from using OpenSSL to using their own Secure Transport engine.  What this means for a developer is that certificates and keys are integrated into the system keychcain.  A good description of the change is here:

http://curl.haxx.se/mail/archive-2013-10/0036.html

In Mavericks, the default curl and libcurl do not read certificate authority files (it reads from the system keychain) and client certificates are not supported.  Weemo's authentication client relies on verifying the identity of your server through the use of client certificates.  If you are interested in developing on Mavericks, it is possible but will require installing and building your own versions of OpenSSL and libcurl.  You may choose to use macports or fink, or you can build these tools from sources.

## Building from Sources

A very good blog entry describing how to set up OSX 10.9 for web development is here:

http://mac-dev-env.patrickbougie.com/

It includes a detailed description of how to build OpenSSL as well as its dependencies.  For Weemo's Ruby and PHP clients, you will also need to build a local version of libcurl.

If you are building PHP, you will need to export a shared library from openssl.  Patrick's instructions do not show this.  Add the "shared" option to the configure command.

```sh
./configure darwin64-x86_64-cc shared --prefix=/usr/local/openssl-1.0.1g
make
make install
```

Be sure to follow the rest of his instructions regarding openssl, *especially* the installation of the Keychain certificates into your local installation.

Following Patrick's style, we recommend building from the git source using the following procedure.

```sh
cd /usr/local/src
git clone git://github.com/bagder/curl.git
./buildconf
./configure --prefix=/usr/local/curl
make
make install

# (Execute the following lines to update your Bash startup script.)
echo 'export PATH=/usr/local/curl/bin:$PATH' >> ~/.bash_profile
# (Load the new shell configurations.)
source ~/.bash_profile
```
