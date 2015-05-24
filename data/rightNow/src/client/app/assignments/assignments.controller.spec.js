/* jshint -W117, -W030 */
describe('AssignmentsController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.assignments');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('AssignmentsController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Assignments controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Assignments', function() {
                expect(controller.title).to.equal('Assignments');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
