(function () {
    'use strict';

    angular
        .module('app.resource')
        .controller('ResourceDeleteController', ResourceDeleteController);
    ResourceDeleteController.$inject = ['logger', '$modalInstance', 'id'];

    function ResourceDeleteController(logger, $modalInstance, id) {
        var vm = this;
        vm.title = 'Delete Resource';
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
