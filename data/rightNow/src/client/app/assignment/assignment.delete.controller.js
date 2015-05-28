(function () {
    'use strict';

    angular
        .module('app.assignments')
        .controller('AssignmentDeleteController', AssignmentDeleteController);
    AssignmentDeleteController.$inject = ['logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', '$modalInstance'];

    function AssignmentDeleteController(logger, authservice, $state, $stateParams, $q, dataservice, $modalInstance) {
        var vm = this;
        vm.title = 'Delete Assignment';
        vm.data = {};
        vm.screenconfig = {};
        vm.authData = authservice.authData;

        activate();

        function activate() {
            vm.data.CoachingProgramId = $stateParams.programId;
            logger.info('Activated ' + vm.title + ' View');
        }

        vm.ok = function () {
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
})();
