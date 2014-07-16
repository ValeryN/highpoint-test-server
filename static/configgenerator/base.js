var path = require('path');


var extend = function(var_args) {
  var result = {};

  for (var i = 0; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      result[key] = arguments[i][key];
    }
  }

  return result;
};

module.exports = function(rootPath, keyVersion) {
  var serverConfig = require(rootPath + '/application/config');
  var filesPath;
  var webFilesPath;

  if (keyVersion) {
    filesPath = rootPath + '/public/a/' + keyVersion;
    webFilesPath = '/a/' + keyVersion;
  } else {
    filesPath = rootPath + '/static/public';
    webFilesPath = '';
  }

  var binPath = rootPath + '/static/bin';
  var compassPath = rootPath + '/static/compass';
  var webPath = rootPath + '/static/public';
  var jsSrcPath = webPath + '/s_src/js';
  var jsContribSrcPath = webPath + '/s_src/js_contrib';
  var googPath = jsContribSrcPath + '/closure-library/closure/goog';
  var jsDevPath = webPath + '/s_dev/js';
  var jsPath = webPath + '/s/js';
  var nodeCssMapPath = webPath + '/s/server_css_map';

  var compilerFlags = [
    '--charset UTF-8',
    '--compilation_level ADVANCED_OPTIMIZATIONS',
    '--jscomp_warning accessControls',
    '--jscomp_warning ambiguousFunctionDecl',
    '--jscomp_warning checkEventfulObjectDisposal',
    '--jscomp_warning checkRegExp',
    '--jscomp_warning checkStructDictInheritance',
    '--jscomp_warning checkTypes',
    '--jscomp_warning checkVars',
    '--jscomp_warning const',
    '--jscomp_warning constantProperty',
    '--jscomp_warning deprecated',
    '--jscomp_warning duplicateMessage',
    '--jscomp_warning es3',
    '--jscomp_warning es5Strict',
    '--jscomp_warning externsValidation',
    '--jscomp_warning fileoverviewTags',
    '--jscomp_warning globalThis',
    '--jscomp_warning internetExplorerChecks',
    '--jscomp_warning invalidCasts',
    '--jscomp_warning misplacedTypeAnnotation',
    '--jscomp_warning missingProperties',
    '--jscomp_warning missingProvide',
    '--jscomp_warning missingRequire',
    '--jscomp_warning missingReturn',
    '--jscomp_warning nonStandardJsDocs',
    //'--jscomp_warning reportUnknownTypes',
    '--jscomp_warning suspiciousCode',
    '--jscomp_warning strictModuleDepCheck',
    '--jscomp_warning typeInvalidation',
    '--jscomp_warning undefinedNames',
    '--jscomp_warning undefinedVars',
    '--jscomp_warning unknownDefines',
    '--jscomp_warning uselessCode',
    '--jscomp_warning visibility',
    '--module_rename_prefix_namespace z',
    '--use_types_for_optimization',
    "--output_wrapper '(function(){%output%})();'"
  ];

  var defines = {
    'goog.DEBUG': false,
    'goog.LOCALE': 'ru',
    'goog.NATIVE_ARRAY_PROTOTYPES': true,
    'goog.array.ASSUME_NATIVE_FUNCTIONS': true,
    'goog.dom.ASSUME_STANDARDS_MODE': true,
    'goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST': true,
    'goog.events.CAPTURE_SIMULATION_MODE': 1,
    'goog.net.XmlHttp.ASSUME_NATIVE_XHR': true,
    'goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS': true,
    'goog.ui.Component.DEFAULT_BIDI_DIR': 1,
    'scdi.DEVELOPER': serverConfig.jsDeveloper,
  };

  var copyFiles = keyVersion ? {
    files: [{
      sourcePath: webPath + '/s',
      destPath: filesPath + '/s',
    }],
  } : {};

  configs = {
    default: {
      compileJsTemplates: {
        inputFiles: jsSrcPath,
      },
      compileServerTemplates: {
        inputFiles: rootPath + '/application/views',
      },
      copyFiles: copyFiles,
      generateFiles: {
        files: [{
          data: {
            filesPath: filesPath,
            webFilesPath: webFilesPath,
          },
          outputFile: rootPath + '/static/config_static.js',
          templateFile: rootPath + '/static/configgenerator/templates/config_static.ejs',
        }],
      },
      watch: {
        files: [{
          paths: [
            compassPath + '/images/**/*.+(gif|jpg|png|svg)',
            compassPath + '/sass/**/*.scss'
          ],
          tasks: ['buildCss'],
        }, {
          paths: [
            jsSrcPath + '/**/*.js',
          ],
          tasks: ['buildJs'],
        }, {
          paths: [
            jsSrcPath + '/**/*.ojst',
          ],
          tasks: ['compileJsTemplates'],
          types: ['added', 'changed'],
        }, {
          paths: [
            rootPath + '/application/views/**/*.ojst',
          ],
          tasks: ['compileServerTemplates'],
          types: ['added', 'changed'],
        }],
      }
    }
  };

  var createConfig = function(taskName, opt_fileName) {
    var fileName = opt_fileName || taskName;

    return {
      buildCss: {
        compassCssDir: webPath + '/s_dev/css',
        compassImagesDir: compassPath + '/images',
        compassOutputStyle: 'expanded',
        compassSassDir: compassPath + '/sass',
        compassSpecify: compassPath + '/sass/' + fileName + '.scss',
      },
      compileCss: {
        compassCssDir: webPath + '/s/css',
        compassImagesDir: compassPath + '/images',
        compassOutputStyle: 'compressed',
        compassSassDir: compassPath + '/sass',
        compassSpecify: compassPath + '/sass/' + fileName + '.scss',
      },
      obfuscateCss: {
        outputFile: webPath + '/s/css/' + fileName + '.css',
        mapFiles: [{
          outputFile: jsDevPath + '/' + fileName + '_css_renaming_map.js',
          templateFile: rootPath + '/static/configgenerator/templates/googcss.ejs',
        }, {
          outputFile: nodeCssMapPath + '/' + fileName + '_map.js',
          templateFile: rootPath + '/static/configgenerator/templates/servercss.ejs',
        }]
      },
      buildJs: {
        cacheFile: rootPath + '/tmp/' + fileName + '_dev.cache',
        defines: extend(defines, {
          'goog.DEBUG': true,
        }),
        googPath: googPath,
        inputFiles: [
          jsContribSrcPath + '/closure-library/closure/goog',
          jsContribSrcPath + '/closure-library/third_party/closure/goog',
          jsContribSrcPath + '/napp',
          jsContribSrcPath + '/npf',
          jsContribSrcPath + '/ojster',
          jsSrcPath + '/apps/' + fileName,
          jsSrcPath + '/scd',
        ],
      },
      compileJs: {
        compilerFlags: compilerFlags,
        compilerPath: binPath + '/compiler-custom.jar',
        defines: defines,
        externs: [
          jsContribSrcPath + '/externs/socket.io.js',
          jsContribSrcPath + '/externs/svg.js',
        ],
        files: [
          jsContribSrcPath + '/closure-library/closure/goog',
          jsContribSrcPath + '/closure-library/third_party/closure/goog',
          jsContribSrcPath + '/napp',
          jsContribSrcPath + '/npf',
          jsContribSrcPath + '/ojster',
          jsSrcPath + '/apps/' + fileName,
          jsSrcPath + '/scd',
        ],
        jvmFlags: ['-Xms256M -Xmx512M -XX:+TieredCompilation -XX:TieredStopAtLevel=1'],
        maxBuffer: 1500 * 1024,
        sourceMapPath: jsPath + '/' + fileName + '.map',
      },
      checkJsRequires: {
        inputFiles: [
          jsSrcPath + '/apps/' + fileName,
          jsSrcPath + '/scd',
        ],
        externs: [
          jsContribSrcPath + '/closure-library/closure/goog',
          jsContribSrcPath + '/closure-library/third_party/closure/goog',
          jsContribSrcPath + '/napp',
          jsContribSrcPath + '/npf',
          jsContribSrcPath + '/ojster',
        ],
        excludeProvides: [
          'goog',
          'goog.dispose',
        ]
      },
      tasks: {
        build: [
          'buildCss',
          'default.compileJsTemplates',
          'buildJs',
        ],
        compile: [
          'compileCss',
          'obfuscateCss',
          'default.compileJsTemplates',
          'compileJs',
        ],
      },
    };
  };

  configs.panel = createConfig('panel');
  configs.panel.buildJs.outputFile = jsDevPath + '/panel.js';
  configs.panel.compileJs.inputFiles = [
    jsDevPath + '/panel_css_renaming_map.js',
    jsSrcPath + '/apps/panel/init.js',
  ];
  configs.panel.compileJs.outputFile = jsPath + '/panel.js';

  if (!configs.default.tasks) {
    configs.default.tasks = {};
  }

  var taskNamesMap = {};

  for (var appName in configs) {
    if ('default' != appName) {
      var taskNames = ['buildCss', 'compileCss', 'obfuscateCss', 'buildJs',
        'compileJs', 'checkJsRequires'];

      taskNames.forEach(function(taskName) {
        if (configs[appName][taskName] && !configs[appName][taskName].disabled) {
          if (!taskNamesMap[taskName]) {
            taskNamesMap[taskName] = [];
          }

          taskNamesMap[taskName].push(appName + '.' + taskName);
        }
      });
    }
  }

  for (var taskName in taskNamesMap) {
    configs.default.tasks[taskName] = taskNamesMap[taskName];
  }

  configs.default.tasks.build = [
    configs.default.tasks.buildCss,
    'compileJsTemplates',
    configs.default.tasks.buildJs
  ].filter(function(task) {
    return task;
  });

  configs.default.tasks.compile = [
    configs.default.tasks.compileCss,
    configs.default.tasks.obfuscateCss,
    'compileJsTemplates',
    configs.default.tasks.compileJs,
  ].filter(function(task) {
    return task;
  });

  return configs;
};
