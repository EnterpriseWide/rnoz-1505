# rnoz-1505
rightNow Client
open a command prompt in /data/rightNow

server installation:
add rightnow.oztrain.local to 127.0.0.1 to hostnames
add iis website and point webroot to /wwwroot
add rightnow.oztrain.local as a binding
create empty database and update /wwwroot/web.config/configuration/connectionstrings to point to the new db
update apiurl /data/rightnow/src/client/app/core/dataservice.js on line to point to http://rightnow.oztrain.local

client installation:
npm install

development: this serves an unoptimised stand alone client
gulp serve-dev

deployment: this optimises code into /data/rightNow/build/ directory and then copies to /wwwroot/ directory
gulp deploy

references
1. client side framework:
https://github.com/johnpapa/generator-hottowel
2. combining membership system with data model on backend
http://blogs.msdn.com/b/webdev/archive/2013/10/20/building-a-simple-todo-application-with-asp-net-identity-and-associating-users-with-todoes.aspx
3. membership system on backend
http://bitoftech.net/2015/01/21/asp-net-identity-2-with-asp-net-web-api-2-accounts-management/
4. CORS Integration based on
http://blog.rfaisal.com/2014/01/14/building-your-own-api-and-securing-it-with-oauth-2-0-in-asp-net-webapi-2/

MSSQL Information
Open Visual Studio Package Management Console

To run a db migration locally
update-database

To create a new db migration
add-migration '{description of migration goes here}'
