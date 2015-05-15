/**
 * rightNow - rightNow Project Generated from HotTowel Angular
 * @authors 
 * @version v0.0.0
 * @link 
 * @license 
 */
!function(){"use strict";angular.module("app",["app.core","app.widgets","app.admin","app.dashboard","app.layout","app.program","app.login"])}(),function(){"use strict";angular.module("app.admin",["app.core","app.widgets"])}(),function(){"use strict";angular.module("blocks.exception",["blocks.logger"])}(),function(){"use strict";angular.module("blocks.logger",[])}(),function(){"use strict";angular.module("blocks.router",["ui.router","blocks.logger"])}(),function(){"use strict";angular.module("app.core",["ngAnimate","ngSanitize","blocks.exception","blocks.logger","blocks.router","ui.router","ngplus","LocalStorageModule"])}(),function(){"use strict";angular.module("app.dashboard",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.layout",["app.core"])}(),function(){"use strict";angular.module("app.login",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.program",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.widgets",[])}(),function(){"use strict";function t(t){function e(){t.info("Activated Admin View")}var a=this;a.title="Admin",e()}angular.module("app.admin").controller("AdminController",t),t.$inject=["logger"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"admin",config:{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminController",controllerAs:"vm",title:"Admin",settings:{nav:2,content:'<i class="fa fa-lock"></i> Admin'}}}]}angular.module("app.admin").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(){this.config={appErrorPrefix:void 0},this.configure=function(t){this.config.appErrorPrefix=t},this.$get=function(){return{config:this.config}}}function e(t){t.decorator("$exceptionHandler",a)}function a(t,e,a){return function(n,r){var i=e.config.appErrorPrefix||"",o={exception:n,cause:r};n.message=i+n.message,t(n,r),a.error(n.message,o)}}angular.module("blocks.exception").provider("exceptionHandler",t).config(e),e.$inject=["$provide"],a.$inject=["$delegate","exceptionHandler","logger"]}(),function(){"use strict";function t(t){function e(e){return function(a){t.error(e,a)}}var a={catcher:e};return a}angular.module("blocks.exception").factory("exception",t),t.$inject=["logger"]}(),function(){"use strict";function t(t,e){function a(a,n,r){e.error(a,r),t.error("Error: "+a,n)}function n(a,n,r){e.info(a,r),t.info("Info: "+a,n)}function r(a,n,r){e.success(a,r),t.info("Success: "+a,n)}function i(a,n,r){e.warning(a,r),t.warn("Warning: "+a,n)}var o={showToasts:!0,error:a,info:n,success:r,warning:i,log:t.log};return o}angular.module("blocks.logger").factory("logger",t),t.$inject=["$log","toastr"]}(),function(){"use strict";function t(t,e,a){function n(t,n,i,o){function s(t,n){t.forEach(function(t){t.config.resolve=angular.extend(t.config.resolve||{},r.resolveAlways),e.state(t.state,t.config)}),n&&!p&&(p=!0,a.otherwise(n))}function l(){n.$on("$stateChangeError",function(e,a,n,r,i,s){if(!g){v.errors++,g=!0;var l=a&&(a.title||a.name||a.loadedTemplateUrl)||"unknown target",c="Error routing to "+l+". "+(s.data||"")+". <br/>"+(s.statusText||"")+": "+(s.status||"");o.warning(c,[a]),t.path("/")}})}function c(){l(),d()}function u(){return i.get()}function d(){n.$on("$stateChangeSuccess",function(t,e,a,i,o){v.changes++,g=!1;var s=r.docTitle+" "+(e.title||"");n.title=s})}var g=!1,p=!1,v={errors:0,changes:0},m={configureStates:s,getStates:u,stateCounts:v};return c(),m}var r={docTitle:void 0,resolveAlways:{}};t.html5Mode(!0),this.configure=function(t){angular.extend(r,t)},this.$get=n,n.$inject=["$location","$rootScope","$state","logger"]}angular.module("blocks.router").provider("routerHelper",t),t.$inject=["$locationProvider","$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function t(t,e,a){function n(t){t.headers=t.headers||{};var e=a.get("authorizationData");return e&&(t.headers.Authorization="Bearer "+e.token),t}function r(n){var r=!1,i=a.get("authorizationData");return i&&(r=!0),401!==n.status||r||e.path("/login").replace(),t.reject(n)}var i={request:n,responseError:r};return i}angular.module("app").factory("authInterceptor",t),t.$inject=["$q","$location","localStorageService"],angular.module("app").config(["$httpProvider",function(t){t.interceptors.push("authInterceptor")}])}(),function(){"use strict";function t(t,e,a){function n(n){return e.login(n).then(function(t){return a.set("authorizationData",{token:t.access_token,userName:n.userName}),s.isAuthenticated=!0,s.userName=n.userName,s.userRetreived=!1,t},function(e){return t.reject(e)})}function r(){e.logout().then(function(){i()},function(){i()})}function i(){a.remove("authorizationData"),s.isAuthenticated=!1,s.userName="",s.userRetreived=!1,s.firstName="",s.lastName="",s.email="",s.roles.slice(0,s.roles.length)}function o(){var n=a.get("authorizationData");return n&&(s.isAuthenticated=!0,s.userName=n.userName,!s.userRetreived)?e.getUserInfo().then(function(t){s.userRetreived=!0;var e=t.data;s.email=e.email,s.roles=e.roles,s.firstName=e.firstName,s.lastName=e.lastName}):t.when(!0)}var s={isAuthenticated:!1,userName:"",userRetreived:!1,firstName:"",lastName:"",email:"",roles:[]},l={authData:s,login:n,logout:r,fillData:o};return l}angular.module("app.core").factory("authservice",t),t.$inject=["$q","dataservice","localStorageService"]}(),function(){"use strict";function t(t){t.options.timeOut=4e3,t.options.positionClass="toast-bottom-right"}function e(t,e,a){t.debugEnabled&&t.debugEnabled(!0),a.configure(n.appErrorPrefix),e.configure({docTitle:n.appTitle+": "})}var a=angular.module("app.core");a.config(t),t.$inject=["toastr"];var n={appErrorPrefix:"[rightNow Error] ",appTitle:"rightNow"};a.value("config",n),a.config(e),e.$inject=["$logProvider","routerHelperProvider","exceptionHandlerProvider"]}(),function(){"use strict";angular.module("app.core").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t){var a="/404";t.configureStates(e(),a)}function e(){return[{state:"404",config:{url:"/404",templateUrl:"app/core/404.html",title:"404"}}]}angular.module("app.core").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t,e,a){function n(a){var n=l.apiurl+"/Token",r="grant_type=password&username="+a.userName+"&password="+a.password,i={"Content-Type":"application/x-www-form-urlencoded"},o=e.defer();return t.post(n,r,{headers:i}).success(function(t){o.resolve(t)}).error(function(t,e){o.reject(t)}),o.promise}function r(){var e=l.apiurl+"/api/account/Logout";return t.post(e)}function i(){return e.when(72)}function o(){function n(t){return t.data}function r(t){var n="query for programs failed. "+t.data.description;return a.error(n),e.reject(n)}return t.get(l.apiurl+"/api/programs").then(n)["catch"](r)}function s(){function n(t){return t.data}function r(t){var n="query for sessions failed. "+t.data.description;return a.error(n),e.reject(n)}return t.get(l.apiurl+"/api/sessions").then(n)["catch"](r)}var l={apiurl:"http://rightnow.oztrain.local",login:n,logout:r,getPrograms:o,getSessions:s,getMessageCount:i};return l}angular.module("app.core").factory("dataservice",t),t.$inject=["$http","$q","logger"]}(),function(){"use strict";function t(t,e,a){function n(){var e=[r(),o(),i()];return t.all(e).then(function(){a.info("Activated Dashboard View")})}function r(){return e.getMessageCount().then(function(t){return s.messageCount=t,s.messageCount})}function i(){return e.getSessions().then(function(t){return s.sessions=t,s.sessions})}function o(){return e.getPrograms().then(function(t){return s.programs=t,s.programs})}var s=this;s.messageCount=0,s.programs=[],s.sessions=[],s.title="Dashboard",n()}angular.module("app.dashboard").controller("DashboardController",t),t.$inject=["$q","dataservice","logger"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"dashboard",config:{url:"/",templateUrl:"app/dashboard/dashboard.html",controller:"DashboardController",controllerAs:"vm",title:"dashboard",settings:{nav:1,content:'<i class="fa fa-dashboard"></i> Dashboard',showOnNav:!0}}}]}angular.module("app.dashboard").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(){function t(t,e,a){function n(e){var a="dropy";e.preventDefault(),i.hasClass(a)?i.hasClass(a)&&(i.removeClass(a),r.slideUp(350,t.whenDoneAnimating)):(r.slideDown(350,t.whenDoneAnimating),i.addClass(a))}var r=e.find(".sidebar-inner"),i=e.find(".sidebar-dropdown a");e.addClass("sidebar"),i.click(n)}var e={bindToController:!0,link:t,restrict:"EA",scope:{whenDoneAnimating:"&?"}};return e}angular.module("app.layout").directive("htSidebar",t)}(),function(){"use strict";function t(){function t(){}var e={bindToController:!0,controller:t,controllerAs:"vm",restrict:"EA",scope:{navline:"="},templateUrl:"app/layout/ht-top-nav.html"};return e}angular.module("app.layout").directive("htTopNav",t)}(),function(){"use strict";function t(t,e,a,n){function r(){n.success(a.appTitle+" loaded!",null),i()}function i(){e(function(){t.showSplash=!1},1e3)}var o=this;o.busyMessage="Please wait ...",o.isBusy=!0,t.showSplash=!0,o.navline={title:a.appTitle,text:"What do you want to go here",link:"http://muchmedia.com.au/"},r()}angular.module("app.layout").controller("ShellController",t),t.$inject=["$rootScope","$timeout","config","logger"]}(),function(){"use strict";function t(t,e){function a(){n()}function n(){i.navRoutes=o.filter(function(t){return t.settings&&t.settings.nav}).sort(function(t,e){return t.settings.nav-e.settings.nav})}function r(e){if(!e.title||!t.current||!t.current.title)return"";var a=e.title;return t.current.title.substr(0,a.length)===a?"current":""}var i=this,o=e.getStates();i.isCurrent=r,a()}angular.module("app.layout").controller("SidebarController",t),t.$inject=["$state","routerHelper"]}(),function(){"use strict";function t(t,e,a){function n(){a.info("Activated Login View")}function r(){l.loginData.userName="admin@ewide.biz",l.loginData.password="Abcd!234",o()}function i(){l.loginData.userName="user1@ewide.biz",l.loginData.password="Abcd!234",o()}function o(){t.login(l.loginData).then(function(n){a.success("Welcome to our world "+t.authData.userName,!0),e.path("/")},function(t){l.message=t.error_description})}function s(){t.logout(),a.success("logged out!")}var l=this;l.title="Login",l.loginData={userName:"",password:""},l.message="",l.loginUser=o,l.logoutUser=s,l.useAdmin=r,l.useUser=i,n()}angular.module("app.login").controller("LoginController",t),t.$inject=["authservice","$location","logger"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"login",config:{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"vm",title:"Login",settings:{nav:2,content:'<i class="fa fa-lock"></i> Login'}}}]}angular.module("app.login").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"viewProgram",config:{url:"/program/:id/",templateUrl:"app/program/program-view.html",controller:"ProgramViewController",controllerAs:"vm",title:"Program View"}}]}angular.module("app.program").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t){function e(){t.info("Activated Program View")}var a=this;a.title="Program",e()}angular.module("app.program").controller("ProgramViewController",t),t.$inject=["logger"]}(),function(){"use strict";function t(t){function e(t,e,r){r.$observe("htImgPerson",function(t){t=a+(t||n),r.$set("src",t)})}var a=t.imageBasePath,n=t.unknownPersonImageSource,r={link:e,restrict:"A"};return r}angular.module("app.widgets").directive("htImgPerson",t),t.$inject=["config"]}(),function(){"use strict";function t(){var t={scope:{title:"@",subtitle:"@",rightText:"@",allowCollapse:"@"},templateUrl:"app/widgets/widget-header.html",restrict:"EA"};return t}angular.module("app.widgets").directive("htWidgetHeader",t)}(),angular.module("app.core").run(["$templateCache",function(t){t.put("app/admin/admin.html",'<section class=mainbar><section class=matter><div class=container><div class=row><div class="widget wviolet"><div ht-widget-header title={{vm.title}}></div><div class="widget-content user"><h3>TODO: Implement Your Features</h3></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/core/404.html",'<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-12><ul class=today-datas><li class=bred><div class=pull-left><i class="fa fa-warning"></i></div><div class="datas-text pull-right"><a><span class=bold>404</span></a>Page Not Found</div><div class=clearfix></div></li></ul></div></div><div class=row><div class="widget wblue"><div ht-widget-header title="Page Not Found" allow-collapse=true></div><div class="widget-content text-center text-info"><div class=container>No soup for you!</div></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/dashboard/dashboard.html",'<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-6><div class="widget wviolet"><div ht-widget-header title="Active Coaching Programs" allow-collapse=true></div><div class="widget-content text-center text-info"><table class="table table-condensed table-striped"><thead><tr><th>Coach</th><th>Coachee</th></tr></thead><tbody><tr ng-repeat="p in vm.programs"><td>{{p.Coach.FirstName}}</td><td>{{p.Coachee.FirstName}}</td><td><a href="/program/{{p.Id}}/" class="btn btn-primary">Open</a></td></tr></tbody></table></div><div class=widget-foot><div class=clearfix></div></div></div></div><div class=col-md-6><div class="widget wviolet"><div ht-widget-header title=Sessions allow-collapse=true></div><div class="widget-content text-center text-info"><table class="table table-condensed table-striped"><thead><tr><th>Coach</th><th>Coachee</th></tr></thead><tbody><tr ng-repeat="p in vm.sessions"><td>{{p.CoachingProgram.Coach.FirstName}}</td><td>{{p.CoachingProgram.Coachee.FirstName}}</td><td><a href=/program/{{p.Id}} class="btn btn-primary">Open</a></td></tr></tbody></table></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></div></section></section>'),t.put("app/layout/ht-top-nav.html",'<nav class="navbar navbar-fixed-top navbar-inverse"><div class=navbar-header><a href="/" class=navbar-brand><span class=brand-title>{{vm.navline.title}}</span></a> <a class="btn navbar-btn navbar-toggle" data-toggle=collapse data-target=.navbar-collapse><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></a></div><div class="navbar-collapse collapse"><div class="pull-right navbar-logo"><ul class="nav navbar-nav pull-right"><li><a ng-href={{vm.navline.link}} target=_blank>{{vm.navline.text}}</a></li><li class="dropdown dropdown-big"><a href=http://www.angularjs.org target=_blank><img src=images/AngularJS-small.png></a></li><li><a href="http://www.gulpjs.com/" target=_blank><img src=images/gulp-tiny.png></a></li></ul></div></div></nav>'),t.put("app/layout/shell.html",'<div ng-controller="ShellController as vm"><header class=clearfix><ht-top-nav navline=vm.navline></ht-top-nav></header><section id=content class=content><div ng-include="\'app/layout/sidebar.html\'"></div><div ui-view class=shuffle-animation></div><div ngplus-overlay ngplus-overlay-delay-in=50 ngplus-overlay-delay-out=700 ngplus-overlay-animation=dissolve-animation><img src=images/busy.gif><div class="page-spinner-message overlay-message">{{vm.busyMessage}}</div></div></section></div>'),t.put("app/layout/sidebar.html",'<div ng-controller="SidebarController as vm"><ht-sidebar when-done-animating=vm.sidebarReady()><div class=sidebar-filler></div><div class=sidebar-dropdown><a href=#>Menu</a></div><div class=sidebar-inner><div class=sidebar-widget></div><ul class=navi><li class="nlightblue fade-selection-animation" ng-class=vm.isCurrent(r) ng-repeat="r in vm.navRoutes"><a ui-sref={{r.name}} ng-bind-html=r.settings.content></a></li></ul></div></ht-sidebar></div>'),t.put("app/login/login.html",'<section id=dashboard-view class=mainbar data-ng-controller="LoginController as vm"><section class=matter><div class=container><span ng-show=vm.isAuthenticated>{{vm.welcome}}</span><form ng-show=!vm.isAuthenticated ng-submit=vm.loginUser()><input ng-model=vm.loginData.userName type=text name=user placeholder=Username> <input ng-model=vm.loginData.password type=password name=pass placeholder=Password> <input type=submit value=Login></form><div>{{vm.error}}</div><div ng-show="vm.isAuthenticated || true"><a ng-click=vm.callRestricted() href>Shh, this is private!</a><br><div>{{vm.message}}</div><a ng-click=vm.logoutUser() href>Logout</a></div></div></section></section>'),t.put("app/program/program-view.html",'<section class=mainbar><section class=matter><div class=container><div class=row><div class="widget wviolet"><div ht-widget-header title={{vm.title}}></div><div class="widget-content user"><h3>TODO: Implement Your Program Features</h3></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/widgets/widget-header.html",'<div class=widget-head><div class="page-title pull-left">{{title}}</div><small class=page-title-subtle ng-show=subtitle>({{subtitle}})</small><div class="widget-icons pull-right"></div><small class="pull-right page-title-subtle" ng-show=rightText>{{rightText}}</small><div class=clearfix></div></div>')}]);