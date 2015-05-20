/* jshint -W117, -W030 */
describe('LearningPlanController', function() {
    var controller;
    var program = mockData.getMockProgram();

    beforeEach(function() {
        bard.appModule('app.learningplan');
        bard.inject('$controller', '$log', '$rootScope', 'dataservice', '$q');
    });

    beforeEach(function () {
        sinon.stub(dataservice, 'getProgram').returns($q.when(program));
        controller = $controller('LearningPlanController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('LearningPlan controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Learning Plan', function() {
                expect(controller.title).to.equal('Learning Plan');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
