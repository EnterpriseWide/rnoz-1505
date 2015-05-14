/* jshint -W117, -W030 */
describe('program routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/program/program-view.html';

        beforeEach(function() {
            module('app.program', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map /program route to program View template', function () {
            expect($state.get('viewProgram').templateUrl).to.equal(view);
        });
    });
});
