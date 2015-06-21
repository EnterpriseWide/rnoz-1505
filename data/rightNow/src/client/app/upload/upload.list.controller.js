(function () {
    'use strict';

    angular
        .module('app.upload')
        .controller('UploadListController', UploadListController);
    UploadListController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice', 'ngDialog', '$state', 'Upload'];

    function UploadListController(logger, authservice, $stateParams, $q, dataservice, ngDialog, $state, Upload) {
        var vm = this;
        vm.title = 'Uploads';
        vm.mediaType = 1;
        vm.resources = [];
        vm.screenconfig = {};
        vm.authData = authservice.authData;
        vm.log = '';
        vm.files = [];
        vm.apiurl = dataservice.apiurl;
        vm.upload = upload;
        vm.deleteRecord = deleteRecord;
        vm.addLink = addLink;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var promises = [getUploads(vm.programId, vm.mediaType)];
            return $q.all(promises).then(function() {
            });
        }

        function getUploads(id, mediaType) {
            return dataservice.listProgramMedias(id, mediaType).then(function (data) {
                vm.resources = data;
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
                        '<button type="button" class="btn btn-blue" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="btn btn-blue" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                dataservice.deleteProgramMedia(id).then(function(data) {
                    logger.success('Deleted Upload ' + data.Id);
                    getUploads(vm.programId, vm.mediaType);
                });
            }, function() {
                // Do Nothing
            });
        }

        var options = {
            template: 'app/resource/resource.createLink.html'
        };

        function saveNewLink(data) {
            if (data.link) {
                dataservice.createProgramMediaLink(vm.mediaType, {CoachingProgramId: vm.programId, Name: data.title, Link: data.link}).then(function (data) {
                    logger.success('Link Added Successfully!');
                    getUploads(vm.programId, vm.mediaType);
                });
            } else {
                ngDialog.openConfirm(options)
                    .then(saveNewLink);
            }
        }

        function addLink() {
            ngDialog.openConfirm(options)
                .then(saveNewLink);
        }

    }
})();
