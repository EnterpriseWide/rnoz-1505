(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramListController', ProgramListController);

    ProgramListController.$inject = ['$q', 'dataservice', 'logger', 'moment'];
    function ProgramListController($q, dataservice, logger, moment) {
        var vm = this;
        vm.programs = [];
        vm.sessions = [];
        vm.title = 'Coaching Programs';
        vm.finishTime = finishTime;

        activate();

        function activate() {
            var promises = [listPrograms(), listSessions()];
            return $q.all(promises).then(function() {
            });
        }

        function finishTime (session) {
            var finishedAt = moment(session.StartedAt);
            return finishedAt.add(session.Duration, 'm').toDate();
        }

        function listSessions() {
            return dataservice.listSessions().then(function (data) {
                vm.sessions = data;
                return vm.sessions;
            });
        }

        function listPrograms() {
            return dataservice.listPrograms().then(function (data) {
                vm.programs = data;
                return vm.programs;
            });
        }
    }
})();
