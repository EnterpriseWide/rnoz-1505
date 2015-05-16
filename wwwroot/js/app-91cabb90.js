/**
 * rightNow - rightNow Project Generated from HotTowel Angular
 * @authors 
 * @version v0.0.0
 * @link 
 * @license 
 */
!function(){"use strict";angular.module("app",["app.admin","app.core","app.help","app.layout","app.login","app.profile","app.programs","app.program","app.widgets"])}(),function(){"use strict";angular.module("app.admin",["app.core","app.widgets"])}(),function(){"use strict";angular.module("blocks.exception",["blocks.logger"])}(),function(){"use strict";angular.module("blocks.logger",[])}(),function(){"use strict";angular.module("blocks.router",["ui.router","blocks.logger"])}(),function(){"use strict";angular.module("app.core",["ngAnimate","ngSanitize","blocks.exception","blocks.logger","blocks.router","ui.router","ngplus","LocalStorageModule"])}(),function(){"use strict";angular.module("app.help",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.layout",["app.core"])}(),function(){"use strict";angular.module("app.login",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.profile",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.program",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.programs",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.widgets",[])}(),function(){"use strict";function t(t,e){function i(){t.info("Activated Admin View")}var a=this;a.title="Admin",a.authData=e.authData,i()}angular.module("app.admin").controller("AdminController",t),t.$inject=["logger","authservice"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"admin",config:{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminController",controllerAs:"vm",title:"Admin",settings:{nav:2,content:'<i class="fa fa-lock"></i> Admin'}}}]}angular.module("app.admin").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(){this.config={appErrorPrefix:void 0},this.configure=function(t){this.config.appErrorPrefix=t},this.$get=function(){return{config:this.config}}}function e(t){t.decorator("$exceptionHandler",i)}function i(t,e,i){return function(a,o){var r=e.config.appErrorPrefix||"",n={exception:a,cause:o};a.message=r+a.message,t(a,o),i.error(a.message,n)}}angular.module("blocks.exception").provider("exceptionHandler",t).config(e),e.$inject=["$provide"],i.$inject=["$delegate","exceptionHandler","logger"]}(),function(){"use strict";function t(t){function e(e){return function(i){t.error(e,i)}}var i={catcher:e};return i}angular.module("blocks.exception").factory("exception",t),t.$inject=["logger"]}(),function(){"use strict";function t(t,e){function i(i,a,o){e.error(i,o),t.error("Error: "+i,a)}function a(i,a,o){e.info(i,o),t.info("Info: "+i,a)}function o(i,a,o){e.success(i,o),t.info("Success: "+i,a)}function r(i,a,o){e.warning(i,o),t.warn("Warning: "+i,a)}var n={showToasts:!0,error:i,info:a,success:o,warning:r,log:t.log};return n}angular.module("blocks.logger").factory("logger",t),t.$inject=["$log","toastr"]}(),function(){"use strict";function t(t,e,i){function a(t,a,r,n){function s(t,a){t.forEach(function(t){t.config.resolve=angular.extend(t.config.resolve||{},o.resolveAlways),e.state(t.state,t.config)}),a&&!p&&(p=!0,i.otherwise(a))}function l(){a.$on("$stateChangeError",function(e,i,a,o,r,s){if(!g){v.errors++,g=!0;var l=i&&(i.title||i.name||i.loadedTemplateUrl)||"unknown target",c="Error routing to "+l+". "+(s.data||"")+". <br/>"+(s.statusText||"")+": "+(s.status||"");n.warning(c,[i]),t.path("/")}})}function c(){l(),u()}function d(){return r.get()}function u(){a.$on("$stateChangeSuccess",function(t,e,i,r,n){v.changes++,g=!1;var s=o.docTitle+" "+(e.title||"");a.title=s})}var g=!1,p=!1,v={errors:0,changes:0},m={configureStates:s,getStates:d,stateCounts:v};return c(),m}var o={docTitle:void 0,resolveAlways:{}};t.html5Mode(!0),this.configure=function(t){angular.extend(o,t)},this.$get=a,a.$inject=["$location","$rootScope","$state","logger"]}angular.module("blocks.router").provider("routerHelper",t),t.$inject=["$locationProvider","$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function t(t,e,i){function a(t){t.headers=t.headers||{};var e=i.get("authorizationData");return e&&(t.headers.Authorization="Bearer "+e.token),t}function o(a){var o=!1,r=i.get("authorizationData");return r&&(o=!0),401!==a.status||o||e.path("/login").replace(),t.reject(a)}var r={request:a,responseError:o};return r}angular.module("app").factory("authInterceptor",t),t.$inject=["$q","$location","localStorageService"],angular.module("app").config(["$httpProvider",function(t){t.interceptors.push("authInterceptor")}])}(),function(){"use strict";function t(t,e,i,a){function o(a){return e.login(a).then(function(t){return i.set("authorizationData",{token:t.access_token,userName:a.userName}),s(),t},function(e){return t.reject(e)})}function r(){e.logout().then(function(){n()},function(){n()})}function n(){i.remove("authorizationData"),l.isAuthenticated=!1,l.userName="",l.userRetrieved=!1,l.firstName="",l.lastName="",l.email="",l.roles.slice(0,l.roles.length),l.isAdmin=!1,l.isCoach=!1}function s(){var a=i.get("authorizationData");return a&&(l.isAuthenticated=!0,l.userName=a.userName,!l.userRetrieved)?e.getUserInfo().then(function(t){l.userRetrieved=!0;var e=t.data;l.email=e.Email,l.roles=e.Roles,l.firstName=e.FirstName,l.lastName=e.LastName,l.isAdmin=e.IsAdmin,l.isAdmin=l.roles.indexOf("Admin")>=0,l.isCoach=l.roles.indexOf("Coach")>=0}):t.when(!0)}var l={token:"",isAuthenticated:!1,isAdmin:!1,isCoach:!1,userName:"",userRetrieved:!1,firstName:"",lastName:"",email:"",roles:[]},c={authData:l,login:o,logout:r,fillData:s};return c}angular.module("app.core").factory("authservice",t),t.$inject=["$q","dataservice","localStorageService","logger"]}(),function(){"use strict";function t(t){t.options.timeOut=4e3,t.options.positionClass="toast-bottom-right"}function e(t,e,i){t.debugEnabled&&t.debugEnabled(!0),i.configure(a.appErrorPrefix),e.configure({docTitle:a.appTitle+": "})}var i=angular.module("app.core");i.config(t),t.$inject=["toastr"];var a={appErrorPrefix:"[rightNow Error] ",logo:"/images/logo.png",appTitle:"right.now.",tagLine:"Executive coaching program"};i.value("config",a),i.config(e),e.$inject=["$logProvider","routerHelperProvider","exceptionHandlerProvider"]}(),function(){"use strict";angular.module("app.core").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t){var i="/404";t.configureStates(e(),i)}function e(){return[{state:"404",config:{url:"/404",templateUrl:"app/core/404.html",title:"404"}}]}angular.module("app.core").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t,e,i){function a(i){var a=c.apiurl+"/Token",o="grant_type=password&username="+i.userName+"&password="+i.password,r={"Content-Type":"application/x-www-form-urlencoded"},n=e.defer();return t.post(a,o,{headers:r}).success(function(t){n.resolve(t)}).error(function(t,e){n.reject(t)}),n.promise}function o(){var e=c.apiurl+"/api/account/Logout";return t.post(e)}function r(){return t.get(c.apiurl+"/api/account/userinfo")}function n(){function a(t){return t.data}function o(t){var a="query for programs failed. "+t.data.description;return i.error(a),e.reject(a)}return t.get(c.apiurl+"/api/programs").then(a)["catch"](o)}function s(a){function o(t){return t.data}function r(t){var o="query for program "+a+" failed. "+t.data.description;return i.error(o),e.reject(o)}return t.get(c.apiurl+"/api/programs/"+a+"/").then(o)["catch"](r)}function l(){function a(t){return t.data}function o(t){var a="query for sessions failed. "+t.data.description;return i.error(a),e.reject(a)}return t.get(c.apiurl+"/api/sessions").then(a)["catch"](o)}var c={apiurl:"",login:a,logout:o,getUserInfo:r,getPrograms:n,getProgram:s,getSessions:l};return c}angular.module("app.core").factory("dataservice",t),t.$inject=["$http","$q","logger"]}(),function(){"use strict";function t(t,e){function i(){t.info("Activated "+a.title+" View")}var a=this;a.title="Help",a.authData=e.authData,a.bodyText="<p>Contact Info</p><p>PDF Instructions</p><p>And a few paragraphs of basic instructions</p>",i()}angular.module("app.help").controller("HelpController",t),t.$inject=["logger","authservice"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"help",config:{url:"/help",templateUrl:"app/help/help.html",controller:"HelpController",controllerAs:"vm",title:"Help",settings:{nav:2,content:'<i class="fa fa-lock"></i> Help'}}}]}angular.module("app.help").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(){function t(t,e,i){function a(){i.info("Activated Top Bar")}function o(){e.path("/login")}function r(){t.logout(),e.path("/login"),i.success("logged out!")}var n=this;n.message="",n.loginUser=o,n.logoutUser=r,n.authData=t.authData,a()}var e={bindToController:!0,controller:t,controllerAs:"vm",restrict:"EA",scope:{navline:"="},templateUrl:"app/layout/ht-top-nav.html"};return t.$inject=["authservice","$location","logger"],e}angular.module("app.layout").directive("htTopNav",t)}(),function(){"use strict";function t(t,e,i,a,o,r){function n(){a.success(i.appTitle+" loaded!",null),l.authData.isAuthenticated||r.path("/login"),s()}function s(){e(function(){t.showSplash=!1},1e3)}var l=this;l.busyMessage="Please wait ...",l.isBusy=!0,t.showSplash=!0,l.navline={logo:i.logo,title:i.appTitle,tagline:i.tagLine},l.authData=o.authData,n()}angular.module("app.layout").controller("ShellController",t),t.$inject=["$rootScope","$timeout","config","logger","authservice","$location"]}(),function(){"use strict";function t(t,e,i){function a(){i.info("Activated Login View")}function o(){n.message="",t.login(n.loginData).then(function(a){i.success("Welcome to our world "+t.authData.userName,!0),e.path("/")},function(t){i.info(t),n.message=t.error_description})}function r(t){n.loginData.userName=t+"@ewide.biz",n.loginData.password="Abcd!234",n.loginUser()}var n=this;n.title="Login",n.loginData={userName:"",password:""},n.message="",n.loginUser=o,n.loginAUser=r,n.authData=t.authData,n.blurb='<p>Right.Now. is an online coaching app... more descriptive text here <a href="http://oztrain.com.au/" target="_blank">Read More about Oztrain here</a></p>',a()}angular.module("app.login").controller("LoginController",t),t.$inject=["authservice","$location","logger"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"login",config:{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"vm",title:"Login",settings:{}}}]}angular.module("app.login").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t,e){function i(){t.info("Activated "+a.title+" View")}var a=this;a.title="Profile",a.authData=e.authData,i()}angular.module("app.profile").controller("ProfileController",t),t.$inject=["logger","authservice"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"profile",config:{url:"/profile",templateUrl:"app/profile/profile.html",controller:"ProfileController",controllerAs:"vm",title:"Profile",settings:{nav:2,content:'<i class="fa fa-lock"></i> Profile'}}}]}angular.module("app.profile").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t,e,i,a){function o(){var a=e.id,o=[r(a)];return i.all(o).then(function(){t.info("Activated "+n.title+" View")})}function r(t){return a.getProgram(t).then(function(t){return n.program=t,n.program})}var n=this;n.title="Program",n.program=[],n.bodyTextYourCoach="<p>Read more information about your coach, or send them a message</p>",n.bodyTextLearningPlan="<p>This document is created over teh course of your coaching program - both you and your coach can edit it, export it or email a copy.</p>",n.bodyTextAssignments="<p>These assignments are specified by your coach and are updated over the course of your coaching program.</p>",n.bodyTextResources="<p>Read more information about Resources here</p>",n.bodyTextUploads="<p>Read more information about Uploads here</p>",n.bodyTextSurveys="<p>Read more information about sruveys here</p>",o()}angular.module("app.program").controller("ProgramController",t),t.$inject=["logger","$stateParams","$q","dataservice"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"program",config:{url:"/program/:id/",templateUrl:"app/program/program.html",controller:"ProgramController",controllerAs:"vm",title:"Program View"}}]}angular.module("app.program").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t,e,i){function a(){var e=[r(),o()];return t.all(e).then(function(){i.info("Activated "+n.title+" View")})}function o(){return e.getSessions().then(function(t){return n.sessions=t,n.sessions})}function r(){return e.getPrograms().then(function(t){return n.programs=t,n.programs})}var n=this;n.messageCount=0,n.programs=[],n.sessions=[],n.title="Programs",a()}angular.module("app.programs").controller("ProgramsController",t),t.$inject=["$q","dataservice","logger"]}(),function(){"use strict";function t(t){t.configureStates(e())}function e(){return[{state:"programs",config:{url:"/",templateUrl:"app/programs/programs.html",controller:"ProgramsController",controllerAs:"vm",title:"programs",settings:{nav:1,content:'<i class="fa fa-programs"></i> Programs',showOnNav:!0}}}]}angular.module("app.programs").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t){function e(t,e,o){o.$observe("htImgPerson",function(t){t=i+(t||a),o.$set("src",t)})}var i=t.imageBasePath,a=t.unknownPersonImageSource,o={link:e,restrict:"A"};return o}angular.module("app.widgets").directive("htImgPerson",t),t.$inject=["config"]}(),function(){"use strict";function t(){var t={scope:{title:"@",subtitle:"@",rightText:"@",allowCollapse:"@"},templateUrl:"app/widgets/widget-header.html",restrict:"EA"};return t}angular.module("app.widgets").directive("htWidgetHeader",t)}(),angular.module("app.core").run(["$templateCache",function(t){t.put("app/admin/admin.html",'<section class=mainbar><section class=matter><div class=container><div class=row><div class="widget wviolet"><div ht-widget-header title={{vm.title}}></div><div class="widget-content user"><h3>TODO: Implement Your Features</h3><p>{{vm.authData}}</p></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/core/404.html",'<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-12><ul class=today-datas><li class=bred><div class=pull-left><i class="fa fa-warning"></i></div><div class="datas-text pull-right"><a><span class=bold>404</span></a>Page Not Found</div><div class=clearfix></div></li></ul></div></div><div class=row><div class="widget wblue"><div ht-widget-header title="Page Not Found" allow-collapse=true></div><div class="widget-content text-center text-info"><div class=container>No soup for you!</div></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/help/help.html",'<section class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-6><div class="widget wred"><div ht-widget-header title={{vm.title}}></div><div class="widget-content text-center text-info" ng-bind-html=vm.bodyText></div><div class=widget-foot><div class=clearfix></div></div></div></div><div class=col-md-6><div class="widget wred"><div ht-widget-header title=FAQs></div><div class="widget-content text-center text-info"></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></div></section></section>'),t.put("app/layout/ht-top-nav.html",'<nav class="navbar navbar-fixed-top navbar-inverse"><div class=navbar-header><a href="/" class=navbar-brand><span class=navbar-logo><img src={{vm.navline.logo}} alt="right.now. logo"></span> <span class=brand-title>{{vm.navline.title}}</span> <span class=brand-title>{{vm.navline.tagline}}</span></a> <a class="btn navbar-btn navbar-toggle" data-toggle=collapse data-target=.navbar-collapse><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></a></div><div class="navbar-collapse collapse"><div class="pull-right navbar-logo"><ul class="nav navbar-nav pull-right"><li><a ui-sref=programs><i class="fa fa-lock"></i> Dashboard</a></li><li ng-show=vm.authData.isAdmin><a ui-sref=admin><i class="fa fa-lock"></i> Admin</a></li><li><a ui-sref=profile><i class="fa fa-lock"></i> My Profile</a></li><li><a ui-sref=help><i class="fa fa-lock"></i> Help</a></li><li><a ng-click=vm.logoutUser() href><i class="fa fa-lock"></i> Logout</a></li></ul></div></div></nav>'),t.put("app/layout/shell.html",'<div ng-controller="ShellController as vm"><header class=clearfix ng-show=vm.authData.isAuthenticated><ht-top-nav navline=vm.navline></ht-top-nav></header><section id=content class=content><div ui-view class=shuffle-animation></div><div ngplus-overlay ngplus-overlay-delay-in=50 ngplus-overlay-delay-out=700 ngplus-overlay-animation=dissolve-animation><img src=images/busy.gif><div class="page-spinner-message overlay-message">{{vm.busyMessage}}</div></div></section><footer class=clearfix ng-show=vm.authData.isAuthenticated><div class="row right"><p>right.now. developed by <img src=/images/oztrainLogo.png alt="oztrain logo"></p></div></footer></div>'),t.put("app/login/login.html",'<section id=dashboard-view class=mainbar data-ng-controller="LoginController as vm"><section class=matter><div class=container><p><a href=http://oztrain.com.au target=_blank><img src=/images/oztrainLogo.png alt="oztrain logo"></a></p><form ng-show=!vm.authData.isAuthenticated ng-submit=vm.loginUser()><input ng-model=vm.loginData.userName type=text name=user placeholder=Username> <input ng-model=vm.loginData.password type=password name=pass placeholder=Password><br><button class="btn btn-primary" type=submit>Login</button> <a class="btn btn-default">Forgot your password</a></form><div ng-show=!vm.authData.isAuthenticated><a class="btn btn-primary" href ng-click="vm.loginAUser(\'admin\')">Login As Admin</a> <a class="btn btn-primary" href ng-click="vm.loginAUser(\'user1\')">Login As User 1</a> <a class="btn btn-primary" href ng-click="vm.loginAUser(\'user2\')">Login As User 2</a> <a class="btn btn-primary" href ng-click="vm.loginAUser(\'user3\')">Login As User 3</a></div><div ng-show=vm.authData.isAuthenticated><a ng-click=vm.callRestricted() href>You are already Logged In!</a></div><br><div>{{vm.message}}</div><div class=row><div class=col-sm-10 ng-bind-html=vm.blurb></div><div class=col-sm-2><a href=http://oztrain.com.au target=_blank><img src=/images/oztrainLogo.png alt="oztrain logo"></a></div></div><div>{{ vm.authData }}</div></div></section></section>'),t.put("app/profile/profile.html",'<section class=mainbar><section class=matter><div class=container><div class=row><div class="widget wviolet"><div ht-widget-header title={{vm.title}}></div><div class="widget-content user"><h3>TODO: Implement Your Features</h3></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/program/program.html",'<section class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-6><div class="widget wred"><div ht-widget-header title="Your Coach" righttext="{{vm.program.Coach.FirstName}} {{vm.program.Coach.LastName}} >"></div><div class="widget-content text-info" ng-bind-html=vm.bodyTextYourCoach></div><div class=widget-foot><div class=clearfix></div></div></div><div class="widget worange"><div ht-widget-header title="Learning Plan"></div><div class="widget-content text-info" ng-bind-html=vm.bodyTextLearningPlan></div><div class=widget-foot><div class=clearfix></div></div></div><div class="widget wyellow"><div ht-widget-header title=Assignments></div><div class="widget-content text-info" ng-bind-html=vm.bodyTextAssignments></div><div class=widget-foot><div class=clearfix></div></div></div><div class="widget wblue"><div ht-widget-header title=Resources></div><div class="widget-content text-info" ng-bind-html=vm.bodyTextResources></div><div class=widget-foot><div class=clearfix></div></div></div><div class="widget wgreen"><div ht-widget-header title=Uploads></div><div class="widget-content text-info" ng-bind-html=vm.bodyTextUploads></div><div class=widget-foot><div class=clearfix></div></div></div><div class="widget wviolet"><div ht-widget-header title=Surveys></div><div class="widget-content text-info" ng-bind-html=vm.bodyTextSurveys></div><div class=widget-foot><div class=clearfix></div></div></div></div><div class=col-md-6><div class="widget wlightblue"><div ht-widget-header title="Video Coaching Sessions"></div><div class="widget-content text-center text-info"><table class="table table-condensed table-striped"><thead><tr><th>Coachee</th><th>Started At</th></tr></thead><tbody><tr ng-repeat="p in vm.program.CoachingSessions"><td>{{p.CoachingProgram.Coach.FirstName}} {{p.CoachingProgram.Coach.LastName}}</td><td>{{p.StartedAt}}</td></tr></tbody></table></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></div></section></section>'),t.put("app/programs/programs.html",'<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-6><div class="widget wred" ng-repeat="p in vm.programs"><div ht-widget-header title={{p.Coach.FirstName}}></div><div class="widget-content text-center text-info"><a ui-sref="program({id: p.Id})" class="btn btn-default">Open Program >></a></div><div class=widget-foot><div class=clearfix></div></div></div></div><div class=col-md-6><div class="widget wlightblue"><div ht-widget-header title=Sessions allow-collapse=true></div><div class="widget-content text-center text-info"><table class="table table-condensed table-striped"><thead><tr><th>Coachee</th><th>Started At</th></tr></thead><tbody><tr ng-repeat="p in vm.sessions"><td>{{p.CoachingProgram.Coach.FirstName}} {{p.CoachingProgram.Coach.LastName}}</td><td>{{p.StartedAt}}</td></tr></tbody></table></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></div></section></section>'),t.put("app/widgets/widget-header.html",'<div class=widget-head><div class="page-title pull-left">{{title}}</div><small class=page-title-subtle ng-show=subtitle>({{subtitle}})</small><div class="widget-icons pull-right"></div><small class="pull-right page-title-subtle" ng-show=rightText>{{rightText}}</small><div class=clearfix></div></div>')}]);