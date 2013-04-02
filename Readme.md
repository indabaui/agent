
# indagent

  Minimal SuperAgent customizations for working with Indaba Music API

  * Prepends `indagent._endpoint` to URLs so that you can use relative paths
  * Includes `indagent._token` as Authorization header if it is set
  * Using `perform` instead of `end` parses jSend response and provides error first callback

## Installation

    $ component install stereosteve/indagent

## API

```js

var indagent = require('indagent');

// path + callback
indagent.get('/opportunities', function(err, data) {
  console.log(data);
});

// path + query + callback
indagent.get('/opportunities', {limit: 10}, function(err, data) {
  console.log(data);
});

// superagent chaining style
indagent.get('/opportunities')
  .query({limit: 10})
  .query({offset: 80})
  .perform(function(err, data) {
    console.log(data);
  });

// one off authenticated request
indagent.get('/whoami')
  .query({access_token: 'xxxx'})
  .perform(function(err, data) {
    console.log(data);
  });

// set `indagent._token` and you can omit access_token on subsequent requests
indagent._token = 'xxxx';
indagent.get('/whoami')
  .perform(function(err, data) {
    console.log(data);
  });
```
   

## License

  MIT
