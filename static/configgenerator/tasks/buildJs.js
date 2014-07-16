var closurebuilder = require('closurebuilder');


/**
 * @param {Gulp} gulp
 * @param {Object} options
 * @param {function(Error)} callback
 */
module.exports = function(gulp, options, callback) {
  if (options.modules) {
    closurebuilder.ModuleDepsWriter.build(options.modules, options.inputFiles, {
      cacheFile: options.cacheFile,
      defines: options.defines,
      logPrint: !options.logDisabled,
    }, callback);
  } else {
    var depsWriter = new closurebuilder.DepsWriter(
      options.inputFiles, options.googPath);

    if (options.cacheFile) {
      depsWriter.setCacheFile(options.cacheFile);
    }

    depsWriter.setLogPrint(!options.logDisabled);
    depsWriter.setOutputFile(options.outputFile);
    depsWriter.build(callback);
  }
};
