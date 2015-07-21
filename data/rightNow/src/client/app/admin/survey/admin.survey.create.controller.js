(function () {
    'use strict';

    angular
        .module('app.admin.survey')
        .controller('AdminSurveyCreateController', AdminSurveyCreateController);
    AdminSurveyCreateController.$inject = ['authData', 'logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice'];

    function AdminSurveyCreateController(authData, logger, authservice, $state, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Add New Survey';
        vm.data = {
        };
        vm.authData = authservice.authData;
        vm.save = save;

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $state.go('404');
            }
        }

        function save() {
            vm.data.CreatedAt = moment().toISOString();
            vm.data.UpdatedAt = moment().toISOString();
            dataservice.createSurvey(vm.data).then(function (data) {
                logger.info('Survey Created');
                $state.go('admin');
            });
        }

    }
})();
