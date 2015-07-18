(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminProgramUpdateController', AdminProgramUpdateController);
    AdminProgramUpdateController.$inject = ['authData', 'logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', '$location'];

    function AdminProgramUpdateController(authData, logger, authservice, $state, $stateParams, $q, dataservice, $location) {
        var vm = this;
        vm.title = 'Update Program';
        vm.data = {};
        vm.screenconfig = {
            BodyText: '<p>Description and instructions about the learning plan eg. This document is created over the course of your coaching program - both you and your coach can edit it ,export it to PDF, email a copy etc.</p><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula engaettoqduTpeu:leantgrilsTrns7:g CnLiirds°c"s parturient montes, nascetur ridiculus mus. </p><p>Pomp quoin fais, ultricies nec, pellentesque eu,pretium quis, sem. Nulla consequat mosso quis enim. Donec pede justo, fringilla vet aliquet nec, vulputate eget arcu. In enim justo,rhoncus ut, imperdiet a,venenatis vitae, just</p>'
        };
        vm.authData = authservice.authData;
        vm.save = save;
        vm.getProgram = getProgram;
        vm.UserLabel = userLabel;
        vm.users = [];
        vm.surveys = [];

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $location.path('/404');
            }
            vm.programId = $stateParams.programId;
            var promises = [getProgram(vm.programId), getUsers(), getSurveys()];
            return $q.all(promises);
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

        function userLabel(user) {
            return user.LastName + ', ' + user.FirstName;
        }

        function getProgram(id) {
            return dataservice.readProgram(id).then(function (data) {
                vm.data = data;
            });
        }

        function save() {
            dataservice.updateProgram(vm.data.Id, vm.data).then(function (data) {
                logger.info('Program Updated');
                $state.go('admin');
            });
        }

    }
})();
