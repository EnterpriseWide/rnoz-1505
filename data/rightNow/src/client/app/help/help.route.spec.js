/* jshint -W117, -W030 */
describe('help routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/help/help.html';

        beforeEach(function() {
            module('app.help', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map /help route to help View template', function () {
            expect($state.get('help').templateUrl).to.equal(view);
        });

        it('of help should work with $state.go', function () {
            $state.go('help');
            $rootScope.$apply();
            expect($state.is('help'));
        });
    });
});
