(function() {
    'use strict';

    angular
        .module('app.upload')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'uploads',
                config: {
                    url: '/program/:programId/uploads/',
                    templateUrl: 'app/upload/upload.list.html',
                    controller: 'UploadListController',
                    controllerAs: 'vm',
                    title: 'Resources'
                }
            },
            {
                state: 'uploadRead',
                config: {
                    url: '/program/:programId/upload/:resourceId/',
                    templateUrl: 'app/upload/upload.read.html',
                    controller: 'UploadReadController',
                    controllerAs: 'vm',
                    title: 'View Upload'
                }
            },
            {
                state: 'uploadUpdate',
                config: {
                    url: '/program/:programId/upload/:resourceId/update/',
                    templateUrl: 'app/upload/upload.update.html',
                    controller: 'UploadUpdateController',
                    controllerAs: 'vm',
                    title: 'Update Upload'
                }
            }
        ];
    }
})();
