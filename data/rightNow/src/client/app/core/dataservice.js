(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, logger) {
        var service = {
            //apiurl: '', // prod
            apiurl: 'http://rightnow.muchmedia.com.au', // stage
            // apiurl: 'http://localhost:54141', // dev
            login: login,
            logout: logout,
            getUserInfo: getUserInfo,
            getPrograms: getPrograms,
            getProgram: getProgram,
            getAssignments: getAssignments,
            getLearningPlan: getLearningPlan,
            putLearningPlan: putLearningPlan,
            getSessions: getSessions,
        };

        return service;

        function login(loginData) {
            var url = service.apiurl + '/Token';
            var data = 'grant_type=password&username=' +
                loginData.userName + '&password=' + loginData.password;
            var header = {'Content-Type': 'application/x-www-form-urlencoded'};

            var deferred = $q.defer();

            $http.post(url, data, {
                headers: header
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function logout() {
            var url = service.apiurl + '/api/account/Logout';
            return $http.post(url);
        }

        function getUserInfo() {
            return $http.get(service.apiurl + '/api/account/userinfo');
        }

        function getPrograms() {
            return $http.get(service.apiurl + '/api/programs')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for programs failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function getProgram(id) {
            return $http.get(service.apiurl + '/api/programs/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for program ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function getAssignments(id) {
            return $http.get(service.apiurl + '/api/assignments?programid=' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for program ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function getSessions() {
            return $http.get(service.apiurl + '/api/sessions')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for sessions failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function getLearningPlan(id) {
            return $http.get(service.apiurl + '/api/learningplan/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for learning plan ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function putLearningPlan(id, learningPlanData) {
            var url = service.apiurl + '/api/learningplan/' + id;
            var data = learningPlanData;

            var deferred = $q.defer();

            $http.put(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }
})();
