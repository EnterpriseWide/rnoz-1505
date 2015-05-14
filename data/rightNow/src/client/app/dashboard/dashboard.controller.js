(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.messageCount = 0;
        vm.programs = [];
        vm.sessions = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getMessageCount(), getPrograms(), getSessions()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getSessions() {
            return dataservice.getSessions().then(function (data) {
                vm.sessions = data;
                return vm.sessions;
            });
        }

        function getPrograms() {
            return dataservice.getPrograms().then(function (data) {
                vm.programs = data;
                return vm.programs;
            });
        }
    }
})();
