(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);
    dataservice.$inject = ['$http', '$q', 'logger'];
    function dataservice($http, $q, logger) {
        var service = {
            apiurl: '', // prod
            // apiurl: 'http://rightnow.muchmedia.com.au', // stage
            // apiurl: 'http://localhost:54141', // dev
            login: login,
            logout: logout,

            readUserInfo: readUserInfo,
            updateUserInfo: updateUserInfo,

            closeProgram: closeProgram,
            readProgram: readProgram,
            listPrograms: listPrograms,

            createAssignment: createAssignment,
            readAssignment: readAssignment,
            updateAssignment: updateAssignment,
            deleteAssignment: deleteAssignment,
            listAssignments: listAssignments,

            readLearningPlan: readLearningPlan,
            updateLearningPlan: updateLearningPlan,
            createLearningPlanEmail: createLearningPlanEmail,

            listSessions: listSessions,

            createProgramMediaLink: createProgramMediaLink,
            readProgramMedia: readProgramMedia,
            updateProgramMedia: updateProgramMedia,
            deleteProgramMedia: deleteProgramMedia,
            listProgramMedias: listProgramMedias,

            sendEmailToTheCoach: sendEmailToTheCoach,
            sendEmailToTheCoachee: sendEmailToTheCoachee
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
            var deferred = $q.defer();
            $http.post(url).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function readUserInfo() {
            var deferred = $q.defer();
            $http.get(service.apiurl + '/api/account/userinfo')
                .then(success)
                .catch(fail);
            return deferred.promise;
            function success(response) {
                deferred.resolve(response);
            }
            function fail(error) {
                var msg = 'query for userinfo failed. ' + error.data.description;
                logger.error(msg);
                deferred.reject(msg);
            }
        }

        function updateUserInfo(data) {
            var url = service.apiurl + '/api/account/userinfo';
            var deferred = $q.defer();
            $http.put(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                var msg = 'update for profile failed. ' + error.Message;
                logger.error(msg);
                deferred.reject(error.Message);
            });
            return deferred.promise;
        }

        function listPrograms() {
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

        function closeProgram(id) {
            var url = service.apiurl + '/api/programs/close?id=' + id;
            var deferred = $q.defer();
            $http.put(url).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function readProgram(id) {
            return $http.get(service.apiurl + '/api/programs/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for assignment ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function createAssignment(data) {
            return $http.post(service.apiurl + '/api/assignments', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'creation of a new assignment for program ' + data.CoachingProgramId + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function readAssignment(id) {
            return $http.get(service.apiurl + '/api/assignments/' + id + '/')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for assignment ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function updateAssignment(id, data) {
            var url = service.apiurl + '/api/assignments/' + id;

            var deferred = $q.defer();

            $http.put(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                var msg = 'update for assignment ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function deleteAssignment(id) {
            return $http.delete(service.apiurl + '/api/assignments/' + id + '/')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'delete for assignment ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function listAssignments(id) {
            return $http.get(service.apiurl + '/api/assignments?programid=' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for assignments for program id ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function listSessions() {
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

        function readLearningPlan(id) {
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

        function updateLearningPlan(id, data) {
            var url = service.apiurl + '/api/learningplan/' + id;

            var deferred = $q.defer();

            $http.put(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function createLearningPlanEmail(id, data) {
            return $http.post(service.apiurl + '/api/learningplan/' + id, data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'creation of learning plan email for ' + data.recipients + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function createProgramMediaLink(mediaType, data) {
            return $http.post(service.apiurl + '/api/ProgramMedia/AddLink?mediaType=' + mediaType, data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'Adding Link for ' + data.Link + ' failed. ' + error.Message;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function readProgramMedia(id, mediaType) {
            return $http.get(service.apiurl + '/api/ProgramMedia/' + id + '?mediaType=' + mediaType)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for ProgramMedia ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function updateProgramMedia(id, data) {
            var url = service.apiurl + '/api/ProgramMedia/' + id;

            var deferred = $q.defer();

            $http.put(url, data)
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (error, status) {
                    logger.error(error.Message);
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function deleteProgramMedia(id) {
            return $http.delete(service.apiurl + '/api/ProgramMedia/' + id + '/')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'delete for ProgramMedia ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function listProgramMedias(id, mediaType) {
            return $http.get(service.apiurl + '/api/ProgramMedia?programid=' + id + '&mediatype=' + mediaType)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for resources for program id ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function sendEmailToTheCoach(data) {
            return $http.post(service.apiurl + '/api/SendEmail/ToTheCoach/', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'creation of a new email for program ' + data.Id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function sendEmailToTheCoachee(data) {
            return $http.post(service.apiurl + '/api/SendEmail/ToTheCoachee/', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'creation of a new email for program ' + data.Id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

    }
})();
