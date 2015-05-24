/* jshint -W117, -W030 */
describe('AssignmentController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.assignment');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('AssignmentController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Assignment controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Assignment', function() {
                expect(controller.title).to.equal('Assignment');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
