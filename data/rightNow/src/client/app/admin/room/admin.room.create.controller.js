(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminRoomCreateController', AdminRoomCreateController);
    AdminRoomCreateController.$inject = ['authData', 'logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', 'moment'];

    function AdminRoomCreateController(authData, logger, authservice, $state, $stateParams, $q, dataservice, moment) {
        var vm = this;
        vm.title = 'Add New Room';
        vm.data = {};
        vm.authData = authservice.authData;
        vm.save = save;

        activate();

        function activate() {
        }

        function save() {
            vm.data.CreatedAt = moment().toISOString();
            vm.data.UpdatedAt = moment().toISOString();
            dataservice.createRoom(vm.data).then(function (data) {
                logger.info('Room Created');
                $state.go('admin');
            });
        }

    }
})();
