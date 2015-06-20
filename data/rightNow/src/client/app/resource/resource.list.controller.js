(function () {
    'use strict';

    angular
        .module('app.resource')
        .controller('ResourceListController', ResourceListController);
    ResourceListController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice', 'ngDialog', '$state', 'Upload'];

    function ResourceListController(logger, authservice, $stateParams, $q, dataservice, ngDialog, $state, Upload) {
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
        vm.saveNewLink = saveNewLink;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var promises = [getResources(vm.programId, vm.mediaType)];
            return $q.all(promises).then(function() {
            });
        }

        function getResources(id, mediaType) {
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
                template: '<p>Would you like to Delete the Resource?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                dataservice.deleteProgramMedia(id).then(function(data) {
                    logger.success('Deleted Resource ' + data.Id);
                    getResources(vm.programId, vm.mediaType);
                });
            }, function() {
                // Do Nothing
            });
        }

        var options = {
            template: 'app/resource/resource.createLink.html'
        };

        function saveNewLink(link) {
            if (link) {
                dataservice.createProgramMediaLink(vm.mediaType, {CoachingProgramId: vm.programId, Link: link}).then(function (data) {
                    logger.success('Link Added Successfully! Refreshing Resources ...');
                    getResources(vm.programId, vm.mediaType);
                });
            } else {
                ngDialog.openConfirm(options)
                    .then(saveNewLink);
            }
        };

        function addLink(id, ev) {
            ngDialog.openConfirm(options)
                .then(saveNewLink);
        }

    }
})();
