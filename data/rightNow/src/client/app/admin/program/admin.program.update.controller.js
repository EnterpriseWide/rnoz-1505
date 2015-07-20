(function () {
    'use strict';

    angular
        .module('app.admin.program')
        .controller('AdminProgramUpdateController', AdminProgramUpdateController);
    AdminProgramUpdateController.$inject = ['authData', 'logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', 'ngDialog'];

    function AdminProgramUpdateController(authData, logger, authservice, $state, $stateParams, $q, dataservice, ngDialog) {
        var vm = this;
        vm.title = 'Update Program';
        vm.programId = $stateParams.programId;
        vm.data = {};
        vm.screenconfig = {
            BodyText: '<p>Description and instructions about the learning plan eg. This document is created over the course of your coaching program - both you and your coach can edit it ,export it to PDF, email a copy etc.</p><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula engaettoqduTpeu:leantgrilsTrns7:g CnLiirds°c"s parturient montes, nascetur ridiculus mus. </p><p>Pomp quoin fais, ultricies nec, pellentesque eu,pretium quis, sem. Nulla consequat mosso quis enim. Donec pede justo, fringilla vet aliquet nec, vulputate eget arcu. In enim justo,rhoncus ut, imperdiet a,venenatis vitae, just</p>'
        };
        vm.authData = authservice.authData;
        vm.save = save;
        vm.deleteRecord = deleteRecord;
        vm.getProgram = getProgram;
        vm.UserLabel = userLabel;
        vm.users = [];
        vm.surveys = [];

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $state.go('404');
            }
            var promises = [getProgram(vm.programId), getUsers(), getSurveys()];
            return $q.all(promises);
        }

        function deleteRecord() {
            ngDialog.openConfirm({
                template: '<p>Would you like to Delete the Program?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                dataservice.deleteProgram(vm.programId).then(function(data) {
                    logger.success('Deleted Program ' + data.Id);
                    $state.go('admin');
                });
            });
        }

        function getUsers() {
            dataservice.listUsers()
                .then(function (data) {
                    vm.users = data;
                });
        }

        function getSurveys() {
            dataservice.listSurveys()
                .then(function (data) {
                    vm.surveys = data;
                });
        }

        function userLabel(user) {
            return user.LastName + ', ' + user.FirstName;
        }

        function getProgram(id) {
            return dataservice.readProgram(id).then(function (data) {
                vm.data = data;
            });
        }

        function save() {
            dataservice.updateProgram(vm.data.Id, vm.data).then(function (data) {
                logger.info('Program Updated');
                $state.go('admin');
            });
        }

    }
})();
