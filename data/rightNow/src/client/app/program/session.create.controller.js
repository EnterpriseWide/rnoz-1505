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
            var date = moment().utc().add(1, 'h').startOf('hour');
            vm.data.StartedAt = date.toISOString();
            vm.data.Duration = 60;
            vm.data.CoachingProgramId = vm.programId;
            getSessions(date.toISOString());
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
            vm.data.CreatedAt = moment().utc().toISOString();
            vm.data.UpdatedAt = moment().utc().toISOString();
            vm.data.RoomId = 1;
            vm.data.FinishedAt = moment().utc().add(vm.data.Duration, "minute").toISOString();
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
