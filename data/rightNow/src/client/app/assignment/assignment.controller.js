(function () {
    'use strict';

    angular
        .module('app.assignment')
        .controller('AssignmentController', AssignmentController);
    AssignmentController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice'];

    function AssignmentController(logger, authservice, $stateParams, $q, dataservice
        ) {
        var vm = this;
        vm.title = 'Assignment';
        vm.program = [];
        vm.screenconfig = {};
        vm.authData = authservice.authData;

        activate();

        function activate() {
            var id = $stateParams.id;
            var promises = [getProgramWithAssignments(id)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getProgramWithAssignments(id) {
            return dataservice.getProgramWithAssignments(id).then(function (data) {
                vm.sessions = data;
                return vm.sessions;
            });
        }

    }
})();
