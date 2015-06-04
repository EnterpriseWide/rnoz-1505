(function () {
    'use strict';

    angular
        .module('app.resource')
        .controller('ResourceListController', ResourceListController);
    ResourceListController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice', '$modal', '$state', 'Upload'];

    function ResourceListController(logger, authservice, $stateParams, $q, dataservice, $modal, $state, Upload) {
        var vm = this;
        vm.title = 'Resources';
        vm.resources = [];
        vm.screenconfig = {};
        vm.authData = authservice.authData;
        vm.upload = upload;
        vm.log = '';
        vm.files = [];
        vm.apiurl = dataservice.apiurl;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var promises = [getResources(vm.programId)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getResources(id) {
            return dataservice.listResources(id).then(function (data) {
                vm.resources = data;
                console.log(vm.resources);
            });
        }

        function upload() {
            if (vm.files && vm.files.length) {
                for (var i = 0; i < vm.files.length; i++) {
                    var file = vm.files[i];
                    Upload.upload({
                        url: vm.apiurl + '/api/ProgramMedia?programId=' + vm.programId + '&mediaType=0',
                        file: file
                    }).progress(function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function (data, status, headers, config) {
                        vm.resources.push(data[0]);
                        vm.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + vm.log;
                    });
                }
            }
        }
    }
})();
