(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authservice', authservice);

    authservice.$inject = ['$q', 'dataservice', 'localStorageService', 'logger', '$state'];

    function authservice($q, dataservice, localStorageService, logger, $state) {

        var authData = {
            token: '',
            isAuthenticated: false,
            isAdmin: false,
            isCoach: false,
            userName: '',
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
            var deferred = $q.defer();
            dataservice.login(loginData)
                .then(function (result) {
                    localStorageService.set('authorizationData',
                    // jscs:disable
                    {token: result.access_token, userName: loginData.userName}); // jshint ignore:line
                    // jscs:enable
                    fillData()
                        .then(function() {
                            deferred.resolve();
                        });
                }, function (error) {
                    return deferred.reject(error);
                });
            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            dataservice.logout()
            .finally(function() {
                clearAuthStorage();
                deferred.resolve();
            });
            return deferred.promise;
        }

        function clearAuthStorage() {
            localStorageService.remove('authorizationData');
            authData.isAuthenticated = false;
            authData.userName = '';
            authData.FirstName = '';
            authData.LastName = '';
            authData.Email = '';
            authData.Phone = '';
            authData.Company = '';
            authData.Position = '';
            authData.WorkExperience = '';
            authData.Roles.slice(0, authData.Roles.length);
            authData.isAdmin = false;
            authData.isCoach = false;
        }

        function fillData() {
            var deferred = $q.defer();
            var data = localStorageService.get('authorizationData');
            if (data) {
                authData.token = data.token;
                authData.userName = data.userName;
                dataservice.readUserInfo()
                    .then(function(result) {
                        authData.isAuthenticated = true;
                        angular.extend(authData, result.data);
                        authData.isAdmin = authData.Roles.indexOf('Admin') >= 0;
                        authData.isCoach = authData.Roles.indexOf('Coach') >= 0;
                        deferred.resolve(authData);
                    });
            } else {
                deferred.resolve();
                $state.go('login');
            }
            return deferred.promise;
        }
    }
})();
