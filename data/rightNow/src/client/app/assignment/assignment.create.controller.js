(function () {
    'use strict';

    angular
        .module('app.assignment')
        .controller('AssignmentCreateController', AssignmentCreateController);
    AssignmentCreateController.$inject = ['logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice'];

    function AssignmentCreateController(logger, authservice, $state, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Add New Assignment';
        vm.data = {};
        vm.screenconfig = {
            BodyText: '<p>Description and instructions about the learning plan eg. This document is created over the course of your coaching program - both you and your coach can edit it ,export it to PDF, email a copy etc.</p><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula engaettoqduTpeu:leantgrilsTrns7:g CnLiirds°c"s parturient montes, nascetur ridiculus mus. </p><p>Pomp quoin fais, ultricies nec, pellentesque eu,pretium quis, sem. Nulla consequat mosso quis enim. Donec pede justo, fringilla vet aliquet nec, vulputate eget arcu. In enim justo,rhoncus ut, imperdiet a,venenatis vitae, just</p>'
        };
        vm.authData = authservice.authData;
        vm.save = save;

        activate();

        function activate() {
            vm.data.CoachingProgramId = $stateParams.programId;
        }

        function save() {
            dataservice.createAssignment(vm.data).then(function (data) {
                logger.info('Assignment Created');
                $state.go('assignments', {programId: vm.data.CoachingProgramId});
            });
        }

    }
})();
