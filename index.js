var path = require('path');
var through = require('through2');
var glob = require('glob');

module.exports = function (file) {
  return through(function (buf, enc, next) {
    var src = buf.toString('utf8');
    src = src.replace(/var reglob = require\((['"])reglob\1\)/, '');
    var transformed = src.replace(/reglob\(([^\)]+)\)/, function(all, globber) {
      globber = globber.replace(/^__dirname/, "'" + path.dirname(file) + "'");
      try {
        globber = eval(globber);
      } catch (e) {}
      var matches = glob.sync(globber);
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
