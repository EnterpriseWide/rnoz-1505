(function () {
    'use strict';

    angular
        .module('app.upload')
        .controller('UploadReadController', UploadReadController);
    UploadReadController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice'];

    function UploadReadController(logger, authservice, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Upload';
        vm.MediaType = 1;
        vm.data = {};
        vm.screenconfig = {};
        vm.authData = authservice.authData;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var uploadId = $stateParams.uploadId;
            var promises = [getUpload(uploadId, vm.MediaType)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getUpload(id, mediaType) {
            return dataservice.readProgramMedia(id, mediaType).then(function (data) {
                vm.data = data;
                return vm.data;
            });
        }

    }
})();
