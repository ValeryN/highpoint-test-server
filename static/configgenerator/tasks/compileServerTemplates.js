var async = require('async');
var ojster = require('ojster');


/**
 * @param {Gulp} gulp
 * @param {Object} options
 * @param {function(Error)} callback
 */
module.exports = function(gulp, options, callback) {
  if (options.inputFiles) {
    /** @type {Array.<string>} */
    var inputFiles = 'string' == typeof options.inputFiles ?
      [options.inputFiles] : options.inputFiles;
    async.each(inputFiles, function(path, callback) {
      ojster.compilePath(path, null, {
        silent: this.false,
        generator: {
          generatorClass: ojster.generators.NodeGenerator,
          indentStr: '  '
        },
        tabSize: 2
      }, callback);
    }, callback);
  } else {
    callback(null);
  }
};
