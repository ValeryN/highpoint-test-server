var Config           = require('frontdeployer').Config;
var CssObfuscator    = require('frontdeployer').CssObfuscator;
var TemplateCompiler = require('frontdeployer').TemplateCompiler;
var jsBuilder        = require('frontdeployer').jsBuilder;
var fs               = require('fs');


/**
 * @return {Object.<Config>}
 */
exports.getAppConfigs = function() {
  var appConfigs = null;

  if (fs.existsSync(__dirname + '/../config.js')) {
    appConfigs = {};
    var config = require('../config').config;

    for (var configKey in config) {
      appConfigs[configKey] = Config.createConfig(config, configKey);
    }
  }

  return appConfigs;
};

/**
 * @param {Grunt} grunt
 * @param {Array.<Config>}
 * @return {!Object}
 */
exports.getCompassSettings = function(grunt, appConfigs) {
  var compassSettings = {};

  var addTask = function(settings, taskName, config) {
    if (
      config &&
      !config.disabled &&
      config.compassCssDir &&
      config.compassSassDir &&
      config.compassSpecify
    ) {
      settings[taskName] = {
        options: {
          cssDir: config.compassCssDir,
          imagesDir: config.compassImagesDir,
          outputStyle: config.compassOutputStyle,
          sassDir: config.compassSassDir,
          specify: config.compassSpecify
        }
      };
    }
  };

  for (configKey in appConfigs) {
    var cssConfig = appConfigs[configKey].settings.buildCss;
    addTask(compassSettings, 'build_' + configKey, cssConfig);
    var cssConfig = appConfigs[configKey].settings.compileCss;
    addTask(compassSettings, configKey, cssConfig);
  }

  return compassSettings;
};

/**
 * @param {Grunt} grunt
 * @param {Array.<Config>}
 */
exports.registerCommonTasks = function(grunt, appConfigs) {
  grunt.registerTask('_obfuscateCss', function(configKey) {
    if (
      appConfigs[configKey] &&
      appConfigs[configKey].settings &&
      appConfigs[configKey].settings.obfuscateCss &&
      !appConfigs[configKey].settings.obfuscateCss.disabled
    ) {
      var async = this.async();
      var options = appConfigs[configKey].settings.obfuscateCss;
      CssObfuscator.createFromConfig(options, function(err) {
        if (err) {
          console.error(err);
        }

        async(!err);
      });
    }
  });

  grunt.registerTask('_buildJs', function(configKey) {
    if (
      appConfigs[configKey] &&
      appConfigs[configKey].settings &&
      appConfigs[configKey].settings.buildJs &&
      !appConfigs[configKey].settings.buildJs.disabled
    ) {
      var async = this.async();
      var callback = function(err) {
        if (err) {
          console.error(err);
        }

        async(!err);
      };
      var options = appConfigs[configKey].settings.buildJs;

      if (options.modules) {
        jsBuilder.buildModuleDepsFromConfig(options, callback);
      } else {
        jsBuilder.buildDepsFromConfig(options, callback);
      }
    }
  });

  grunt.registerTask('_compileJs', function(configKey) {
    if (
      appConfigs[configKey] &&
      appConfigs[configKey].settings &&
      appConfigs[configKey].settings.compileJs &&
      !appConfigs[configKey].settings.compileJs.disabled
    ) {
      var async = this.async();
      var callback = function(err) {
        if (err) {
          console.error(err);
        }

        async(!err);
      };
      var options = appConfigs[configKey].settings.compileJs;

      if (options.modules) {
        jsBuilder.compileModulesFromConfig(options, callback);
      } else {
        jsBuilder.compileFromConfig(options, callback);
      }
    }
  });

  grunt.registerTask('_checkJsRequires', function(configKey) {
    if (
      appConfigs[configKey] &&
      appConfigs[configKey].settings &&
      appConfigs[configKey].settings.checkJsRequires &&
      !appConfigs[configKey].settings.checkJsRequires.disabled
    ) {
      var async = this.async();
      var options = appConfigs[configKey].settings.checkJsRequires;
      jsBuilder.checkRequiresFromConfig(options, function(err) {
        if (err) {
          console.error(err);
        }

        async(!err);
      });
    }
  });

  grunt.registerTask('_compileTemplates', function(configKey) {
    if (
      appConfigs[configKey] &&
      appConfigs[configKey].settings &&
      appConfigs[configKey].settings.compileJsTemplates &&
      !appConfigs[configKey].settings.compileJsTemplates.disabled
    ) {
      var async = this.async();
      var options = appConfigs[configKey].settings.compileJsTemplates;
      TemplateCompiler.compileFromConfig(options, function(err) {
        if (err) {
          console.error(err);
        }

        async(!err);
      });
    }
  });
};
