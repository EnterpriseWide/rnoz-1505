(function () {
    'use strict';

    angular
        .module('app.upload')
        .controller('UploadListController', UploadListController);
    UploadListController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice', 'ngDialog', '$state', 'Upload'];

    function UploadListController(logger, authservice, $stateParams, $q, dataservice, ngDialog, $state, Upload) {
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
                        var i = vm.files.indexOf(file);
                        vm.files.splice(i, 1);
                        logger.success('file ' + config.file.name + 'uploaded.');
                        vm.resources.push(data[0]);
                    });
                }
            }
        }

        function deleteRecord(id, ev) {
            ngDialog.openConfirm({
                template: '<p>Would you like to Delete the Upload?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
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
