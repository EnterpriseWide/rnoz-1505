(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);
    AdminController.$inject = ['authData', 'logger', '$location', 'dataservice', '$q', '$scope'];

    function AdminController(authData, logger, $location, dataservice, $q, $scope) {
        var vm = this;
        vm.title = 'Admin Dashboard';
        vm.authData = authData;
        vm.programGridOptions = {};
        vm.roomGridOptions = {};
        vm.programs = [];
        vm.rooms = [];
        vm.programPaginationOptions = {pageNumber: 1, pageSize: 25, sort: null};
        vm.roomPaginationOptions = {pageNumber: 1, pageSize: 25, sort: null};
        vm.programGridOptions = {
            enableSorting: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: vm.programPaginationOptions.pageSize,
            useExternalPagination: true,
            useExternalSorting: true,
            columnDefs: [
                {displayName: 'Coach', field: 'Coach.LastName', type: 'string'},
                {displayName: '', field: 'Coach.FirstName', type: 'string'},
                {displayName: 'Coachee', field: 'Coachee.LastName', type: 'string'},
                {displayName: '', field: 'Coachee.FirstName', type: 'string'},
                {displayName: 'Date Created', field: 'CreatedAt', cellFilter: 'date', type: 'date'},
                {field: 'IsClosed', type: 'boolean'},
                {field: 'InvoiceAmount', cellFilter: 'currency', type: 'number'},
                {displayName: '', field: 'Id', enableColumnMenu: false, enableSorting: false, cellTemplate: '<div class="ui-grid-cell-contents align-center"><a ui-sref="adminProgramUpdate({programId: {{COL_FIELD}}})" class="grid-link"><span class="icon icon-edit"></span>&nbsp;Edit</a></div>', type: 'number'}
            ],
            onRegisterApi: function(gridApi) {
                $scope.programGridApi = gridApi;
                $scope.programGridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length === 0) {
                        vm.programPaginationOptions.sort = null;
                    } else {
                        vm.programPaginationOptions.sort = '';
                        angular.forEach(sortColumns, function (row) {
                            vm.programPaginationOptions.sort += row.field;
                            vm.programPaginationOptions.sort += ' ';
                            vm.programPaginationOptions.sort += row.sort.direction;
                            vm.programPaginationOptions.sort += ',';
                        });
                    }
                    getPagePrograms();
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.programPaginationOptions.pageNumber = newPage;
                    vm.programPaginationOptions.pageSize = pageSize;
                    getPagePrograms();
                });
            }
        };

        vm.roomGridOptions = {
            enableSorting: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: vm.roomPaginationOptions.pageSize,
            useExternalPagination: true,
            useExternalSorting: true,
            columnDefs: [
                {field: 'Name', type: 'string'},
                {field: 'UserName', type: 'string'},
                {field: 'Password', type: 'string'},
                {field: 'Link', type: 'string'},
                {displayName: '', field: 'Id', enableColumnMenu: false, enableSorting: false, cellTemplate: '<div class="ui-grid-cell-contents align-center"><a ui-sref="adminRoomUpdate({programId: {{COL_FIELD}}})" class="grid-link"><span class="icon icon-edit"></span>&nbsp;Edit</a></div>', type: 'number'}
            ],
            onRegisterApi: function(gridApi) {
                $scope.roomGridApi = gridApi;
                $scope.roomGridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length === 0) {
                        vm.roomPaginationOptions.sort = null;
                    } else {
                        vm.roomPaginationOptions.sort = '';
                        angular.forEach(sortColumns, function (row) {
                            vm.roomPaginationOptions.sort += row.field;
                            vm.roomPaginationOptions.sort += ' ';
                            vm.roomPaginationOptions.sort += row.sort.direction;
                            vm.roomPaginationOptions.sort += ',';
                        });
                    }
                    getPageRooms();
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.roomPaginationOptions.pageNumber = newPage;
                    vm.roomPaginationOptions.pageSize = pageSize;
                    getPageRooms();
                });
            }
        };

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $location.path('/404');
            }
            getPagePrograms();
            getPageRooms();
        }

        function getPagePrograms() {
            return dataservice.listProgramsForAdmin(vm.programPaginationOptions)
                .then(function (data) {
                    vm.programGridOptions.totalItems = data.TotalItems;
                    vm.programGridOptions.data = data.Items;
                });
        }

        function getPageRooms() {
            return dataservice.listRoomsForAdmin(vm.roomPaginationOptions)
                .then(function (data) {
                    vm.roomGridOptions.totalItems = data.TotalItems;
                    vm.roomGridOptions.data = data.Items;
                });
        }

    }
})();
