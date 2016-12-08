var pome = require('../');
var should = require('should');
var mockBase = process.cwd() + '/test';

describe('pome', function() {
  describe('#createApp', function() {
    it('should create and get app, be the same instance', function(done) {
      var app = pome.createApp({base: mockBase});
      should.exist(app);

      var app2 = pome.app;
      should.exist(app2);
      should.strictEqual(app, app2);
      done();
    });
  });
});
