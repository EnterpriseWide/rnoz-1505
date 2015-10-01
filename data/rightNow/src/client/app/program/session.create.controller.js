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
        vm.sessions = [];
        vm.onDateChanged = onDateChanged;
        vm.onTimeChanged = onTimeChanged;
        vm.onDurationChanged = onDurationChanged;

        activate();

        function activate() {
            var date = moment().add(1, 'h').startOf('hour').toISOString();
            vm.data.StartedAt = date;
            vm.data.Duration = 60;
            vm.data.CoachingProgramId = vm.programId;
            updateFinishedAt(vm.data.Duration);
            var promises = [getSessions(date)];
            return $q.all(promises);
        }

        function onDateChanged() {
            updateFinishedAt(vm.data.Duration);
            return dataservice.listSessionsByDate(moment(vm.data.StartedAt).toISOString()).then(function (data) {
                vm.sessions = data;
            });
        }

        function onTimeChanged() {
            updateFinishedAt(vm.data.Duration);
        }

        function onDurationChanged(newDuration) {
            updateFinishedAt(newDuration);
        }

        function updateFinishedAt(newDuration) {
            vm.data.FinishedAt = moment(vm.data.StartedAt).add(newDuration, 'minute').toISOString();
        }

        function getSessions(date) {
            return dataservice.listSessionsByDate(date).then(function (data) {
                vm.sessions = data;
            });
        }

        function save() {
            vm.data.CreatedAt = moment().toISOString();
            vm.data.UpdatedAt = moment().toISOString();
            vm.data.Sequence = 0;
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
