(function () {
    'use strict';

    angular
        .module('app.admin.survey')
        .controller('AdminSurveyUpdateController', AdminSurveyUpdateController);
    AdminSurveyUpdateController.$inject = ['logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', 'ngDialog'];

    function AdminSurveyUpdateController(logger, authservice, $state, $stateParams, $q, dataservice, ngDialog) {
        var vm = this;
        vm.title = 'Update Survey';
        vm.data = {};
        vm.authData = authservice.authData;
        vm.save = save;
        vm.deleteRecord = deleteRecord;
        vm.getSurvey = getSurvey;

        activate();

        function activate() {
            vm.surveyId = $stateParams.surveyId;
            var promises = [getSurvey(vm.surveyId)];
            return $q.all(promises);
        }

        function getSurvey(id) {
            return dataservice.readSurvey(id).then(function (data) {
                vm.data = data.Item;
                vm.isUsed = data.UsageCount > 0;
            });
        }

        function save() {
            dataservice.updateSurvey(vm.data.Id, vm.data).then(function (data) {
                logger.info('Survey Updated');
                $state.go('admin');
            });
        }

        function deleteRecord() {
            ngDialog.openConfirm({
                template: '<p>Would you like to Delete the Survey?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="btn btn-blue" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="btn btn-blue" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                dataservice.deleteSurvey(vm.surveyId).then(function(data) {
                    logger.success('Deleted Survey ' + data.Id);
                    $state.go('admin');
                });
            });
        }

    }
})();
