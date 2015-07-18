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
        vm.gridOptions = {};
        vm.programs = [];
        vm.paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            sort: null,
        };
        vm.programGridOptions = {
            enableSorting: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: vm.paginationOptions.pageSize,
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
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length === 0) {
                        vm.paginationOptions.sort = null;
                    } else {
                        vm.paginationOptions.sort = '';
                        angular.forEach(sortColumns, function (row) {
                            vm.paginationOptions.sort += row.field;
                            vm.paginationOptions.sort += ' ';
                            vm.paginationOptions.sort += row.sort.direction;
                            vm.paginationOptions.sort += ',';
                        });
                    }
                    getPagePrograms();
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.paginationOptions.pageNumber = newPage;
                    vm.paginationOptions.pageSize = pageSize;
                    getPagePrograms();
                });
            }
        };

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $location.path('/404');
            }
            getPagePrograms();
        }

        function getPagePrograms() {
            return dataservice.listProgramsForAdmin(vm.paginationOptions)
                .then(function (data) {
                    vm.programGridOptions.totalItems = data.TotalItems;
                    vm.programGridOptions.data = data.Items;
                });
        }

    }
})();
