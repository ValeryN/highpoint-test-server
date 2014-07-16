var fs = require('fs');
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var path = require('path');
var runSequence = require('run-sequence');

var configGenerator = require('./static/configgenerator/lib/generator');

var rootPath = __dirname;
var generatorPath = rootPath + '/static/configgenerator';
var tasks = require(generatorPath + '/tasks');
var configPath = rootPath + '/static/config.js';

var getTaskName = function(task, opt_scope) {
  var parts = task.split('.');

  if (1 < parts.length) {
    if ('default' == parts[0]) {
      task = parts[1] || '';
    }
  } else if (opt_scope && 'default' != opt_scope) {
    task = opt_scope + '.' + task;
  }

  return task;
};

/**
 * @param {Object} appConfig
 * @param {string} appName
 * @param {string} taskName
 */
var parseTaskConfig = function(appConfig, appName, taskName) {
  if (tasks[taskName]) {
    gulp.task(getTaskName(taskName, appName), function(callback) {
      return tasks[taskName](gulp, appConfig[taskName], callback);
    });
  }
};

/**
 * @param {Object} config
 * @param {string} appName
 */
var parseApplicationConfig = function(config, appName) {
  for (var taskName in config[appName]) {
    parseTaskConfig(config[appName], appName, taskName);
  }
};

var getSubTasks = function(tasks, appName) {
  return tasks.map(function(taskName) {
    if ('string' == typeof taskName) {
      return getTaskName(taskName, appName);
    } else {
      return getSubTasks(taskName, appName);
    }
  });
};

/**
 * @param {Object} appConfig
 * @param {string} appName
 * @param {string} taskName
 */
var parseMultiTaskConfig = function(appConfig, appName, taskName) {
  gulp.task(getTaskName(taskName, appName), function(callback) {
    var subTasks = getSubTasks(appConfig.tasks[taskName], appName);
    runSequence.apply(this, subTasks.concat(callback));
  });
};

/**
 * @param {Object} config
 * @param {string} appName
 */
var parseMultiTasksConfig = function(config, appName) {
  if (config[appName].tasks) {
    for (var taskName in config[appName].tasks) {
      parseMultiTaskConfig(config[appName], appName, taskName);
    }
  }
};

if (fs.existsSync(rootPath + '/static/config.js')) {
  var config = require(rootPath + '/static/config.js');

  var appName;

  for (appName in config) {
    parseApplicationConfig(config, appName);
  }

  for (appName in config) {
    parseMultiTasksConfig(config, appName);
  }

  gulp.task('watch', function() {
    if (
      config.default &&
      config.default.watch &&
      config.default.watch.files &&
      !config.default.watch.disabled
    ) {
      config.default.watch.files.forEach(function(options) {
        gulp.watch(options.paths, function(evt) {
          if (!options.types || -1 < options.types.indexOf(evt.type)) {
            gulp.start.apply(gulp, options.tasks);
          }
        });
      });
    }
  });
}

fs.readdirSync(generatorPath).filter(function(file) {
  return '.js' == path.extname(file);
}).forEach(function(file) {
  var configName = path.basename(file, '.js');
  var templatePath = generatorPath + '/' + file;

  gulp.task('config.' + configName, function(callback) {
    var keyVersion;

    if (undefined === gulpUtil.env.random) {
      keyVersion = gulpUtil.env.key || '';
      configGenerator.generate(
        templatePath, configPath, rootPath, keyVersion, callback);
    } else {
      keyVersion = configGenerator.generateRandom(
        templatePath, configPath, rootPath, callback);
    }

    console.log('Key: ' + (keyVersion || '<empty>'));
  });
});
