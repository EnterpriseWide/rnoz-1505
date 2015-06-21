(function () {
    'use strict';

    angular
        .module('app.upload')
        .controller('UploadReadController', UploadReadController);
    UploadReadController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice'];

    function UploadReadController(logger, authservice, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Upload';
        vm.mediaType = 1;
        vm.data = {};
        vm.screenconfig = {};
        vm.authData = authservice.authData;
        vm.apiurl = dataservice.apiurl;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var resourceId = $stateParams.resourceId;
            var promises = [getResource(resourceId, vm.mediaType)];
            return $q.all(promises).then(function() {
            });
        }

        function getResource(id, mediaType) {
            return dataservice.readProgramMedia(id, mediaType).then(function (data) {
                vm.data = data;
                return vm.data;
            });
        }

    }
})();
