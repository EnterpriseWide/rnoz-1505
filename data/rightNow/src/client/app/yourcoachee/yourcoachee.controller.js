(function () {
    'use strict';

    angular
        .module('app.yourcoachee')
        .controller('YourCoacheeController', YourCoacheeController);
    YourCoacheeController.$inject = ['logger', '$stateParams', '$q', 'dataservice', 'authservice'];
    function YourCoacheeController(logger, $stateParams, $q, dataservice, authservice) {
        var vm = this;
        vm.title = 'Your Coachee';
        vm.data = {};
        vm.email = '';
        vm.authData = authservice.authData;
        vm.sendEmail = sendEmail;
        vm.screenconfig = {
            BodyText: '<p>Description and instructions about the learning plan eg. This document is created over the course of your coaching program - both you and your coach can edit it ,export it to PDF, email a copy etc.</p><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula engaettoqduTpeu:leantgrilsTrns7:g CnLiirds°c"s parturient montes, nascetur ridiculus mus. </p><p>Pomp quoin fais, ultricies nec, pellentesque eu,pretium quis, sem. Nulla consequat mosso quis enim. Donec pede justo, fringilla vet aliquet nec, vulputate eget arcu. In enim justo,rhoncus ut, imperdiet a,venenatis vitae, just</p>'
        };

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var promises = [getProgram(vm.programId)];
            return $q.all(promises).then(function() {
            });
        }

        function getProgram(id) {
            return dataservice.readProgram(id).then(function (data) {
                vm.data = data;
                return vm.data;
            });
        }

        function sendEmail() {
            dataservice.sendEmailToTheCoachee({Id: vm.data.Id, EmailBodyText: vm.email}).then(function (data) {
                vm.email = '';
                logger.success('Email Sent');
            });
        }

    }
})();
