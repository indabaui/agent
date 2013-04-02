var superagent = require('superagent');

var indagent = module.exports = {}

indagent._endpoint = "https://lydian.indabamusic.com"

superagent.Request.prototype.perform = function(cb) {
  this.end(jsendCallback(cb));
}

indagent.get = function(url, data, fn){
  url = indagent._endpoint + url;
  var req = superagent('GET', url);
  if ('function' === typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.perform(fn);
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

