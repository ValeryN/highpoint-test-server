var closurebuilder = require('closurebuilder');


/**
 * @param {Gulp} gulp
 * @param {Object} options
 * @param {function(Error)} callback
 */
module.exports = function(gulp, options, callback) {
  var checker = new closurebuilder.RequireChecker(
    options.inputFiles, options.externs);
  checker.setExcludeProvides(options.excludeProvides);
  checker.getWrongRequires(callback);
  checker.setLogPrint(!options.logDisabled);
};
