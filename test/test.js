var assert = require('assert');
var indagent = require('../index');

describe('indagent.get', function() {
  it('accepts path, callback', function(done) {
    indagent.get('/users', function(err, data) {
      assert.ifError(err);
      assert.equal(data.length, 25);
      done();
    })
  });
  it('accepts path, query, callback', function(done) {
    indagent.get('/users', {limit: 10}, function(err, data) {
      assert.ifError(err);
      assert.equal(data.length, 10);
      done();
    })
  });
  it('works with chaining syntax', function(done) {
    indagent.get('/users')
      .query({limit: 10})
      .perform(function(err, data) {
        assert.ifError(err);
        assert.equal(data.length, 10);
        done();
      });
  });
});
