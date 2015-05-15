(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authservice', authservice);

    authservice.$inject = ['$q', 'dataservice', 'localStorageService', 'logger'];

    function authservice($q, dataservice, localStorageService, logger) {

        var authData = {
            token: '',
            isAuthenticated: false,
            isAdmin: false,
            userName: '',
            userRetrieved: false,
            firstName: '',
            lastName: '',
            email: '',
            roles: []
        };

        var service = {
            authData: authData,
            login: login,
            logout: logout,
            fillData: fillData
        };

        return service;

        function login(loginData) {
            return dataservice.login(loginData)
                .then(function (result) {
                    localStorageService.set('authorizationData',
                    // jscs:disable
                    {token: result.access_token, userName: loginData.userName}); // jshint ignore:line
                    // jscs:enable
                    fillData();
                    return result;
                }, function (error) {
                    return $q.reject(error);
                });
        }

        function logout() {
            dataservice.logout().then(function() {
                clearAuthStorage();
            }, function() {
                clearAuthStorage();
            });
        }

        function clearAuthStorage() {
            localStorageService.remove('authorizationData');
            authData.isAuthenticated = false;
            authData.userName = '';
            authData.userRetrieved = false;
            authData.firstName = '';
            authData.lastName = '';
            authData.email = '';
            authData.isAdmin = false;
            authData.roles.slice(0, authData.roles.length);
        }

        function fillData() {
            var data = localStorageService.get('authorizationData');
            if (data) {
                authData.isAuthenticated = true;
                authData.userName = data.userName;
                if (!authData.userRetrieved) {
                    return dataservice.getUserInfo().then(function(result) {
                        authData.userRetrieved = true;
                        var userData = result.data;
                        authData.email = userData.Email;
                        authData.roles = userData.Roles;
                        authData.firstName = userData.FirstName;
                        authData.lastName = userData.LastName;
                        authData.isAdmin = userData.IsAdmin;
                    });
                }
            }
            return $q.when(true);
        }
    }
})();