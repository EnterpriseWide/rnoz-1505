/* jshint -W117, -W030 */
describe('password recovery routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/passwordrecovery/passwordrecovery.html';

        beforeEach(function() {
            module('app.passwordrecovery', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map /passwordrecovery route to admin View template', function () {
            expect($state.get('passwordrecovery').templateUrl).to.equal(view);
        });

        it('of passwordrecovery should work with $state.go', function () {
            $state.go('passwordrecovery');
            $rootScope.$apply();
            expect($state.is('passwordrecovery'));
        });
    });
});
