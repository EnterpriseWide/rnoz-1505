(function () {
    'use strict';

    angular
        .module('app')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', '$location', 'localStorageService'];

    function authInterceptor($q, $location, localStorageService) {

        var service = {
            request: request,
            responseError: responseError,
        };

        return service;

        function request(config) {
            config.headers = config.headers || {};
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }
            return config;
        }

        function responseError(error) {
            var loggedIn = false;
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                loggedIn = true;
            }
            //We only want to go to the login page if the user is not
            //logged in. If the user is logged in and they get a 401 is
            //because they don't have access to the resource requested.
            if (error.status === 401 && !loggedIn) {
                $location.path('/login').replace();
            }
            return $q.reject(error);
        }
    }

    angular.module('app')
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        }]);

})();
