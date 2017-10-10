var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// consts
const PLUGIN_NAME = 'buildSVGs';

// plugin level function (dealing with files)
function buildSVGs() {

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    
    var self = this;
    
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }

    // load the JSON
    try {
      var parsedJSON = JSON.parse(file.contents);
    } catch (e) {
      self.emit('error', new PluginError(PLUGIN_NAME, 'Invalid JSON in ' + file.path));
      self.emit('error', e);
      return;
    }

    if (!parsedJSON || !parsedJSON.icons) {
      self.emit('error', new PluginError(PLUGIN_NAME, 'Need { icons: { "name": "svg" } } in ' + file.path));
      return;
    }

    Object.keys(parsedJSON.icons).forEach(function(key) {
      // Strip quotes
      var val = parsedJSON.icons[key].replace(/^['|"]/,'').replace(/['|"]$/,'');

      var filename = key.replace('_','-');

      // Create normal
      self.push(new gutil.File({
        cwd: "",
        base: "",
        path: filename + '.svg',
        contents: new Buffer(val.replace('ICONCOLOREPLACE', 'rgb(145,158,171)'))
      }));

      // Create disabled
      self.push(new gutil.File({
        cwd: "",
        base: "",
        path: filename + '-disabled.svg',
        contents: new Buffer(val.replace('ICONCOLOREPLACE', 'rgb(196,205,213)'))
      }));
    });

    cb();
  });
}

// exporting the plugin main function
module.exports = buildSVGs;
