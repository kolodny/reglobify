var assert = require('assert');
var exec = require('child_process').exec;

var cmd = './node_modules/.bin/browserify -t ./index.js test/requirer.js';
exec(cmd, function(err, stdout) {
  assert(/placeholder1.json/.test(stdout), 'contains "placeholder1"');
  assert(/placeholder2.json/.test(stdout), 'contains "placeholder2"');
  assert(/"name":\s?"placeholder1"/.test(stdout), 'contains "placeholder1\'s contents"');
  assert(/"name":\s?"placeholder2"/.test(stdout), 'contains "placeholder2\'s contents"');
})
