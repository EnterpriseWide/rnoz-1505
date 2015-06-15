(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['authservice', '$location', 'logger', '$state', 'dataservice', 'menuservice'];
    function LoginController(authservice, $location, logger, $state, dataservice, menuservice) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Login';
        vm.loginData = {
            userName: '',
            password: ''
        };
        vm.message = '';
        vm.loginUser = loginUser;
        vm.loginAUser = loginAUser;
        vm.authData = authservice.authData;
        vm.screenconfig = {
            oztrainUrl: 'http://www.oztrain.com.au',
            blurb: 'Right.Now. is an online coaching app... more descriptive text here, lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ' +
            '<a href="http://www.oztrain.com.au" target="_blank">Read More <span class="icon icon-chevron-right"></span></a>'
        };
        vm.menu = menuservice.options;

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

        function loginAUser(auser) {
            vm.menu.programId = 0;
            vm.loginData.userName = auser + '@ewide.biz';
            vm.loginData.password = 'Abcd!234';
            vm.loginUser();
        }
    }
})();
