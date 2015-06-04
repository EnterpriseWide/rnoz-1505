(function () {
    'use strict';

    angular
        .module('app.learningplan')
        .controller('LearningPlanController', LearningPlanController);
    LearningPlanController.$inject = ['logger', '$stateParams', '$q', 'dataservice', 'authservice'];

    function LearningPlanController(logger, $stateParams, $q, dataservice, authservice) {
        var vm = this;
        vm.title = 'Learning Plan';
        vm.data = [];
        vm.authData = authservice.authData;
        vm.save = save;
        vm.apiurl = dataservice.apiurl;
        vm.screenconfig = {
            BodyText: '<p>Description and instructions about the learning plan eg. This document is created over the course of your coaching program - both you and your coach can edit it ,export it to PDF, email a copy etc.</p><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula engaettoqduTpeu:leantgrilsTrns7:g CnLiirds°c"s parturient montes, nascetur ridiculus mus. </p><p>Pomp quoin fais, ultricies nec, pellentesque eu,pretium quis, sem. Nulla consequat mosso quis enim. Donec pede justo, fringilla vet aliquet nec, vulputate eget arcu. In enim justo,rhoncus ut, imperdiet a,venenatis vitae, just</p>'
        };

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var promises = [getLearningPlan(vm.programId)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getLearningPlan(id) {
            return dataservice.readLearningPlan(id).then(function (data) {
                vm.data = data;
                return vm.data;
            });
        }

        function save() {
            dataservice.updateLearningPlan(vm.data.Id, vm.data).then(function (data) {
                logger.info('Learning Plan Saved');
            });
        }

    }
})();
