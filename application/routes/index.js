var fs = require('fs');
var path = require('path');


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
      if (!map[baseName]) {
        map[baseName] = {};
      }

      var subMap = loadFiles(fullPath);

      for (var key in subMap) {
        map[baseName][key] = subMap[key];
      }
    } else if ('.js' == path.extname(file) && 'index.js' != file) {
      if (!map[baseName]) {
        map[baseName] = {};
      }

      var sections = require(fullPath);

      for (var key in sections) {
        map[baseName][key] = sections[key];
      }
    }
  });

  return map;
};

module.exports = loadFiles();
