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
            isCoach: false,
            userName: '',
            userRetrieved: false,
            FirstName: '',
            LastName: '',
            Email: '',
            Roles: []
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
            $q.all(dataservice.logout())
            .then(function() {
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
            authData.FirstName = '';
            authData.LastName = '';
            authData.Email = '';
            authData.Phone = '';
            authData.Company = '';
            authData.Position = '';
            authData.CoachingExperience = '';
            authData.WorkExperience = '';
            authData.Roles.slice(0, authData.Roles.length);
            authData.isAdmin = false;
            authData.isCoach = false;
        }

        function fillData() {
            var data = localStorageService.get('authorizationData');
            if (data) {
                authData.userRetrieved = false;
                authData.isAuthenticated = true;
                authData.token = data.token;
                authData.userName = data.userName;
                if (!authData.userRetrieved) {
                    return dataservice.readUserInfo().then(function(result) {
                        authData.userRetrieved = true;
                        angular.extend(authData, result.data);
                        authData.isAdmin = authData.Roles.indexOf('Admin') >= 0;
                        authData.isCoach = authData.Roles.indexOf('Coach') >= 0;
                    });
                }
            }
            return $q.when(true);
        }
    }
})();
