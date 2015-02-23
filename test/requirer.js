var reglob = require('reglob');

console.log(
  JSON.stringify(reglob(__dirname + '/placeholder*.json'))
);
