(function () {
    'use strict';

    angular
        .module('app.assignment')
        .controller('AssignmentDeleteController', AssignmentDeleteController);
    AssignmentDeleteController.$inject = ['logger', '$modalInstance', 'id'];
    function AssignmentDeleteController(logger, $modalInstance, id) {
        var vm = this;
        vm.title = 'Delete Assignment';
        vm.ok = ok;
        vm.cancel = cancel;

        activate();

        function activate() {
            vm.id = id;
        }

        function ok() {
            $modalInstance.close(vm.id);
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }
})();
