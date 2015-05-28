(function () {
    'use strict';

    angular
        .module('app.learningplan')
        .controller('AssignmentUpdateController', AssignmentUpdateController);
    AssignmentUpdateController.$inject = ['logger', '$stateParams', '$q', 'dataservice', 'authservice'];

    function AssignmentUpdateController(logger, $stateParams, $q, dataservice, authservice) {
        var vm = this;
        vm.title = 'Assignment Update';
        vm.data = {};
        vm.authData = authservice.authData;
        vm.save = save;
        vm.apiurl = dataservice.apiurl;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            vm.data.Id = $stateParams.assignmentId;
            var promises = [getAssignment(vm.data.Id)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getAssignment(id) {
            return dataservice.getAssignment(id).then(function (data) {
                vm.data = data;
                return vm.data;
            });
        }

        function save() {
            dataservice.putAssignment(vm.data.Id, vm.data).then(function (data) {
                logger.info('Assignment Saved');
            });
        }

    }
})();
