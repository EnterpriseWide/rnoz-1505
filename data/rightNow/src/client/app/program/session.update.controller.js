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

        activate();

        function activate() {
            var promises = [getSession(vm.sessionId)];
            return $q.all(promises);
        }

        function getSession(id) {
            return dataservice.readSession(id).then(function (data) {
                vm.data = data;
            });
        }

        function finishTime (session) {
            var finishedAt = moment(session.StartedAt);
            return finishedAt.add(session.Duration, 'm').toDate();
        }

        function save() {
            dataservice.updateSession(vm.sessionId, vm.data).then(function (data) {
                logger.info('Session ' + vm.sessionId + ' Updated`');
                $state.go('program', {programId: vm.programId});
            });
        }

    }
})();
