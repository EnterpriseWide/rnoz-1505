(function () {
    'use strict';

    angular
        .module('app.admin.program')
        .controller('AdminProgramCreateController', AdminProgramCreateController);
    AdminProgramCreateController.$inject = ['logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice'];

    function AdminProgramCreateController(logger, authservice, $state, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Add New Program';
        vm.data = {
            surveyIds: []
        };
        vm.authData = authservice.authData;
        vm.save = save;
        vm.UserLabel = userLabel;
        vm.users = [];
        vm.surveys = [];

        activate();

        function activate() {
            var promises = [getUsers(), getSurveys()];
            return $q.all(promises);
        }

        function getUsers() {
            dataservice.listUsers()
                .then(function (data) {
                    vm.users = data;
                });
        }

        function getSurveys() {
            dataservice.listSurveys()
                .then(function (data) {
                    vm.surveys = data;
                });
        }

        function save() {
            dataservice.createProgram(vm.data).then(function (data) {
                logger.info('Program Created');
                $state.go('admin');
            });
        }

        function userLabel(user) {
            return user.LastName + ', ' + user.FirstName;
        }

    }
})();
