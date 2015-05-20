/* jshint -W117, -W030 */
describe('learningplan routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/learningplan/learningplan.html';

        beforeEach(function() {
            module('app.learningplan', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map /learningplan route to learningplan View template', function () {
            expect($state.get('learningplan').templateUrl).to.equal(view);
        });

        it('of learningplan should work with $state.go', function () {
            $state.go('learningplan');
            $rootScope.$apply();
            expect($state.is('learningplan'));
        });
    });
});
