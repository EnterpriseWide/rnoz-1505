(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);
    ProfileController.$inject = ['logger', 'authservice', 'dataservice', 'config', '$q'];
    function ProfileController(logger, authservice, dataservice, config, $q) {
        var vm = this;
        vm.title = 'Your Profile';
        vm.screenconfig = {
            BodyText: '<p>Some instructions for the profile page go here</p>'
        };
        vm.save = save;
        vm.data = {};
        vm.authData = authservice.authData;
        vm.userError = [];
        vm.timezones = [];

        activate();

        function activate() {
            authservice.fillData().then(function () {
                angular.extend(vm.data, authservice.authData);
            });
            var promises = [listTimezones()];
            if (!(vm.authData.isCoach || vm.authData.isAdmin)) {
                promises = [listTimezones(), listPrograms()];
            } else {
                promises = [listTimezones()];
            }
            return $q.all(promises);
        }

        function listPrograms() {
            return dataservice.listPrograms().then(function (data) {
                var program = data[0];
                if (program) {
                    vm.programId = program.Id;
                }
            });
        }

        function listTimezones() {
            return dataservice.listTimezones().then(function (data) {
                vm.timezones = data;
            });
        }

        function save() {
            // Update UserInfo on Server
            dataservice.updateUserInfo(vm.data).then(function (data) {
                authservice.fillData();
                logger.success('Profile Updated');
            }, function (error) {
                vm.userError = error[''];
            });
        }
    }
})();
