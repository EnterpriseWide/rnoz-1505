    /* jshint -W117, -W030 */
describe('assignment routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/assignment/assignment.html';

        beforeEach(function() {
            module('app.assignment', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map /assignment route to assignment View template', function () {
            expect($state.get('assignment').templateUrl).to.equal(view);
        });

        it('of assignment should work with $state.go', function () {
            $state.go('assignment');
            $rootScope.$apply();
            expect($state.is('assignment'));
        });
    });
});
