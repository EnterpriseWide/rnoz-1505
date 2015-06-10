(function () {
    'use strict';

    angular
        .module('app.upload')
        .controller('UploadListController', UploadListController);
    UploadListController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice', '$mdDialog', '$state', 'Upload'];

    function UploadListController(logger, authservice, $stateParams, $q, dataservice, $mdDialog, $state, Upload) {
        var vm = this;
        vm.title = 'Uploads';
        vm.MediaType = 1;
        vm.uploads = [];
        vm.screenconfig = {};
        vm.authData = authservice.authData;
        vm.log = '';
        vm.files = [];
        vm.apiurl = dataservice.apiurl;
        vm.upload = upload;
        vm.deleteRecord = deleteRecord;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var promises = [getUploads(vm.programId, vm.MediaType)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getUploads(id, mediaType) {
            return dataservice.listProgramMedias(id, mediaType).then(function (data) {
                vm.uploads = data;
            });
        }

        function upload() {
            if (vm.files && vm.files.length) {
                for (var i = 0; i < vm.files.length; i++) {
                    var file = vm.files[i];
                    Upload.upload({
                        url: vm.apiurl + '/api/ProgramMedia?programId=' + vm.programId + '&mediaType=' + vm.MediaType,
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

        function deleteRecord(id, ev) {
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Would you like to Delete the Upload?')
                .ariaLabel('Delete Upload')
                .ok('OK')
                .cancel('Cancel')
                .targetEvent(ev);
            $mdDialog.show(confirm).then(function() {
                dataservice.deleteProgramMedia(id).then(function(data) {
                    logger.success('Deleted Upload ' + data.Id);
                    getUploads(vm.programId, vm.MediaType);
                });
            }, function() {
                // Do Nothing
            });
        }

    }
})();
