(function () {
    'use strict';

    angular
        .module('app.assignments')
        .controller('AssignmentCreateController', AssignmentCreateController);
    AssignmentCreateController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice'];

    function AssignmentCreateController(logger, authservice, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Add New Assignment';
        vm.data = {};
        vm.screenconfig = {};
        vm.authData = authservice.authData;
        vm.save = save;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            logger.info('Activated ' + vm.title + ' View');
        }

        function save() {
            dataservice.postAssignment(vm.data.programId, vm.data).then(function (data) {
                logger.info('Assignment Created');
            });
        }

    }
})();
