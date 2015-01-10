var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var exec = require('child_process').exec;
var command = 'java -jar vnu.jar -';
var err;

module.exports = function() {
  var stream  = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // Do nothing if no contents
    }

    if (file.isBuffer()) {
      var str = file.contents.toString('utf8');
      exec("echo '" + str + "' | " + command, function (err, stdout, stderr) {
        if (err === null) return;
        throw new PluginError('gulp-html', stderr);
      });
    }

    if (file.isStream()) {
      cb(new PluginError('gulp-html', 'Only Buffers are supported'));
      return;
    }

    return cb();
  });

  return stream;
};
