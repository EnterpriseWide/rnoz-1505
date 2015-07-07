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
            pageSize: 2,
            sort: null
        };

        activate();

        function activate() {
            vm.programGridOptions = {
                paginationPageSizes: [2, 25, 50, 75],
                paginationPageSize: vm.paginationOptions.pageSize,
                useExternalPagination: true,
                useExternalSorting: true,
                columnDefs: [
                    { name: 'Coach', field: 'getCoachName()', type: 'string' },
                    { name: 'Coachee', field: 'getCoacheeName()', type: 'string' },
                    { name: 'Date Created', field: 'CreatedAt', cellFilter: 'date', type: 'date' },
                    { name: 'Is Closed', field: 'IsClosed', type: 'boolean' },
                    { name: 'InvoiceAmount', cellFilter: 'currency', type: 'number' },
                    { name: '', field: 'Id', enableColumnMenu: false, enableSorting: false, cellTemplate: '<div class="ui-grid-cell-contents"><a ui-sref="program({programId: {{COL_FIELD}}})" class="btn btn-small btn-flat btn-blue waves-button waves-effect"><span class="icon icon-edit"></span>&nbsp;Edit</a><a class="btn btn-small btn-flat btn-red waves-button waves-effect"><span class="icon icon-delete"></span>&nbsp;Delete</a></div>', type: 'number'}
                ],
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if( sortColumns.length === 0 ) {
                        vm.paginationOptions.sort = null;
                    } else {
                        vm.paginationOptions.sort = sortColumns[0].name + ' ' + sortColumns[0].sort.direction;
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
            if (!vm.authData.isAdmin) {
                $location.path('/404');
            }
            getPagePrograms();
        }

        function getPagePrograms() {
            return dataservice.listProgramsForAdmin(vm.paginationOptions)
                .then(function (data) {
                    angular.forEach(data.Items, function(row){
                        row.getCoachName = function() {
                            return this.Coach.FirstName + ' ' + this.Coach.LastName;
                        };
                        row.getCoacheeName = function() {
                            return this.Coachee.FirstName + ' ' + this.Coachee.LastName;
                        };
                    });
                    vm.programGridOptions.totalItems = data.TotalItems;
                    vm.programGridOptions.data = data.Items;
                });
        };

    }
})();
