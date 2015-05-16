/* jshint -W117, -W030 */
describe('Programs routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/programs/programs.html';

        beforeEach(function() {
            module('app.programs', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map /programs route to programs View template', function () {
            expect($state.get('programs').templateUrl).to.equal(view);
        });

        it('of programs should work with $state.go', function () {
            $state.go('programs');
            $rootScope.$apply();
            expect($state.is('programs'));
        });
    });
});
