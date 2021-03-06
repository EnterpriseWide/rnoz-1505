(function () {
    'use strict';

    angular
        .module('app.resource')
        .controller('ResourceUpdateController', ResourceUpdateController);
    ResourceUpdateController.$inject = ['logger', '$stateParams', '$q', 'dataservice', 'authservice', '$state'];

    function ResourceUpdateController(logger, $stateParams, $q, dataservice, authservice, $state) {
        var vm = this;
        vm.title = 'Resource Update';
        vm.mediaType = 0;
        vm.authData = authservice.authData;
        vm.save = save;
        vm.data = {};
        vm.apiurl = dataservice.apiurl;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            vm.isLink = false;
            var id = $stateParams.resourceId;
            var promises = [getResource(id, vm.mediaType)];
            return $q.all(promises).then(function() {
            });
        }

        function getResource(id, mediaType) {
            return dataservice.readProgramMedia(id, mediaType).then(function (data) {
                vm.data = data;
                vm.isLink = data.Link;
            });
        }

        function save() {
            dataservice.updateProgramMedia(vm.data.Id, vm.data).then(function (data) {
                $state.go('resources', {programId: vm.data.CoachingProgramId});
                logger.info('Resource Saved');
            });
        }

    }
})();
