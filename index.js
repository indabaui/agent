var agent = module.exports = require('superagent');

agent._endpoint = "https://lydian.indabamusic.com";
agent._token = undefined;

agent.Request.prototype.inEnd = function(cb) {
  if (agent._token) {
    this.set('Authorization', "Bearer " + agent._token);
  }
  this.end(jsendCallback(cb));
}

agent.inGet = function(url, data, fn){
  url = agent._endpoint + url;
  var req = agent('GET', url);
  if ('function' === typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.inEnd(fn);
  return req;
};


agent.inPost = function(url, data, fn){
  url = agent._endpoint + url;
  var req = agent('POST', url);
  if ('function' === typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.inEnd(fn);
  return req;
};


function jsendCallback(cb) {
  return function endCallback(err, resp) {
    if (err) {
      cb(err);
    } else if (! resp.ok) {
      cb(new Error("http " + resp.status + " " + resp.text));
    } else if (resp.body.status !== 'success') {
      cb(new Error("lydian says " + resp.body.status + ": " + resp.body.message));
    } else {
      var result = resp.body.data;
      if (result && resp.body.total_records) {
        result.totalRecords = resp.body.total_records;
      }
      cb(null, result);
    }
  }
}

