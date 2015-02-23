var assert = require('assert');
var exec = require('child_process').exec;

var cmd = './node_modules/.bin/browserify -t ./index.js test/requirer.js | node';
exec(cmd, function(err, stdout) {
  var returnedObj = JSON.parse(stdout);
  assert.deepEqual(returnedObj, [
    {
      name: 'placeholder1',
    }, {
      name: 'placeholder2'
    }
  ])
})
