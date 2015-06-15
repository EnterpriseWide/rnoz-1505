(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramReadController', ProgramReadController);
    ProgramReadController.$inject = ['logger', '$stateParams', '$q', 'dataservice', 'authservice', 'ngDialog'];
    function ProgramReadController(logger, $stateParams, $q, dataservice, authservice, ngDialog) {
        var vm = this;
        vm.title = 'Program Dashboard';
        vm.data = {};
        vm.sendInvoice = sendInvoice;
        vm.closeProgram = closeProgram;
        vm.sessionInfoReadMore = sessionInfoReadMore;
        vm.screenconfig = {
            bodyTextYourCoach: '<p>Read more information about your coach, or send them a ' +
                'message</p>',
            bodyTextYourCoachee: '<p>Read more information about your coachee, or send them a ' +
                'message</p>',
            bodyTextLearningPlan: '<p>This document is created over the course of your coaching ' +
                'program - both you and your coach can edit it. You can also export it as a PDF or email it to another person.</p>',
            bodyTextAssignments: '<p>These assignments are specified by your coach and are ' +
                'updated over the course of your coaching program.</p>',
            bodyTextResources: '<p>Resources are files and links that have been added by your coach.</p>',
            bodyTextUploads: '<p>Uploads are files and links that are added by you for your coach to view.</p>',
            bodyTextSessions: '<p>Read more information about Sessionshere</p>',
            bodyTextSurveys: '<p>More text explaining surveys to go here.</p>'
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
                        '<button type="button" class="btn btn-blue" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="btn btn-blue" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                logger.error('Send Invoice Not Implemented Yet ' + vm.data.Id);
            }, function() {
                // Do Nothing
            });
        }

        function sessionInfoReadMore(ev) {
            ngDialog.open({
                template: '<div class="content-text-area"><h1><span class="icon icon-forum"></span>&nbsp;Coaching Sessions</h1><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p><p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p><p>Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.</p></div>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="btn btn-blue" ng-click="closeThisDialog(0)">Close</button>' +
                    '</div>',
                plain: true
            });
        }

        function closeProgram(ev) {
            ngDialog.openConfirm({
                template: '<p>Are you sure?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="btn btn-blue" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="btn btn-blue" ng-click="confirm(1)">Yes</button>' +
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
