(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('menuservice', menuservice);

    menuservice.$inject = ['$q'];

    function menuservice($q) {

        var service = {
            isProgramAware: false
        };

        return service;

    }
})();
