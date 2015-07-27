(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramSessionCreateController', ProgramSessionCreateController);
    ProgramSessionCreateController.$inject = ['logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice'];

    function ProgramSessionCreateController(logger, authservice, $state, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Create New Session';
        vm.data = {};
        vm.authData = authservice.authData;
        vm.save = save;
        vm.programId = $stateParams.programId;
        vm.durations = [30, 45, 60, 90];
        vm.setStartedAt = setStartedAt;
        vm.isStartedAtHidden = true;

        activate();

        function activate() {
            vm.data.Duration = 60;
            vm.data.StartedAt = new moment().minute(0).add(1, 'h').toDate();
            vm.data.CoachingProgramId = vm.programId;
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
