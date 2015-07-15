(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminProgramCreateController', AdminProgramCreateController);
    AdminProgramCreateController.$inject = ['authData', 'logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', '$location'];

    function AdminProgramCreateController(authData, logger, authservice, $state, $stateParams, $q, dataservice, $location) {
        var vm = this;
        vm.title = 'Add New Program';
        vm.data = {
            surveyIds: []
        };
        vm.screenconfig = {
            BodyText: '<p>Description and instructions about the learning plan eg. This document is created over the course of your coaching program - both you and your coach can edit it ,export it to PDF, email a copy etc.</p><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula engaettoqduTpeu:leantgrilsTrns7:g CnLiirds°c"s parturient montes, nascetur ridiculus mus. </p><p>Pomp quoin fais, ultricies nec, pellentesque eu,pretium quis, sem. Nulla consequat mosso quis enim. Donec pede justo, fringilla vet aliquet nec, vulputate eget arcu. In enim justo,rhoncus ut, imperdiet a,venenatis vitae, just</p>'
        };
        vm.authData = authservice.authData;
        vm.save = save;
        vm.UserLabel = userLabel;
        vm.users = [];
        vm.surveys = [];

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $location.path('/404');
            }
            var promises = [getUsers(), getSurveys()];
            return $q.all(promises)
                .then(function() {
                });
        }

        function getUsers() {
            dataservice.listUsers()
                .then(function (data) {
                    vm.users = data;
                });
        }

        function getSurveys() {
            dataservice.listSurveys()
                .then(function (data) {
                    vm.surveys = data;
                });
        }

        function save() {
            dataservice.createProgram(vm.data).then(function (data) {
                logger.info('Program Created');
                $state.go('admin');
            });
        }

        function userLabel(user) {
            return user.LastName + ', ' + user.FirstName;
        }

    }
})();
