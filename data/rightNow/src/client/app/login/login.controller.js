(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['authservice', '$location', 'logger', '$state', 'dataservice', 'menuservice', 'ngDialog'];
    function LoginController(authservice, $location, logger, $state, dataservice, menuservice, ngDialog) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Login';
        vm.loginData = {
            userName: '',
            password: ''
        };
        vm.message = '';
        vm.loginUser = loginUser;
        vm.authData = authservice.authData;
        vm.screenconfig = {
            oztrainUrl: 'http://www.oztrain.com.au',
            blurb: 'Welcome to <em>right.<strong>now</strong></em>, <em><strong>oz</strong>train’s</em> online coaching service. Please log in here if you are already registered with our coaching service. If you have a query about what <em>right.<strong>now</strong></em> can do for you, please <a href="http://www.oztrain.com.au/contact/" target="_blank">contact us on the <em><strong>oz</strong>train</em> website</a> to make an enquiry.'
        };
        vm.menu = menuservice.options;
        vm.openForgotPassword = openForgotPassword;

        activate();

        function activate() {
            if (vm.authData.isAuthenticated) {
                redirect();
            }
        }

        function redirect() {
            var authData = authservice.authData;
            if (!authData.isAuthenticated) {
                $state.go('login');
            } else if (authData.isAdmin) {
                $state.go('admin');
            } else if (authData.isCoach) {
                $state.go('programs');
            } else {
                dataservice.listPrograms().then(function (data) {
                    var program = data[0];
                    $state.go('program', {programId:program.Id});
                });
            }
        }

        function loginUser() {
            vm.message = '';
            vm.menu.programId = 0;
            authservice.login(vm.loginData)
                .then(function (response) {
                    redirect();
                }, function (error) {
                    logger.info(error);
                    // jscs:disable
                    vm.message = error.error_description; //jshint ignore:line
                    // jscs:enable
                });
        }

        var forgotPasswordOptions = {
            template: 'app/login/forgotPassword.html'
        };

        function forgotPassword(email) {
            if (email) {
                dataservice.forgotPassword(email).then(function (data) {
                    logger.success(data);
                    console.log(data);
                    vm.email = email;
                });
            } else {
                ngDialog.openConfirm(forgotPasswordOptions)
                    .then(openForgotPassword);
            }
        }

        function openForgotPassword(ev) {
            ngDialog.openConfirm(forgotPasswordOptions)
                .then(forgotPassword);
        }

    }
})();
