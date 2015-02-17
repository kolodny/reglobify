var path = require('path');
var through = require('through2');
var glob = require('glob');

module.exports = function (file) {
  return through(function (buf, enc, next) {
    var src = buf.toString('utf8');
    src = src.replace(/var reglob = require\((['"])reglob\1\)/, '');
    var transformed = src.replace(/reglob\(([^\)]+)\)/, function(all, globber) {
      globber = globber.replace(/^__dirname/, "'" + path.dirname(file) + "'");
      console.log(globber);
      try {
        globber = eval(globber);
      } catch (e) {}
      console.log(globber);
      var matches = glob.sync(globber);
      console.log(matches)
      if (!matches.length) {
        return '';
      } else {
        return "require('" + matches.join("');require('") + "');";
      }
    });
    this.push(transformed);
    next();
  });
};
