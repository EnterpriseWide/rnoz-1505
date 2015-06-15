(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('menuservice', menuservice);

    menuservice.$inject = ['$q'];

    function menuservice($q) {

        var options = {
            programId: 0,
            isProgramAware: false,
            isOpen: false
        };

        var service = {
            options: options
        };

        return service;

    }
})();
