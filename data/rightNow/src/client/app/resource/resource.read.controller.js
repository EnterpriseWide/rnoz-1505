(function () {
    'use strict';

    angular
        .module('app.resource')
        .controller('ResourceReadController', ResourceReadController);
    ResourceReadController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice'];

    function ResourceReadController(logger, authservice, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Resource';
        vm.data = {};
        vm.screenconfig = {};
        vm.authData = authservice.authData;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var resourceId = $stateParams.resourceId;
            var promises = [getResource(resourceId)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getResource(id) {
            return dataservice.readResource(id).then(function (data) {
                vm.data = data;
                return vm.data;
            });
        }

    }
})();
