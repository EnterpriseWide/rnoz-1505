(function () {
    'use strict';

    angular
        .module('app.assignments')
        .controller('AssignmentDeleteController', AssignmentDeleteController);
    AssignmentDeleteController.$inject = ['logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice'];

    function AssignmentDeleteController(logger, authservice, $state, $stateParams, $q, dataservice) {
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

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
})();
