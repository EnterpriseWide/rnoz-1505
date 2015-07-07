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
            pageSize: 100,
            sort: null
        };

        activate();

        function activate() {
            $scope.gridOptions = {
                paginationPageSizes: [25, 50, 75],
                paginationPageSize: vm.paginationOptions.pageSize,
                useExternalPagination: true,
                useExternalSorting: true,
                columnDefs: [
                    { name: 'Coach2', field: 'Coach.FirstName' },
                    { name: 'Coach', field: 'Coach.FirstName' },
                    { name: 'Coachee', field: 'Coachee.FirstName' },
                    { name: 'Date Created', field: 'CreatedAt', cellFilter: 'date' },
                    { name: 'Is Closed', field: 'IsClosed' },
                    { name: 'InvoiceAmount', cellFilter: 'currency' },
                    { name: '', field: 'Id', enableColumnMenu: false, enableSorting: false, cellTemplate: '<div class="ui-grid-cell-contents"><a ui-sref="program({programId: {{COL_FIELD}}})" class="btn btn-small btn-flat btn-blue waves-button waves-effect"><span class="icon icon-edit"></span>&nbsp;Edit</a><a class="btn btn-small btn-flat btn-red waves-button waves-effect"><span class="icon icon-delete"></span>&nbsp;Delete</a></div>' }
                ],
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        paginationOptions.sort = null;
                    } else {
                        paginationOptions.sort = sortColumns[0].sort.direction;
                    }
                    getPagePrograms();
                  });
                  gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                      paginationOptions.pageNumber = newPage;
                      paginationOptions.pageSize = pageSize;
                      getPagePrograms();
                  });
                }
            };
            if (!vm.authData.isAdmin) {
                $location.path('/404');
            }
            getPagePrograms();
        }

        function getPagePrograms() {
            return dataservice.listPrograms()
                .then(function (data) {
                    $scope.gridOptions.totalItems = 100;
                    var firstRow = (vm.paginationOptions.pageNumber - 1) * vm.paginationOptions.pageSize;
                    $scope.gridOptions.data = data.slice(firstRow, firstRow + vm.paginationOptions.pageSize);
                });
        };

    }
})();
