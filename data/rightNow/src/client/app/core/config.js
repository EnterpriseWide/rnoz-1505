(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[rightNow Error] ',
        logo: '/images/logo.png',
        appTitle: 'right.now.',
        tagLine: 'Executive coaching program'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];

    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});
    }

})();
