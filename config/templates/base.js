var path = require('path');


exports.generate = function(rootPath) {
  var serverConfig = require(rootPath + '/application/config');
  var binPath = rootPath + '/bin';
  var compassPath = rootPath + '/compass';
  var webPath = rootPath + '/public';
  var jsSrcPath = webPath + '/s_src/js';
  var jsContribSrcPath = webPath + '/s_src/js_contrib';
  var googPath = jsContribSrcPath + '/closure-library/closure/goog';
  var jsDevPath = webPath + '/s_dev/js';
  var jsPath = webPath + '/s/js';

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
    '--jscomp_warning suspiciousCode',
    '--jscomp_warning strictModuleDepCheck',
    '--jscomp_warning typeInvalidation',
    '--jscomp_warning undefinedNames',
    '--jscomp_warning undefinedVars',
    '--jscomp_warning unknownDefines',
    '--jscomp_warning uselessCode',
    '--jscomp_warning visibility',
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
    'devi.API_PATH': serverConfig.apiAddress,
    'devi.SERVER_PATH': serverConfig.address,
    'devi.WEB_SOCKET_PATH': serverConfig.address,
  };

  return {
    common: {
      buildCss: {
        compassImagesDir: compassPath + '/images',
        compassSassDir: compassPath + '/sass',
      },
      compileCss: {
        compassImagesDir: compassPath + '/images',
        compassSassDir: compassPath + '/sass',
      },
      buildJs: {
        defines: defines,
        googPath: googPath,
      },
      compileJs: {
        compilerFlags: compilerFlags,
        compilerPath: binPath + '/compiler-custom.jar',
        defines: defines,
        externs: [
          jsContribSrcPath + '/externs/socket.io.js',
          jsContribSrcPath + '/externs/svg.js',
        ],
        jvmFlags: ['-Xms256M -Xmx512M -XX:+TieredCompilation -XX:TieredStopAtLevel=1'],
        maxBuffer: 1500 * 1024,
      },
      compileJsTemplates: {
        inputFiles: jsSrcPath,
      },
      watch: {
        cssFiles: [
          compassPath + '/images/**/*.+(gif|jpg|png|svg)',
          compassPath + '/sass/**/*.scss'
        ],
        jsFiles: [
          jsSrcPath + '/**/*.js',
        ],
        jsTemplateFiles: [
          jsSrcPath + '/**/*.ojst',
        ],
      },
    },

    panel: {
      inherits: 'common',
      buildCss: {
        compassCssDir: webPath + '/s_dev/css',
        compassOutputStyle: 'expanded',
        compassSpecify: compassPath + '/sass/panel.scss',
      },
      compileCss: {
        compassCssDir: webPath + '/s/css',
        compassOutputStyle: 'compressed',
        compassSpecify: compassPath + '/sass/panel.scss',
      },
      checkJsRequires: {
        inputFiles: [
          jsSrcPath + '/apps/panel',
          jsSrcPath + '/apps/devi.js',
          jsSrcPath + '/dev',
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
      buildJs: {
        cacheFile: rootPath + '/tmp/paneldev.cache',
        defines: {
          'goog.DEBUG': true,
        },
        googPath: jsContribSrcPath + '/closure-library/closure/goog',
        inputFiles: [
          jsContribSrcPath + '/closure-library/closure/goog',
          jsContribSrcPath + '/closure-library/third_party/closure/goog',
          jsContribSrcPath + '/napp',
          jsContribSrcPath + '/npf',
          jsContribSrcPath + '/ojster',
          jsSrcPath + '/apps/panel',
          jsSrcPath + '/apps/devi.js',
          jsSrcPath + '/dev',
        ],
        outputFile: jsDevPath + '/panel.js',
      },
      compileJs: {
        cacheFile: rootPath + '/tmp/panel.cache',
        files: [
          jsContribSrcPath + '/closure-library/closure/goog',
          jsContribSrcPath + '/closure-library/third_party/closure/goog',
          jsContribSrcPath + '/napp',
          jsContribSrcPath + '/npf',
          jsContribSrcPath + '/ojster',
          jsSrcPath + '/apps/panel',
          jsSrcPath + '/apps/devi.js',
          jsSrcPath + '/dev',
        ],
        inputFiles: [
          jsSrcPath + '/apps/panel/init.js',
        ],
        outputFile: jsPath + '/panel.js',
      },
    },
  };
};
