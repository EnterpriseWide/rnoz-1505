(function () {
    'use strict';

    angular
        .module('app.resource')
        .controller('ResourceListController', ResourceListController);
    ResourceListController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice', '$modal', '$state', 'Upload'];

    function ResourceListController(logger, authservice, $stateParams, $q, dataservice, $modal, $state, Upload) {
        var vm = this;
        vm.title = 'Resources';
        vm.mediaType = 0;
        vm.resources = [];
        vm.screenconfig = {};
        vm.authData = authservice.authData;
        vm.upload = upload;
        vm.log = '';
        vm.files = [];
        vm.apiurl = dataservice.apiurl;
        vm.deleteRecord = deleteRecord;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var promises = [getResources(vm.programId, vm.mediaType)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getResources(id, mediaType) {
            return dataservice.listProgramMedias(id, mediaType).then(function (data) {
                vm.resources = data;
                console.log(vm.resources);
            });
        }

        function upload() {
            if (vm.files && vm.files.length) {
                for (var i = 0; i < vm.files.length; i++) {
                    var file = vm.files[i];
                    Upload.upload({
                        url: vm.apiurl + '/api/ProgramMedia?programId=' + vm.programId + '&mediaType=' + vm.mediaType,
                        file: file
                    }).progress(function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function (data, status, headers, config) {
                        vm.resources.push(data[0]);
                        logger.success('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                    });
                }
            }
        }

        function deleteRecord(id) {
            var modalInstance = $modal.open({
                templateUrl: 'app/resource/resource.delete.html',
                controller: 'ResourceDeleteController',
                controllerAs: 'vm',
                resolve: {
                    id: function() {
                        return id;
                    }
                }
            });

            modalInstance.result.then(function (id) {
                dataservice.deleteProgramMedia(id).then(function(data) {
                    logger.success('Deleted Resource ' + data.Id);
                    getResources(vm.programId, vm.mediaType);
                });
            });
        }

    }
})();
