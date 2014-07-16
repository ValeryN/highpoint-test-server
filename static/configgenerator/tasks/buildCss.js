var gulpCompass = require('gulp-compass');
var path = require('path');


/**
 * @param {Gulp} gulp
 * @param {Object} options
 * @param {function(Error)} callback
 * @return {Stream}
 */
module.exports = function(gulp, options, callback) {
  if (
    options.compassCssDir &&
    options.compassSassDir &&
    options.compassSpecify
  ) {
    return gulp.
      src(options.compassSpecify).
      pipe(gulpCompass({
        css: path.relative(options.compassSassDir, options.compassCssDir),
        image: path.relative(options.compassSassDir, options.compassImagesDir),
        project: options.compassSassDir,
        relative: false,
        sass: './',
        style: options.compassOutputStyle,
      }));
  }

  return callback(null);
};
