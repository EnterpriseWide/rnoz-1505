/**
 * rightNow - rightNow Project Generated from HotTowel Angular
 * @authors 
 * @version v0.0.0
 * @link 
 * @license 
 */
!function(){"use strict";angular.module("app",["app.core","app.widgets","app.admin","app.dashboard","app.layout","app.program","app.login"])}(),function(){"use strict";angular.module("app.admin",["app.core","app.widgets"])}(),function(){"use strict";angular.module("blocks.exception",["blocks.logger"])}(),function(){"use strict";angular.module("blocks.logger",[])}(),function(){"use strict";angular.module("blocks.router",["ui.router","blocks.logger"])}(),function(){"use strict";angular.module("app.core",["ngAnimate","ngSanitize","blocks.exception","blocks.logger","blocks.router","ui.router","ngplus","LocalStorageModule"])}(),function(){"use strict";angular.module("app.dashboard",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.layout",["app.core"])}(),function(){"use strict";angular.module("app.login",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.program",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.widgets",[])}(),function(){"use strict";function t(t,e){function a(){e.fillData(),t.info("Activated Admin View")}var n=this;n.title="Admin",n.authData=e.authData,a()}angular.module("app.admin").controller("AdminController",t),t.$inject=["logger","authservice"]}(),function(){"use strict";function t(t,a){t.configureStates(e(a.authData))}function e(t){return[{state:"admin",config:{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminController",controllerAs:"vm",title:"Admin",settings:{nav:2,content:'<i class="fa fa-lock"></i> Admin'}}}]}angular.module("app.admin").run(t),t.$inject=["routerHelper","authservice"]}(),function(){"use strict";function t(){this.config={appErrorPrefix:void 0},this.configure=function(t){this.config.appErrorPrefix=t},this.$get=function(){return{config:this.config}}}function e(t){t.decorator("$exceptionHandler",a)}function a(t,e,a){return function(n,i){var r=e.config.appErrorPrefix||"",o={exception:n,cause:i};n.message=r+n.message,t(n,i),a.error(n.message,o)}}angular.module("blocks.exception").provider("exceptionHandler",t).config(e),e.$inject=["$provide"],a.$inject=["$delegate","exceptionHandler","logger"]}(),function(){"use strict";function t(t){function e(e){return function(a){t.error(e,a)}}var a={catcher:e};return a}angular.module("blocks.exception").factory("exception",t),t.$inject=["logger"]}(),function(){"use strict";function t(t,e){function a(a,n,i){e.error(a,i),t.error("Error: "+a,n)}function n(a,n,i){e.info(a,i),t.info("Info: "+a,n)}function i(a,n,i){e.success(a,i),t.info("Success: "+a,n)}function r(a,n,i){e.warning(a,i),t.warn("Warning: "+a,n)}var o={showToasts:!0,error:a,info:n,success:i,warning:r,log:t.log};return o}angular.module("blocks.logger").factory("logger",t),t.$inject=["$log","toastr"]}(),function(){"use strict";function t(t,e,a){function n(t,n,r,o){function s(t,n){t.forEach(function(t){t.config.resolve=angular.extend(t.config.resolve||{},i.resolveAlways),e.state(t.state,t.config)}),n&&!p&&(p=!0,a.otherwise(n))}function l(){n.$on("$stateChangeError",function(e,a,n,i,r,s){if(!g){v.errors++,g=!0;var l=a&&(a.title||a.name||a.loadedTemplateUrl)||"unknown target",c="Error routing to "+l+". "+(s.data||"")+". <br/>"+(s.statusText||"")+": "+(s.status||"");o.warning(c,[a]),t.path("/")}})}function c(){l(),d()}function u(){return r.get()}function d(){n.$on("$stateChangeSuccess",function(t,e,a,r,o){v.changes++,g=!1;var s=i.docTitle+" "+(e.title||"");n.title=s})}var g=!1,p=!1,v={errors:0,changes:0},m={configureStates:s,getStates:u,stateCounts:v};return c(),m}var i={docTitle:void 0,resolveAlways:{}};t.html5Mode(!0),this.configure=function(t){angular.extend(i,t)},this.$get=n,n.$inject=["$location","$rootScope","$state","logger"]}angular.module("blocks.router").provider("routerHelper",t),t.$inject=["$locationProvider","$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function t(t,e,a){function n(t){t.headers=t.headers||{};var e=a.get("authorizationData");return e&&(t.headers.Authorization="Bearer "+e.token),t}function i(n){var i=!1,r=a.get("authorizationData");return r&&(i=!0),401!==n.status||i||e.path("/login").replace(),t.reject(n)}var r={request:n,responseError:i};return r}angular.module("app").factory("authInterceptor",t),t.$inject=["$q","$location","localStorageService"],angular.module("app").config(["$httpProvider",function(t){t.interceptors.push("authInterceptor")}])}(),function(){"use strict";function t(t,e,a,n){function i(n){return e.login(n).then(function(t){return a.set("authorizationData",{token:t.access_token,userName:n.userName}),s(),t},function(e){return t.reject(e)})}function r(){e.logout().then(function(){o()},function(){o()})}function o(){a.remove("authorizationData"),l.isAuthenticated=!1,l.userName="",l.userRetrieved=!1,l.firstName="",l.lastName="",l.email="",l.isAdmin=!1,l.roles.slice(0,l.roles.length)}function s(){var n=a.get("authorizationData");return n&&(l.isAuthenticated=!0,l.userName=n.userName,!l.userRetrieved)?e.getUserInfo().then(function(t){l.userRetrieved=!0;var e=t.data;l.email=e.Email,l.roles=e.Roles,l.firstName=e.FirstName,l.lastName=e.LastName,l.isAdmin=e.IsAdmin}):t.when(!0)}var l={token:"",isAuthenticated:!1,isAdmin:!1,userName:"",userRetrieved:!1,firstName:"",lastName:"",email:"",roles:[]},c={authData:l,login:i,logout:r,fillData:s};return c}angular.module("app.core").factory("authservice",t),t.$inject=["$q","dataservice","localStorageService","logger"]}(),function(){"use strict";function t(t){t.options.timeOut=4e3,t.options.positionClass="toast-bottom-right"}function e(t,e,a){t.debugEnabled&&t.debugEnabled(!0),a.configure(n.appErrorPrefix),e.configure({docTitle:n.appTitle+": "})}var a=angular.module("app.core");a.config(t),t.$inject=["toastr"];var n={appErrorPrefix:"[rightNow Error] ",appTitle:"rightNow"};a.value("config",n),a.config(e),e.$inject=["$logProvider","routerHelperProvider","exceptionHandlerProvider"]}(),function(){"use strict";angular.module("app.core").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t){var a="/404";t.configureStates(e(),a)}function e(){return[{state:"404",config:{url:"/404",templateUrl:"app/core/404.html",title:"404"}}]}angular.module("app.core").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t,e,a){function n(a){var n=c.apiurl+"/Token",i="grant_type=password&username="+a.userName+"&password="+a.password,r={"Content-Type":"application/x-www-form-urlencoded"},o=e.defer();return t.post(n,i,{headers:r}).success(function(t){o.resolve(t)}).error(function(t,e){o.reject(t)}),o.promise}function i(){var e=c.apiurl+"/api/account/Logout";return t.post(e)}function r(){return t.get(c.apiurl+"/api/account/userinfo")}function o(){return e.when(72)}function s(){function n(t){return t.data}function i(t){var n="query for programs failed. "+t.data.description;return a.error(n),e.reject(n)}return t.get(c.apiurl+"/api/programs").then(n)["catch"](i)}function l(){function n(t){return t.data}function i(t){var n="query for sessions failed. "+t.data.description;return a.error(n),e.reject(n)}return t.get(c.apiurl+"/api/sessions").then(n)["catch"](i)}var c={apiurl:"",login:n,logout:i,getUserInfo:r,getPrograms:s,getSessions:l,getMessageCount:o};return c}angular.module("app.core").factory("dataservice",t),t.$inject=["$http","$q","logger"]}(),function(){"use strict";function t(t,e,a){function n(){var e=[i(),o(),r()];return t.all(e).then(function(){a.info("Activated Dashboard View")})}function i(){return e.getMessageCount().then(function(t){return s.messageCount=t,s.messageCount})}function r(){return e.getSessions().then(function(t){return s.sessions=t,s.sessions})}function o(){return e.getPrograms().then(function(t){return s.programs=t,s.programs})}var s=this;s.messageCount=0,s.programs=[],s.sessions=[],s.title="Dashboard",n()}angular.module("app.dashboard").controller("DashboardController",t),t.$inject=["$q","dataservice","logger"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"dashboard",config:{url:"/",templateUrl:"app/dashboard/dashboard.html",controller:"DashboardController",controllerAs:"vm",title:"dashboard",settings:{nav:1,content:'<i class="fa fa-dashboard"></i> Dashboard',showOnNav:!0}}}]}angular.module("app.dashboard").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(){function t(t,e,a){function n(e){var a="dropy";e.preventDefault(),r.hasClass(a)?r.hasClass(a)&&(r.removeClass(a),i.slideUp(350,t.whenDoneAnimating)):(i.slideDown(350,t.whenDoneAnimating),r.addClass(a))}var i=e.find(".sidebar-inner"),r=e.find(".sidebar-dropdown a");e.addClass("sidebar"),r.click(n)}var e={bindToController:!0,link:t,restrict:"EA",scope:{whenDoneAnimating:"&?"}};return e}angular.module("app.layout").directive("htSidebar",t)}(),function(){"use strict";function t(){function t(t,e,a){function n(){a.info("Activated Top Bar")}function i(){e.path("/login")}function r(){t.logout(),e.path("/login"),a.success("logged out!")}var o=this;o.message="",o.loginUser=i,o.logoutUser=r,o.authData=t.authData,n()}var e={bindToController:!0,controller:t,controllerAs:"vm",restrict:"EA",scope:{navline:"="},templateUrl:"app/layout/ht-top-nav.html"};return t.$inject=["authservice","$location","logger"],e}angular.module("app.layout").directive("htTopNav",t)}(),function(){"use strict";function t(t,e,a,n,i,r){function o(){n.success(a.appTitle+" loaded!",null),l.authData.isAuthenticated||r.path("/login"),s()}function s(){e(function(){t.showSplash=!1},1e3)}var l=this;l.busyMessage="Please wait ...",l.isBusy=!0,t.showSplash=!0,l.navline={title:a.appTitle,text:"What do you want to go here",link:"http://muchmedia.com.au/"},l.authData=i.authData,o()}angular.module("app.layout").controller("ShellController",t),t.$inject=["$rootScope","$timeout","config","logger","authservice","$location"]}(),function(){"use strict";function t(t,e){function a(){n()}function n(){r.navRoutes=o.filter(function(t){return t.settings&&t.settings.nav}).sort(function(t,e){return t.settings.nav-e.settings.nav})}function i(e){if(!e.title||!t.current||!t.current.title)return"";var a=e.title;return t.current.title.substr(0,a.length)===a?"current":""}var r=this,o=e.getStates();r.isCurrent=i,a()}angular.module("app.layout").controller("SidebarController",t),t.$inject=["$state","routerHelper"]}(),function(){"use strict";function t(t,e,a){function n(){a.info("Activated Login View")}function i(){o.message="",t.login(o.loginData).then(function(n){a.success("Welcome to our world "+t.authData.userName,!0),e.path("/")},function(t){a.info(t),o.message=t.error_description})}function r(t){o.loginData.userName=t+"@ewide.biz",o.loginData.password="Abcd!234",o.loginUser()}var o=this;o.title="Login",o.loginData={userName:"",password:""},o.message="",o.loginUser=i,o.loginAUser=r,o.authData=t.authData,n()}angular.module("app.login").controller("LoginController",t),t.$inject=["authservice","$location","logger"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"login",config:{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"vm",title:"Login",settings:{}}}]}angular.module("app.login").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"viewProgram",config:{url:"/program/:id/",templateUrl:"app/program/program-view.html",controller:"ProgramViewController",controllerAs:"vm",title:"Program View"}}]}angular.module("app.program").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t){function e(){t.info("Activated Program View")}var a=this;a.title="Program",e()}angular.module("app.program").controller("ProgramViewController",t),t.$inject=["logger"]}(),function(){"use strict";function t(t){function e(t,e,i){i.$observe("htImgPerson",function(t){t=a+(t||n),i.$set("src",t)})}var a=t.imageBasePath,n=t.unknownPersonImageSource,i={link:e,restrict:"A"};return i}angular.module("app.widgets").directive("htImgPerson",t),t.$inject=["config"]}(),function(){"use strict";function t(){var t={scope:{title:"@",subtitle:"@",rightText:"@",allowCollapse:"@"},templateUrl:"app/widgets/widget-header.html",restrict:"EA"};return t}angular.module("app.widgets").directive("htWidgetHeader",t)}(),angular.module("app.core").run(["$templateCache",function(t){t.put("app/admin/admin.html",'<section class=mainbar><section class=matter><div class=container><div class=row><div class="widget wviolet"><div ht-widget-header title={{vm.title}}></div><div class="widget-content user"><h3>TODO: Implement Your Features</h3><p>{{vm.authData}}</p></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/core/404.html",'<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-12><ul class=today-datas><li class=bred><div class=pull-left><i class="fa fa-warning"></i></div><div class="datas-text pull-right"><a><span class=bold>404</span></a>Page Not Found</div><div class=clearfix></div></li></ul></div></div><div class=row><div class="widget wblue"><div ht-widget-header title="Page Not Found" allow-collapse=true></div><div class="widget-content text-center text-info"><div class=container>No soup for you!</div></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/dashboard/dashboard.html",'<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-6><div class="widget wviolet"><div ht-widget-header title="Active Coaching Programs" allow-collapse=true></div><div class="widget-content text-center text-info"><table class="table table-condensed table-striped"><thead><tr><th>Coach</th><th>Coachee</th></tr></thead><tbody><tr ng-repeat="p in vm.programs"><td>{{p.Coach.FirstName}}</td><td>{{p.Coachee.FirstName}}</td><td><a href="/program/{{p.Id}}/" class="btn btn-primary">Open</a></td></tr></tbody></table></div><div class=widget-foot><div class=clearfix></div></div></div></div><div class=col-md-6><div class="widget wviolet"><div ht-widget-header title=Sessions allow-collapse=true></div><div class="widget-content text-center text-info"><table class="table table-condensed table-striped"><thead><tr><th>Coach</th><th>Coachee</th></tr></thead><tbody><tr ng-repeat="p in vm.sessions"><td>{{p.CoachingProgram.Coach.FirstName}}</td><td>{{p.CoachingProgram.Coachee.FirstName}}</td><td><a href="/program/{{p.CoachingProgram.Id}}/session/{{p.Id}}/" class="btn btn-primary">Open</a></td></tr></tbody></table></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></div></section></section>'),t.put("app/layout/ht-top-nav.html",'<nav class="navbar navbar-fixed-top navbar-inverse"><div class=navbar-header><a href="/" class=navbar-brand><span class=brand-title>{{vm.navline.title}}</span></a> <a class="btn navbar-btn navbar-toggle" data-toggle=collapse data-target=.navbar-collapse><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></a></div><div class="navbar-collapse collapse"><div class="pull-right navbar-logo"><ul class="nav navbar-nav pull-right"><li ng-show=vm.authData.isAuthenticated><p>Welcome {{ vm.authData.firstName }}</p></li><li ng-show=!vm.authData.isAuthenticated class="dropdown dropdown-big"><a href=/login>Login</a></li><li ng-show=vm.authData.isAuthenticated class="dropdown dropdown-big"><a ng-click=vm.logoutUser() href>Logout</a></li></ul></div></div></nav>'),t.put("app/layout/shell.html",'<div ng-controller="ShellController as vm"><header class=clearfix><ht-top-nav navline=vm.navline></ht-top-nav></header><section id=content class=content><div ng-show=vm.authData.isAuthenticated ng-include="\'app/layout/sidebar.html\'"></div><div ui-view class=shuffle-animation></div><div ngplus-overlay ngplus-overlay-delay-in=50 ngplus-overlay-delay-out=700 ngplus-overlay-animation=dissolve-animation><img src=images/busy.gif><div class="page-spinner-message overlay-message">{{vm.busyMessage}}</div></div></section></div>'),t.put("app/layout/sidebar.html",'<div ng-controller="SidebarController as vm"><ht-sidebar when-done-animating=vm.sidebarReady()><div class=sidebar-filler></div><div class=sidebar-dropdown><a href=#>Menu</a></div><div class=sidebar-inner><div class=sidebar-widget></div><ul class=navi><li class="nlightblue fade-selection-animation" ng-class=vm.isCurrent(r) ng-repeat="r in vm.navRoutes"><a ui-sref={{r.name}} ng-bind-html=r.settings.content></a></li></ul></div></ht-sidebar></div>'),t.put("app/login/login.html",'<section id=dashboard-view class=mainbar data-ng-controller="LoginController as vm"><section class=matter><div class=container><span ng-show=vm.authData.isAuthenticated>{{vm.welcome}}</span><form ng-show=!vm.authData.isAuthenticated ng-submit=vm.loginUser()><input ng-model=vm.loginData.userName type=text name=user placeholder=Username> <input ng-model=vm.loginData.password type=password name=pass placeholder=Password> <button class="btn btn-primary" type=submit>Login</button></form><div><a class="btn btn-primary" href ng-click="vm.loginAUser(\'admin\')">Login As Admin</a> <a class="btn btn-primary" href ng-click="vm.loginAUser(\'user1\')">Login As User 1</a> <a class="btn btn-primary" href ng-click="vm.loginAUser(\'user2\')">Login As User 2</a> <a class="btn btn-primary" href ng-click="vm.loginAUser(\'user3\')">Login As User 3</a></div><div ng-show=vm.authData.isAuthenticated><a ng-click=vm.callRestricted() href>You are already Logged In!</a></div><br><div>{{vm.message}}</div></div></section></section>'),t.put("app/program/program-view.html",'<section class=mainbar><section class=matter><div class=container><div class=row><div class="widget wviolet"><div ht-widget-header title={{vm.title}}></div><div class="widget-content user"><h3>TODO: Implement Your Program Features</h3></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/widgets/widget-header.html",'<div class=widget-head><div class="page-title pull-left">{{title}}</div><small class=page-title-subtle ng-show=subtitle>({{subtitle}})</small><div class="widget-icons pull-right"></div><small class="pull-right page-title-subtle" ng-show=rightText>{{rightText}}</small><div class=clearfix></div></div>')}]);