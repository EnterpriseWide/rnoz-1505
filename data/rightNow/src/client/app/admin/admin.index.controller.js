(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);
    AdminController.$inject = ['logger', '$location', 'dataservice', '$q', '$scope', 'deviceDetector', 'authservice'];

    function AdminController(logger, $location, dataservice, $q, $scope, deviceDetector, authservice) {
        var vm = this;
        vm.title = 'Admin Dashboard';
        vm.authData = authservice.authData;
        vm.programs = [];
        vm.surveys = [];
        vm.users = [];
        vm.showMobileLink = false;

        vm.programPaginationOptions = {pageNumber: 1, pageSize: 25, sort: null};
        vm.surveyPaginationOptions = {pageNumber: 1, pageSize: 25, sort: null};
        vm.userPaginationOptions = {pageNumber: 1, pageSize: 25, sort: null};

        vm.programGridOptions = {
            enableSorting: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: vm.programPaginationOptions.pageSize,
            useExternalPagination: true,
            useExternalSorting: true,
            columnDefs: [
                {field: 'Id', type: 'number'},
                {displayName: 'Coach', field: 'Coach.LastName', type: 'string'},
                {displayName: '', field: 'Coach.FirstName', type: 'string'},
                {displayName: 'Coachee', field: 'Coachee.LastName', type: 'string'},
                {displayName: '', field: 'Coachee.FirstName', type: 'string'},
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

        vm.surveyGridOptions = {
            enableSorting: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: vm.surveyPaginationOptions.pageSize,
            useExternalPagination: true,
            useExternalSorting: true,
            columnDefs: [
                {field: 'Name', type: 'string'},
                {field: 'Link', type: 'string'},
                {displayName: '', field: 'Id', enableColumnMenu: false, enableSorting: false, cellTemplate: '<div class="ui-grid-cell-contents align-center"><a ui-sref="adminSurveyUpdate({surveyId: {{COL_FIELD}}})" class="grid-link"><span class="icon icon-edit"></span>&nbsp;Edit</a></div>', type: 'number'}
            ],
            onRegisterApi: function(gridApi) {
                $scope.surveyGridApi = gridApi;
                $scope.surveyGridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length === 0) {
                        vm.surveyPaginationOptions.sort = null;
                    } else {
                        vm.surveyPaginationOptions.sort = '';
                        angular.forEach(sortColumns, function (row) {
                            vm.surveyPaginationOptions.sort += row.field;
                            vm.surveyPaginationOptions.sort += ' ';
                            vm.surveyPaginationOptions.sort += row.sort.direction;
                            vm.surveyPaginationOptions.sort += ',';
                        });
                    }
                    getPageSurveys();
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.surveyPaginationOptions.pageNumber = newPage;
                    vm.surveyPaginationOptions.pageSize = pageSize;
                    getPageSurveys();
                });
            }
        };

        vm.userGridOptions = {
            enableSorting: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: vm.userPaginationOptions.pageSize,
            useExternalPagination: true,
            useExternalSorting: true,
            columnDefs: [
                {field: 'FirstName', type: 'string'},
                {field: 'LastName', type: 'string'},
                {field: 'Email', type: 'string'},
                {displayName: '', field: 'Id', enableColumnMenu: false, enableSorting: false, cellTemplate: '<div class="ui-grid-cell-contents align-center"><a ui-sref="adminUserUpdate({userId: \'{{COL_FIELD}}\'})" class="grid-link"><span class="icon icon-edit"></span>&nbsp;Edit</a></div>', type: 'string'}
            ],
            onRegisterApi: function(gridApi) {
                $scope.userGridApi = gridApi;
                $scope.userGridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length === 0) {
                        vm.userPaginationOptions.sort = null;
                    } else {
                        vm.userPaginationOptions.sort = '';
                        angular.forEach(sortColumns, function (row) {
                            vm.userPaginationOptions.sort += row.field;
                            vm.userPaginationOptions.sort += ' ';
                            vm.userPaginationOptions.sort += row.sort.direction;
                            vm.userPaginationOptions.sort += ',';
                        });
                    }
                    getPageUsers();
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.userPaginationOptions.pageNumber = newPage;
                    vm.userPaginationOptions.pageSize = pageSize;
                    getPageUsers();
                });
            }
        };

        activate();

        function activate() {
            vm.showMobileLink = deviceDetector.os.ios || deviceDetector.os.android;
            getPagePrograms();
            getPageSurveys();
            getPageUsers();
        }

        function getPagePrograms() {
            return dataservice.listProgramsForAdmin(vm.programPaginationOptions)
                .then(function (data) {
                    vm.programGridOptions.totalItems = data.TotalItems;
                    vm.programGridOptions.data = data.Items;
                });
        }

        function getPageSurveys() {
            return dataservice.listSurveysForAdmin(vm.surveyPaginationOptions)
                .then(function (data) {
                    vm.surveyGridOptions.totalItems = data.TotalItems;
                    vm.surveyGridOptions.data = data.Items;
                });
        }

        function getPageUsers() {
            return dataservice.listUsersForAdmin(vm.userPaginationOptions)
                .then(function (data) {
                    vm.userGridOptions.totalItems = data.TotalItems;
                    vm.userGridOptions.data = data.Items;
                });
        }

    }
})();
