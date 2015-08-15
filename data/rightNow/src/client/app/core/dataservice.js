/*jshint -W071 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);
    dataservice.$inject = ['$http', '$q', 'logger', '$rootScope'];
    function dataservice($http, $q, logger, $rootScope) {
        var service = {
            apiurl: '', // prod
            // apiurl: '//rightnow.muchmedia.com.au', // staging
            // apiurl: '//localhost:54141', // dev
            // apiurl: '//rightnow.oztrain.local', // dev

            login: login,
            logout: logout,
            forgotPassword: forgotPassword,

            readUserInfo: readUserInfo,
            updateUserInfo: updateUserInfo,

            createProgram: createProgram,
            closeProgram: closeProgram,
            readProgram: readProgram,
            updateProgram: updateProgram,
            deleteProgram: deleteProgram,
            listPrograms: listPrograms,
            listProgramsForAdmin: listProgramsForAdmin,

            createProgramInvoice: createProgramInvoice,

            createAssignment: createAssignment,
            readAssignment: readAssignment,
            updateAssignment: updateAssignment,
            deleteAssignment: deleteAssignment,
            listAssignments: listAssignments,

            readLearningPlan: readLearningPlan,
            updateLearningPlan: updateLearningPlan,
            createLearningPlanEmail: createLearningPlanEmail,

            listRoles: listRoles,

            createSession: createSession,
            readSession: readSession,
            updateSession: updateSession,
            deleteSession: deleteSession,
            listSessions: listSessions,
            listSessionsByProgram: listSessionsByProgram,
            listSessionsByDate: listSessionsByDate,

            createSurvey: createSurvey,
            readSurvey: readSurvey,
            updateSurvey: updateSurvey,
            deleteSurvey: deleteSurvey,
            listSurveysForAdmin: listSurveysForAdmin,
            listSurveys: listSurveys,
            listSurveysByProgram: listSurveysByProgram,

            createProgramMediaLink: createProgramMediaLink,
            readProgramMedia: readProgramMedia,
            updateProgramMedia: updateProgramMedia,
            deleteProgramMedia: deleteProgramMedia,
            listProgramMedias: listProgramMedias,

            createUser: createUser,
            readUser: readUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            listUsers: listUsers,
            listUsersForAdmin: listUsersForAdmin,

            sendEmailToTheCoach: sendEmailToTheCoach,
            sendEmailToTheCoachee: sendEmailToTheCoachee,

            createRoom: createRoom,
            readRoom: readRoom,
            updateRoom: updateRoom,
            deleteRoom: deleteRoom,
            listRooms: listRooms,
            listRoomsForAdmin: listRoomsForAdmin

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

        function forgotPassword(email) {
            return $http.post(service.apiurl + '/api/account/ForgotPassword?email=' + email)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'forgot Password failed to send. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
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
                if (!$rootScope.showSplash) {
                    logger.error(msg);
                }
                deferred.reject(msg);
            }
        }

        function updateUserInfo(data) {
            var url = service.apiurl + '/api/account/userinfo';
            var deferred = $q.defer();
            $http.put(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                var msg = 'update for profile failed.';
                logger.error(msg);
                deferred.reject(error.ModelState);
            });
            return deferred.promise;
        }

        function deleteProgram(id) {
            return $http.delete(service.apiurl + '/api/programs/' + id + '/')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'delete for program ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
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

        function listProgramsForAdmin(data) {
            return $http.get(service.apiurl + '/api/programs/ForAdmin?pageNumber=' + data.pageNumber +
                '&pageSize=' + data.pageSize +
                '&sort=' + data.sort)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                var msg = 'query for programs for Admin failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function createProgramInvoice(id, amount) {
            return $http.put(service.apiurl + '/api/programs/SendInvoice?id=' + id + '&amount=' + amount)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'creation of program invoice for ' + amount + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function createProgram(data) {
            return $http.post(service.apiurl + '/api/programs', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'creation of a new program failed. ' + error.data.description;
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
                var msg = 'query for program ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function updateProgram(id, data) {
            var url = service.apiurl + '/api/programs/' + id;

            var deferred = $q.defer();

            $http.put(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                var msg = 'update for program ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                deferred.reject(msg);
            });

            return deferred.promise;
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

        function createSurvey(data) {
            return $http.post(service.apiurl + '/api/surveys', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'creation of a new survey failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function readSurvey(id) {
            return $http.get(service.apiurl + '/api/surveys/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for survey ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function updateSurvey(id, data) {
            var url = service.apiurl + '/api/surveys/' + id;

            var deferred = $q.defer();

            $http.put(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                var msg = 'update for survey ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function deleteSurvey(id) {
            return $http.delete(service.apiurl + '/api/surveys/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'delete for survey ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function listSurveys() {
            return $http.get(service.apiurl + '/api/surveys')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for surveys failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function listSurveysByProgram(id) {
            return $http.get(service.apiurl + '/api/surveys?programid=' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for surveys for program id ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function listSurveysForAdmin(data) {
            return $http.get(service.apiurl + '/api/surveys/ForAdmin?pageNumber=' + data.pageNumber +
                '&pageSize=' + data.pageSize +
                '&sort=' + data.sort)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                var msg = 'query for surveys for Admin failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function createUser(data) {
            return $http.post(service.apiurl + '/api/users', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'creation of a new user failed.';
                logger.error(msg, '');
                return $q.reject(error.data.ModelState);
            }
        }

        function readUser(id) {
            return $http.get(service.apiurl + '/api/users/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for user ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function updateUser(id, data) {
            var url = service.apiurl + '/api/users/' + id;

            var deferred = $q.defer();

            $http.put(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                var msg = 'update for user ' + id + ' failed. ' + error.Message;
                logger.error(msg);
                return deferred.reject(error.ModelState);
            });
            return deferred.promise;
        }

        function deleteUser(id) {
            return $http.delete(service.apiurl + '/api/users/' + id + '/')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'delete for user ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function listUsersForAdmin(data) {
            return $http.get(service.apiurl + '/api/users/ForAdmin?pageNumber=' + data.pageNumber +
                '&pageSize=' + data.pageSize +
                '&sort=' + data.sort)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                var msg = 'query for users for Admin failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function listRoles() {
            return $http.get(service.apiurl + '/api/roles')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for roles failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function createSession(data) {
            return $http.post(service.apiurl + '/api/sessions', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'creation of a new session failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function readSession(id) {
            return $http.get(service.apiurl + '/api/sessions/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for session ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function updateSession(id, data) {
            var url = service.apiurl + '/api/sessions/' + id;

            var deferred = $q.defer();

            $http.put(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                var msg = 'update for session ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function deleteSession(id) {
            return $http.delete(service.apiurl + '/api/sessions/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'delete for session ' + id + ' failed. ' + error.data.description;
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

        function listSessionsByProgram(id) {
            return $http.get(service.apiurl + '/api/sessions/ByProgram?id=' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for sessions by program ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function listSessionsByDate(date) {
            return $http.get(service.apiurl + '/api/sessions/?date=' + date)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for sessions by date ' + date + ' failed. ' + error.data.description;
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

        function listUsers() {
            return $http.get(service.apiurl + '/api/users')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for users failed. ' + error.data.description;
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

        function createRoom(data) {
            return $http.post(service.apiurl + '/api/rooms', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'creation of a new room failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function readRoom(id) {
            return $http.get(service.apiurl + '/api/rooms/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for room ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function updateRoom(id, data) {
            var url = service.apiurl + '/api/rooms/' + id;

            var deferred = $q.defer();

            $http.put(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error, status) {
                var msg = 'update for room ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function deleteRoom(id) {
            return $http.delete(service.apiurl + '/api/rooms/' + id + '/')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'delete for room ' + id + ' failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function listRoomsForAdmin(data) {
            return $http.get(service.apiurl + '/api/rooms/ForAdmin?pageNumber=' + data.pageNumber +
                '&pageSize=' + data.pageSize +
                '&sort=' + data.sort)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                var msg = 'query for rooms for Admin failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function listRooms() {
            return $http.get(service.apiurl + '/api/rooms')
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(error) {
                var msg = 'query for rooms failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

    }
})();
