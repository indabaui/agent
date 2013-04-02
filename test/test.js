var assert = require('assert');
var indagent = require('../index');


var TEST_TOKEN = process.env.INDABA_TEST_TOKEN;
assert.ok(TEST_TOKEN);

beforeEach(function() {
  indagent._endpoint = 'https://lydian.indavelopment.com';
  indagent._token = undefined;
});

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

describe('indagent.get with token', function() {
  it('has err without token', function(done) {
    indagent.get('/whoami', function(err, data) {
      assert.ok(err);
      done();
    })
  });
  it('works with a token', function(done) {
    indagent.get('/whoami')
      .query('access_token', process.env.INDABA_TEST_TOKEN)
      .perform(function(err, data) {
        assert.ok(err);
        done();
      })
  });
  it('automatically includes token if you set indagent._token', function(done) {
    indagent._token = TEST_TOKEN
    indagent.get('/whoami')
      .perform(function(err, data) {
        assert.ifError(err);
        assert.ok(data);
        done();
      });
  });
});

describe('indagent.post', function() {
  beforeEach(function() {
    indagent._token = TEST_TOKEN
  });
  before(function(done) {
    indagent.post('/users/ethan/unfollow').perform(done)
  });
  it('works', function(done) {
    indagent.post('/users/ethan/follow')
      .perform(done)
  });
});
