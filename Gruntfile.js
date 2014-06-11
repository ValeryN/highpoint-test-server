var TemplateCompiler = require('frontdeployer').TemplateCompiler;
var configGenerator  = require('frontdeployer').configGenerator;
var copier           = require('frontdeployer').copier;
var fileGenerator    = require('frontdeployer').fileGenerator;
var fs               = require('fs');
var path             = require('path');

var gruntPartial     = require('./lib/gruntpartial');


var appNames = ['panel'];

module.exports = function(grunt) {
  var appConfigs = gruntPartial.getAppConfigs();

  var inits = {
    pkg: grunt.file.readJSON('package.json'),
  };

  if (appConfigs && appConfigs.common) {
    inits.compass = gruntPartial.getCompassSettings(grunt, appConfigs);
    inits.watch = {
      css: {
        files: appConfigs.common.settings.watch.cssFiles,
        tasks: ['buildCss'],
      },
      js: {
        files: appConfigs.common.settings.watch.jsFiles,
        tasks: ['buildJs'],
      },
      jsTemplates: {
        files: appConfigs.common.settings.watch.jsTemplateFiles,
        options: {
          event: ['added', 'changed'],
        },
        tasks: ['compileTemplates'],
      },
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
      }
    };
  }

  grunt.initConfig(inits);
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  if (appConfigs) {
    gruntPartial.registerCommonTasks(grunt, appConfigs);

    grunt.registerTask('createApplicationDirectory', function() {
      if (appConfigs.common.settings.deploy) {
        var next = this.async();

        if (appConfigs.common.settings.deploy.copyFiles) {
          copier.copy(appConfigs.common.settings.deploy.copyFiles, function(err) {
            if (err) {
              next(!err);
            } else {
              if (appConfigs.common.settings.deploy.generateFiles) {
                fileGenerator.generateAllFromFiles(
                  appConfigs.common.settings.deploy.generateFiles, function(err) {
                    next(!err);
                  });
              }
            }
          });
        } else {
          if (appConfigs.common.settings.deploy.generateFiles) {
            fileGenerator.generateAllFromFiles(
              appConfigs.common.settings.deploy.generateFiles, function(err) {
                next(!err);
              });
          }
        }
      }
    });

    grunt.registerTask('build', function(opt_appName) {
      var subTasks = [];

      if (opt_appName) {
        subTasks = [
          'buildCss:' + opt_appName,
          'compileTemplates:common',
          'buildJs:' + opt_appName
        ];
      } else {
        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('buildCss:' + appNames[i]);
        }

        subTasks.push('compileTemplates:common');

        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('buildJs:' + appNames[i]);
        }
      }

      grunt.task.run(subTasks);
    });

    grunt.registerTask('compile', function(opt_appName) {
      var subTasks = [];

      if (opt_appName) {
        subTasks = [
          'compileCss:' + opt_appName,
          'obfuscateCss:' + opt_appName,
          'compileTemplates:common',
          'compileJs:' + opt_appName
        ];
      } else {
        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('compass:' + appNames[i]);
        }

        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('obfuscateCss:' + appNames[i]);
        }

        subTasks.push('compileTemplates:common');

        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('compileJs:' + appNames[i]);
        }
      }

      grunt.task.run(subTasks);
    });

    grunt.registerTask('buildCss', function(opt_appName) {
      var subTasks = [];

      if (opt_appName) {
        subTasks.push('compass:build_' + opt_appName);
      } else {
        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('compass:build_' + appNames[i]);
        }
      }

      grunt.task.run(subTasks);
    });

    grunt.registerTask('compileCss', function(opt_appName) {
      var subTasks = [];

      if (opt_appName) {
        subTasks.push('compass:' + opt_appName)
      } else {
        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('compass:' + appNames[i]);
        }
      }

      grunt.task.run(subTasks);
    });

    grunt.registerTask('obfuscateCss', function(opt_appName) {
      var subTasks = [];

      if (opt_appName) {
        subTasks.push('_obfuscateCss:' + opt_appName)
      } else {
        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('_obfuscateCss:' + appNames[i]);
        }
      }

      grunt.task.run(subTasks);
    });

    grunt.registerTask('checkJsRequires', function(opt_appName) {
      var subTasks = [];

      if (opt_appName) {
        subTasks.push('_checkJsRequires:' + opt_appName)
      } else {
        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('_checkJsRequires:' + appNames[i]);
        }
      }

      grunt.task.run(subTasks);
    });

    grunt.registerTask('buildJs', function(opt_appName) {
      var subTasks = [];

      if (opt_appName) {
        subTasks.push('_buildJs:' + opt_appName)
      } else {
        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('_buildJs:' + appNames[i]);
        }
      }

      grunt.task.run(subTasks);
    });

    grunt.registerTask('compileJs', function(opt_appName) {
      var subTasks = [];

      if (opt_appName) {
        subTasks.push('_compileJs:' + opt_appName)
      } else {
        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('_compileJs:' + appNames[i]);
        }
      }

      grunt.task.run(subTasks);
    });

    grunt.registerTask('compileTemplates', function(opt_appName) {
      var subTasks = [];

      if (opt_appName) {
        subTasks.push('_compileTemplates:' + opt_appName)
      } else {
        for (var i = 0; i < appNames.length; i++) {
          subTasks.push('_compileTemplates:' + appNames[i]);
        }
      }

      grunt.task.run(subTasks);
    });

    grunt.registerTask('default', ['build']);
    grunt.registerTask('deploy', ['compile', 'createApplicationDirectory']);
  }

  var files = fs.readdirSync(__dirname + '/config/templates').filter(function(file) {
    return '.js' == path.extname(file);
  });

  files.forEach(function(file) {
    var configName = path.basename(file, '.js');

    grunt.registerTask('config_' + configName, function(type, key) {
      var rootPath = __dirname;
      var templatePath = rootPath + '/config/templates/' + file;
      var configPath = rootPath + '/config.js';
      var next = this.async();
      var callback = function(err) {
        if (err) {
          console.error(err);
        }

        next(!err);
      };

      if ('random' == type) {
        configGenerator.generateRandom(
          templatePath, configPath, rootPath, callback);
      } else {
        var keyVersion = '';

        if ('key' == type) {
          keyVersion = key || '';
        }

        configGenerator.generate(
          templatePath, configPath, rootPath, keyVersion, callback);
      }
    });
  });

  grunt.registerTask('serverTemplates', 'Compile server templates', function() {
    var async = this.async();
    var templatesPath = path.resolve('./application/views/');
    var compiler = new TemplateCompiler(templatesPath);
    compiler.generatorClass = 'node';
    compiler.compile(function(err) {
      async(!err);
    });
  });
};
