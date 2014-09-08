var fs = require('fs');
var imagemagick = require('imagemagick');
var mkdirp = require('mkdirp');
var path = require('path');

var config = require('../config');


/**
 * @param {string} path
 * @return {string}
 */
exports.getImageUrl = function(path) {
  return config.imageServerPath + path;
};

exports.convertImage = function(srcPath, dstPath, options, callback) {
  var dir = path.dirname(dstPath);

  if (!fs.existsSync()) {
    mkdirp.sync(dir);
  }

  if ('webp' == options.ext) {
    var execFile = require('child_process').execFile;
    var params = [srcPath];

    if (options) {
      if (options.crop) {
        params.push('-crop', options.crop.left, options.crop.top,
          options.crop.width, options.crop.height);
      }

      if (options.resize) {
        params.push('-resize', options.resize[0], options.resize[1]);
      }
    }

    params.push('-q', 85, '-o', dstPath);

    execFile('cwebp', params, callback);
  } else {
    var command = [srcPath];

    if (options.crop) {
      command.push('-crop', options.crop.width + 'x' + options.crop.height +
        '+' + options.crop.left + '+' + options.crop.top);
    }

    if (options.resize) {
      command.push('-resize', options.resize.join('x'));
    }

    command.push('-strip', '-quality', 85, dstPath);
    imagemagick.convert(command, callback);
  }
};
