(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminRoomUpdateController', AdminRoomUpdateController);
    AdminRoomUpdateController.$inject = ['logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', 'ngDialog'];

    function AdminRoomUpdateController(logger, authservice, $state, $stateParams, $q, dataservice, ngDialog) {
        var vm = this;
        vm.title = 'Update Room';
        vm.data = {};
        vm.authData = authservice.authData;
        vm.save = save;
        vm.deleteRecord = deleteRecord;
        vm.getRoom = getRoom;

        activate();

        function activate() {
            vm.roomId = $stateParams.roomId;
            var promises = [getRoom(vm.roomId)];
            return $q.all(promises);
        }

        function getRoom(id) {
            return dataservice.readRoom(id).then(function (data) {
                vm.data = data.Item;
                vm.isUsed = data.UsageCount > 0;
            });
        }

        function save() {
            dataservice.updateRoom(vm.data.Id, vm.data).then(function (data) {
                logger.info('Room Updated');
                $state.go('admin');
            });
        }

        function deleteRecord() {
            ngDialog.openConfirm({
                template: '<p>Would you like to Delete the Room?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="btn btn-blue" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="btn btn-blue" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                dataservice.deleteRoom(vm.roomId).then(function(data) {
                    logger.success('Deleted Room ' + data.Id);
                    $state.go('admin');
                });
            });
        }

    }
})();
