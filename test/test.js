var assert = require('assert');
var agent = require('../index');


var TEST_TOKEN = process.env.INDABA_TEST_TOKEN;
assert.ok(TEST_TOKEN);

beforeEach(function() {
  agent._endpoint = 'https://lydian.indavelopment.com';
  agent._token = undefined;
});

describe('agent.inGet', function() {
  it('accepts path, callback', function(done) {
    agent.inGet('/users', function(err, data) {
      assert.ifError(err);
      assert.equal(data.length, 25);
      done();
    })
  });
  it('accepts path, query, callback', function(done) {
    agent.inGet('/users', {limit: 10}, function(err, data) {
      assert.ifError(err);
      assert.equal(data.length, 10);
      done();
    })
  });
  it('works with chaining syntax', function(done) {
    agent.inGet('/users')
      .query({limit: 10})
      .inEnd(function(err, data) {
        assert.ifError(err);
        assert.equal(data.length, 10);
        done();
      });
  });
});

describe('agent.inGet with token', function() {
  it('has err without token', function(done) {
    agent.inGet('/whoami', function(err, data) {
      assert.ok(err);
      done();
    })
  });
  it('works with a token', function(done) {
    agent
      .inGet('/whoami')
      .query('access_token', TEST_TOKEN)
      .inEnd(function(err, data) {
        assert.ok(err);
        done();
      })
  });
  it('automatically includes token if you set agent._token', function(done) {
    agent._token = TEST_TOKEN
    agent
      .inGet('/whoami')
      .inEnd(function(err, data) {
        assert.ifError(err);
        assert.ok(data);
        done();
      });
  });
});

describe('agent.inPost', function() {
  beforeEach(function() {
    agent._token = TEST_TOKEN
  });
  before(function(done) {
    agent
      .inPost('/users/ethan/unfollow')
      .inEnd(function() {
        done();
      })
  });
  it('works', function(done) {
    agent
      .inPost('/users/ethan/follow')
      .inEnd(done)
  });
});
