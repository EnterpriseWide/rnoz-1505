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
        vm.sessions = [];
        vm.rooms = [];
        vm.onDateChanged = onDateChanged;
        vm.onTimeChanged = onTimeChanged;
        vm.onDurationChanged = onDurationChanged;

        activate();

        function activate() {
            var promises = [getSession(vm.sessionId), getRooms()];
            return $q.all(promises);
        }

        function getRooms(date) {
            return dataservice.listRooms().then(function (data) {
                vm.rooms = data;
                vm.data.RoomId = data[0].Id;
            });
        }

        function getSession(id) {
            return dataservice.readSession(id).then(function (data) {
                vm.data = data;
                var diff = moment(vm.data.FinishedAt).diff(vm.data.StartedAt, 'minute');
                if (vm.durations.indexOf(diff))
                {
                    vm.data.Duration = diff;
                }
                getSessions(data.StartedAt);
            });
        }

        function save() {
            dataservice.updateSession(vm.sessionId, vm.data).then(function (data) {
                logger.info('Session Updated`');
                $state.go('program', {programId: vm.programId});
            });
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

        function getRooms(date) {
            return dataservice.listRooms().then(function (data) {
                vm.rooms = data;
                vm.data.RoomId = data[0].Id;
            });
        }

    }
})();
