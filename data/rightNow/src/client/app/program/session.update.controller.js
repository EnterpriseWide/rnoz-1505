(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramSessionUpdateController', ProgramSessionUpdateController);
    ProgramSessionUpdateController.$inject = ['logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', 'moment'];

    function ProgramSessionUpdateController(logger, authservice, $state, $stateParams, $q, dataservice, moment) {
        var vm = this;
        vm.title = 'Update Session';
        vm.data = {};
        vm.authData = authservice.authData;
        vm.save = save;
        vm.programId = $stateParams.programId;
        vm.sessionId = $stateParams.sessionId;
        vm.durations = [30, 45, 60, 90];
        vm.finishTime = finishTime;
        vm.sessions = [];
        vm.selectDate = selectDate;

        activate();

        function activate() {
            var promises = [getSession(vm.sessionId)];
            return $q.all(promises);
        }

        function getSession(id) {
            return dataservice.readSession(id).then(function (data) {
                vm.data = data;
                getSessions(data.StartedAt);
            });
        }

        function selectDate() {
            var mydate = moment(vm.data.StartedAt);
            return dataservice.listSessionsByDate(mydate.toISOString()).then(function (data) {
                vm.sessions = data;
            });
        }

        function getSessions(date) {
            return dataservice.listSessionsByDate(date).then(function (data) {
                vm.sessions = data;
            });
        }

        function finishTime (session) {
            var finishedAt = moment(session.StartedAt);
            return finishedAt.add(session.Duration, 'm').toDate();
        }

        function save() {
            dataservice.updateSession(vm.sessionId, vm.data).then(function (data) {
                logger.info('Session Updated`');
                $state.go('program', {programId: vm.programId});
            });
        }

    }
})();
