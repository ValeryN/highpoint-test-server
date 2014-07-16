var async = require('async');
var mkdirp = require('mkdirp');
var ncp = require('ncp').ncp;
var path = require('path');


/**
 * @param {Gulp} gulp
 * @param {Object} options
 * @param {function(Error)} callback
 */
module.exports = function(gulp, options, callback) {
  if (options.files && options.files.length) {
    ncp.limit = 16;

    async.eachSeries(options.files, function(option, callback) {
      if (option.sourcePath && option.destPath) {
        mkdirp(path.dirname(option.destPath), 0755, function(err) {
          if (err) return callback(err);

          ncp(option.sourcePath, option.destPath, callback);
        });
      } else {
        callback(null);
      }
    }, callback);
  } else {
    callback(null);
  }
};
