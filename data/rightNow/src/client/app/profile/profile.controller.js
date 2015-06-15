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
        vm.authData = authservice.authData;

        activate();

        function activate() {
            angular.extend(vm.data, authservice.authData);
            if (!(vm.authData.isCoach || vm.authData.isAdmin)) {
                dataservice.listPrograms().then(function (data) {
                    var program = data[0];
                    vm.programId = program.Id;
                });
            }
        }

        function save() {
            // Update UserInfo on Server
            dataservice.updateUserInfo(vm.data).then(function (data) {
                authservice.fillData();
                logger.success('Profile Updated');
            });
        }
    }
})();
