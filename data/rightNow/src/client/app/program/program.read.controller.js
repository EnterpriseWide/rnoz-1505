/*jshint -W072 */
(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramReadController', ProgramReadController);
    ProgramReadController.$inject = ['program', 'logger', '$stateParams', '$q', 'dataservice', 'authservice', 'ngDialog', '$state', '$window', 'moment', '$timeout', '$scope', 'deviceDetector'];
    function ProgramReadController(program, logger, $stateParams, $q, dataservice, authservice, ngDialog, $state, $window, moment, $timeout, $scope, deviceDetector) {
        var vm = this;
        vm.title = 'Program Dashboard';
        vm.data = {};
        vm.openSendInvoice = openSendInvoice;
        vm.closeProgram = closeProgram;
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
            bodyTextSessions: '<p>Read more information about Sessions here</p>',
            bodyTextSurveys: '<p>More text explaining surveys to go here.</p>',
            bodyTextSessionIntroCoachee: '<p>This is a list of video coaching sessions that your coach has scheduled. When a session is due to start, a \'begin session\' button will appear next to the session in the list. Click this button to begin the session, and then <em>right.<strong>now.</strong></em> will launch the WebEx meeting room in a new browser tab/window. Enter your name & email address when prompted and then the meeting room video software will launch.</p>',
            bodyTextSessionIntroCoach: '<p>This is a list of video coaching sessions that you have scheduled with your coachee. When a session is due to start, a \'begin session\' button will appear next to the session in the list. Click this button to begin the session, and then <em>right.<strong>now.</strong></em> will launch the WebEx meeting room in a new browser tab/window. Enter your name & email address when prompted and then the meeting room video software will launch.</p>',
            bodyTextSessionIntroAndroid: '<p>Please install the <a href="https://play.google.com/store/apps/details?id=com.cisco.webex.meetings&hl=en" target="_blank">WebEx Meetings Android app</a> to participate in video coaching sessions on your mobile device.</p>',
            bodyTextSessionIntroIos: '<p>Please install the <a href="https://itunes.apple.com/au/app/cisco-webex-meetings/id298844386" target="_blank">WebEx Meetings iOS app</a> to participate in video coaching sessions on your mobile device.</p>'
        };
        vm.beginSession = beginSession;
        vm.cancelSession = cancelSession;
        vm.setAsComplete = setAsComplete;
        vm.beginSessionOnTimeout = beginSessionOnTimeout;
        vm.setTheTimeout = setTheTimeout;
        vm.buttonTimeout = {};
        vm.deviceDetector = deviceDetector;

        activate();

        function activate() {
            if (!program) {
                $state.go('404');
            } else {
                vm.data = program;
                vm.apiurl = dataservice.apiurl;
                vm.authData = authservice.authData;
                vm.beginSessionOnTimeout();
                vm.showMobileLink = deviceDetector.os === 'ios' || deviceDetector.os === 'android';
            }
        }

        function setTheTimeout (scope, fn, delay) {
            var promise = $timeout(fn, delay);
            var deregister = scope.$on('$destroy', function() {
                $timeout.cancel(promise);
            });
            promise.then(deregister);
        }

        function beginSessionOnTimeout () {
            angular.forEach(vm.data.CoachingSessions, function (row) {
                row.showButton = moment().isAfter(moment(row.StartedAt).subtract(5, 'm')) &&
                    moment().isBefore(moment(row.FinishedAt));
            });
            vm.setTheTimeout($scope, vm.beginSessionOnTimeout, 2000);
        }

        function cancelSession (session) {
            ngDialog.openConfirm({
                template: '<p>Would you like to Cancel the Session?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="btn btn-blue" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="btn btn-blue" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                dataservice.deleteSession(session.Id).then(function() {
                    session.isDeleted = true;
                    logger.success('Session Cancelled');
                });
            });
        }

        function setAsComplete (session) {
            ngDialog.openConfirm({
                template: '<p>Would you like to set the Session as Complete?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="btn btn-blue" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="btn btn-blue" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                dataservice.updateSessionAsClosed(session.Id).then(function(data) {
                    session.IsClosed = true;
                    logger.success('Session set to Completed');
                });
            });
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
