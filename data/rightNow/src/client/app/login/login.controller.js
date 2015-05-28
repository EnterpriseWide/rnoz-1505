(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['authservice', '$location', 'logger'];

    function LoginController(authservice, $location, logger) {
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
            oztrainUrl: 'http://oztrain.com.au',
            blurb: '<p>Right.Now. is an online coaching app... more descriptive text here ' +
            '<a href="http://oztrain.com.au/" target="_blank">Read More about Oztrain here</a></p>'
        };

        activate();

        function activate() {
            logger.info('Activated Login View');
        }

        function loginUser() {
            vm.message = '';
            authservice.login(vm.loginData)
                .then(function (response) {
                    logger.success('Welcome to our world ' + authservice.authData.userName, true);
                    $location.path('/');
                }, function (error) {
                    logger.info(error);
                    // jscs:disable
                    vm.message = error.error_description; //jshint ignore:line
                    // jscs:enable
                });
        }

        function loginAUser(auser) {
            vm.loginData.userName = auser + '@ewide.biz';
            vm.loginData.password = 'Abcd!234';
            vm.loginUser();
        }
    }
})();
