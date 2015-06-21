(function () {
    'use strict';

    angular
        .module('app.upload')
        .controller('UploadUpdateController', UploadUpdateController);
    UploadUpdateController.$inject = ['logger', '$stateParams', '$q', 'dataservice', 'authservice', '$state'];

    function UploadUpdateController(logger, $stateParams, $q, dataservice, authservice, $state) {
        var vm = this;
        vm.title = 'Upload Update';
        vm.mediaType = 1;
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
                $state.go('uploads', {programId: vm.data.CoachingProgramId});
                logger.info('Upload Saved');
            });
        }

    }
})();
