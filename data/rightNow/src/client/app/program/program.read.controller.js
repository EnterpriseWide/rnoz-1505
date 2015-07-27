(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramReadController', ProgramReadController);
    ProgramReadController.$inject = ['program', 'logger', '$stateParams', '$q', 'dataservice', 'authservice', 'ngDialog', '$state', '$window'];
    function ProgramReadController(program, logger, $stateParams, $q, dataservice, authservice, ngDialog, $state, $window) {
        var vm = this;
        vm.title = 'Program Dashboard';
        vm.data = {};
        vm.openSendInvoice = openSendInvoice;
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
        vm.beginSession = beginSession;
        vm.finishTime = finishTime;
        vm.cancelSession = cancelSession;
        vm.rescheduleSession = rescheduleSession;
        vm.setAsComplete = setAsComplete;

        activate();

        function activate() {
            if (!program) {
                $state.go('404');
            } else {
                vm.data = program;
            }
            vm.apiurl = dataservice.apiurl;
            vm.authData = authservice.authData;
        }

        function getSessionsByProgram(id) {
            return dataservice.listSessionsByProgram(Id).then(function (data) {
                vm.data.CoachingSessions = data;
            });
        }

        function cancelSession (session) {
            ngDialog.openConfirm({
                template: '<p>Would you like to Cancel the Session?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                dataservice.deleteSession(session.Id).then(function(data) {
                    logger.success('Canceled Session ' + session.Id);
                    listSessionsByProgram(session.CoachingProgramId);
                });
            });
        }

        function rescheduleSession (session) {
        }

        function setAsComplete (session) {
            ngDialog.openConfirm({
                template: '<p>Would you like to set the Session as Complete?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                session.SetAsComplete = true;
                dataservice.updateSession(session.Id, session).then(function(data) {
                    logger.success('Session ' + data.Id + 'set to Completed');
                    getProgram(vm.data.Id);
                });
            });
        }

        function finishTime (session) {
            var finishedAt = new moment(session.StartedAt);
            return finishedAt.add(session.Duration, 'm').toDate();
        }

        function beginSession() {
            $window.open(dataservice.apiurl + '/vidyo/?access_token=' + authservice.authData.token, '_blank', 'location=no,height=500,width=580,scrollbars=yes,status=yes');
        }

        var sendInvoiceOptions = {
            template: 'app/program/sendInvoice.html'
        };

        function sendInvoice(invoiceAmount) {
            if (invoiceAmount) {
                dataservice.createProgramInvoice(vm.data.Id, invoiceAmount).then(function (data) {
                    logger.success('Invoice Sent for ' + invoiceAmount);
                    vm.data.InvoiceAmount = invoiceAmount;
                });
            } else {
                ngDialog.openConfirm(sendInvoiceOptions)
                    .then(openSendInvoice);
            }
        }

        function openSendInvoice(ev) {
            ngDialog.openConfirm(sendInvoiceOptions)
                .then(sendInvoice);
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
                template: '<p>Are you sure that you want to close the program?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="btn btn-blue" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="btn btn-blue" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                dataservice.closeProgram(vm.data.Id).then(function() {
                    logger.success('Program Closed');
                    $state.go('programs');
                });
            });
        }
    }
})();
