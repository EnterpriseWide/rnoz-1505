(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramReadController', ProgramReadController);
    ProgramReadController.$inject = ['logger', '$stateParams', '$q', 'dataservice', 'authservice', 'ngDialog'];
    function ProgramReadController(logger, $stateParams, $q, dataservice, authservice, ngDialog) {
        var vm = this;
        vm.title = 'Program';
        vm.data = {};
        vm.sendInvoice = sendInvoice;
        vm.closeProgram = closeProgram;
        vm.screenconfig = {
            bodyTextYourCoach: '<p>Read more information about your coach, or send them a ' +
                'message</p>',
            bodyTextLearningPlan: '<p>This document is created over teh course of your coaching ' +
                'program - both you and your coach can edit it, export it or email a copy.</p>',
            bodyTextAssignments: '<p>These assignments are specified by your coach and are ' +
                'updated over the course of your coaching program.</p>',
            bodyTextResources: '<p>Read more information about Resources here</p>',
            bodyTextUploads: '<p>Read more information about Uploads here</p>',
            bodyTextSessions: '<p>Read more information about Sessionshere</p>',
            bodyTextSurveys: '<p>Read more information about surveys here</p>'
        };

        activate();

        function activate() {
            var id = $stateParams.programId;
            var promises = [readProgram(id)];
            vm.authData = authservice.authData;
            return $q.all(promises).then(function() {
            });
        }

        function readProgram(id) {
            return dataservice.readProgram(id).then(function (data) {
                vm.data = data;
            });
        }

        function sendInvoice(ev) {
            ngDialog.openConfirm({
                template: '<p>Are you sure?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                logger.error('Send Invoice Not Implemented Yet ' + vm.data.Id);
            }, function() {
                // Do Nothing
            });
        }

        function closeProgram(ev) {
            ngDialog.openConfirm({
                template: '<p>Are you sure?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                logger.error('Close Program Not Implemented Yet ' + vm.data.Id);
            }, function() {
                // Do Nothing
            });
        }
    }
})();
