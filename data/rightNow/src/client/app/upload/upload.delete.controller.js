(function () {
    'use strict';

    angular
        .module('app.upload')
        .controller('UploadDeleteController', UploadDeleteController);
    UploadDeleteController.$inject = ['logger', '$modalInstance', 'id'];

    function UploadDeleteController(logger, $modalInstance, id) {
        var vm = this;
        vm.title = 'Delete Upload';
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
