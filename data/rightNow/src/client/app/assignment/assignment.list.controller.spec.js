/* jshint -W117, -W030 */
describe('AssignmentListController', function() {
    var controller;
    var program = mockData.getMockProgram();

    beforeEach(function() {
        bard.appModule('app.assignment');
        bard.inject('$controller', '$log', '$rootScope', 'dataservice', '$q');
    });

    beforeEach(function () {
        sinon.stub(dataservice, 'getProgram').returns($q.when(program));
        controller = $controller('AssignmentListController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('AssignmentList controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Program', function() {
                expect(controller.title).to.equal('Assignments');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
