/* jshint -W117, -W030 */
describe('ProgramsController', function() {
    var controller;
    var programs = mockData.getMockPrograms();
    var sessions = mockData.getMockSessions();

    beforeEach(function() {
        bard.appModule('app.programs');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    });

    beforeEach(function () {
        sinon.stub(dataservice, 'getPrograms').returns($q.when(programs));
        sinon.stub(dataservice, 'getSessions').returns($q.when(sessions));
        controller = $controller('ProgramsController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Programs controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Programs', function () {
                expect(controller.title).to.equal('Programs');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });

            it('should have at least 1 program', function () {
                expect(controller.programs).to.have.length.above(0);
            });

            it('should have program count of 3', function () {
                expect(controller.programs).to.have.length(3);
            });
        });
    });
});
