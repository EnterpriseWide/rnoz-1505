(function () {
    'use strict';

    angular
        .module('app.assignment')
        .controller('AssignmentUpdateController', AssignmentUpdateController);
    AssignmentUpdateController.$inject = ['logger', '$stateParams', '$q', 'dataservice', 'authservice', '$state'];

    function AssignmentUpdateController(logger, $stateParams, $q, dataservice, authservice, $state) {
        var vm = this;
        vm.title = 'Assignment Update';
        vm.authData = authservice.authData;
        vm.save = save;
        vm.data = {};

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            vm.data.Id = $stateParams.assignmentId;
            var promises = [getAssignment(vm.data.Id)];
            return $q.all(promises).then(function() {
            });
        }

        function getAssignment(id) {
            return dataservice.readAssignment(id).then(function (data) {
                vm.data = data;
            });
        }

        function save() {
            dataservice.updateAssignment(vm.data.Id, vm.data).then(function (data) {
                $state.go('assignments', {programId: vm.data.CoachingProgramId});
                logger.info('Assignment Saved');
            });
        }

    }
})();
