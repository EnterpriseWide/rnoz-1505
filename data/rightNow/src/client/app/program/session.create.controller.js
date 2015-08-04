(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramSessionCreateController', ProgramSessionCreateController);
    ProgramSessionCreateController.$inject = ['logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', 'moment'];

    function ProgramSessionCreateController(logger, authservice, $state, $stateParams, $q, dataservice, moment) {
        var vm = this;
        vm.title = 'Create New Session';
        vm.data = {};
        vm.authData = authservice.authData;
        vm.save = save;
        vm.programId = $stateParams.programId;
        vm.durations = [30, 45, 60, 90];
        vm.setStartedAt = setStartedAt;
        vm.isStartedAtHidden = true;
        vm.finishTime = finishTime;
        vm.sessions = [];
        vm.selectDate = selectDate;

        activate();

        function activate() {
            vm.data.Duration = 60;
            vm.data.StartedAt = moment().minute(0).add(1, 'h').toDate();
            vm.data.CoachingProgramId = vm.programId;
            getSessions(vm.data.StartedAt.toISOString());
        }

        function selectDate() {
            return dataservice.listSessionsByDate(vm.data.StartedAt.toISOString()).then(function (data) {
                vm.sessions = data;
            });
        }

        function getSessions(date) {
            return dataservice.listSessionsByDate(date).then(function (data) {
                vm.sessions.push.apply(vm.sessions, data);
            });
        }

        function finishTime (session) {
            var finishedAt = moment(session.StartedAt);
            return finishedAt.add(session.Duration, 'm').toDate();
        }

        function save() {
            vm.data.CreatedAt = moment().toISOString();
            vm.data.UpdatedAt = moment().toISOString();
            vm.data.RoomId = 1;
            dataservice.createSession(vm.data).then(function (data) {
                logger.info('Session Created');
                $state.go('program', {programId: vm.programId});
            });
        }

        function setStartedAt() {
            vm.isStartedAtHidden = true;
        }

    }
})();
