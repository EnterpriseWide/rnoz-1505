(function () {
    'use strict';

    angular
        .module('app.resource')
        .controller('ResourceUpdateController', ResourceUpdateController);
    ResourceUpdateController.$inject = ['logger', '$stateParams', '$q', 'dataservice', 'authservice', '$state'];

    function ResourceUpdateController(logger, $stateParams, $q, dataservice, authservice, $state) {
        var vm = this;
        vm.title = 'Resource Update';
        vm.authData = authservice.authData;
        vm.save = save;
        vm.data = {};

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var id = $stateParams.resourceId;
            var promises = [getResource(id)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getResource(id) {
            return dataservice.readResource(id).then(function (data) {
                vm.data = data;
            });
        }

        function save() {
            dataservice.updateResource(vm.data.Id, vm.data).then(function (data) {
                $state.go('resources', {programId: vm.data.CoachingProgramId});
                logger.info('Resource Saved');
            });
        }

    }
})();
