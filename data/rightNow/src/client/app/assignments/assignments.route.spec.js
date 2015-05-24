/* jshint -W117, -W030 */
describe('assignments routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/assignments/assignments.html';

        beforeEach(function() {
            module('app.assignments', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map /assignments route to assignments View template', function () {
            expect($state.get('assignments').templateUrl).to.equal(view);
        });

        it('of assignment should work with $state.go', function () {
            $state.go('assignments');
            $rootScope.$apply();
            expect($state.is('assignments'));
        });
    });
});
