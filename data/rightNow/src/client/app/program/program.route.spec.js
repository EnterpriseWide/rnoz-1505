/* jshint -W117, -W030 */
describe('program routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/program/program.html';

        beforeEach(function() {
            module('app.program', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map /program route to program View template', function () {
            expect($state.get('program').templateUrl).to.equal(view);
        });
    });
});
