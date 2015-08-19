(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramListController', ProgramListController);

    ProgramListController.$inject = ['$q', 'dataservice', 'logger', 'moment', 'authservice', '$state'];
    function ProgramListController($q, dataservice, logger, moment, authservice, $state) {
        var vm = this;
        vm.programs = [];
        vm.sessions = [];
        vm.title = 'Coaching Programs';
        vm.authData = authservice.authData;

        activate();

        function activate() {
            var promises = [listPrograms(), listSessions()];
            return $q.all(promises).then(function() {
                if (!vm.authData.isCoach) {
                    $state.go('program', {programId: vm.programs[0]});
                }
            });
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
