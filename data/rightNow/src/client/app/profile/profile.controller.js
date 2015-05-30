(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['logger', 'authservice', 'dataservice'];

    /* @ngInject */
    function ProfileController(logger, authservice, dataservice) {
        var vm = this;
        vm.title = 'Profile';
        vm.screenconfig = {
            BodyText: '<p>Some instructions for the profile page go here</p>'
        };
        vm.save = save;
        vm.data = {};

        activate();

        function activate() {
            angular.extend(vm.data, authservice.authData);
            logger.info('Activated ' + vm.title + ' View');
        }

        function save() {
            // Update UserInfo on Server
            dataservice.updateUserInfo(vm.data).then(function (data) {
                authservice.authData.userRetrieved = false;
                authservice.fillData();
                logger.success('Profile Updated');
            });
        }
    }
})();
