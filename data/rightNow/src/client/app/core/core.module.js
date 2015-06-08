(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate',
            'ngMaterial',
            'ngSanitize',
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'ui.router',
            'ngplus',
            'LocalStorageModule',
            'textAngular',
            'ngFileUpload',
            'ngMdIcons'
        ]);
})();
