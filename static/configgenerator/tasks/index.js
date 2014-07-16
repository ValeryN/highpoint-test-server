var fs = require('fs');
var path = require('path');


var wrapTask = function(task) {
  return function(gulp, options, callback) {
    if (options.disabled) {
      console.log('Task is disabled');
      callback(null);
    } else {
      return task(gulp, options, callback);
    }
  };
};

/**
 * @param {string=} opt_dirName
 * @return {Object}
 */
var loadFiles = function(opt_dirName) {
  var dirName = opt_dirName || __dirname;
  var map = {};

  fs.readdirSync(dirName).forEach(function(file) {
    var fullPath = dirName + '/' + file;
    var baseName = path.basename(file, '.js');

    if (fs.statSync(fullPath).isDirectory()) {
      map[baseName] = loadFiles(fullPath);
    } else if ('.js' == path.extname(file) && 'index.js' != file) {
      map[baseName] = wrapTask(require(fullPath));
    }
  });

  return map;
};

module.exports = loadFiles();
