var closurebuilder = require('closurebuilder');


/**
 * @param {Gulp} gulp
 * @param {Object} options
 * @param {function(Error)} callback
 */
module.exports = function(gulp, options, callback) {
  var params = {
    cacheFile: options.cacheFile,
    compilerFlags: options.compilerFlags,
    defines: options.defines,
    externs: options.externs,
    jvmFlags: options.jvmFlags,
    logLevel: options.logLevel,
    maxBuffer: options.maxBuffer,
    sourceMapPath: options.sourceMapPath
  };

  if (options.modules) {
    closurebuilder.ModuleBuilder.compile(options.compilerPath, options.modules,
      options.files, params, callback);
  } else {
    params.outputFile = options.outputFile;
    closurebuilder.Builder.compile(options.compilerPath, options.inputFiles,
      options.files, params, callback);
  }
};
