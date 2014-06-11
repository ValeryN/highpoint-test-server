goog.require('goog.array');
goog.require('goog.events.EventWrapper');
goog.require('goog.locale');
goog.require('dev.Application');
goog.require('devi.Application');
goog.require('devi.application.Settings');


var devPanelInstall = function() {
  dev.Application.protectAndRun(function() {
    goog.locale.setLocale(goog.LOCALE);

    /** @type {devi.application.Settings} */
    var settings = new devi.application.Settings();

    if (settings.parse({})) {
      /** @type {!devi.Application} */
      var application = devi.Application.install(settings);
      application.init();
    } else if (goog.global.console) {
      /** @type {Array.<string>} */
      var undefinedSettings = settings.getUndefinedSettings();
      /** @type {!Array.<string>} */
      var message = [];

      if (undefinedSettings) {
        message = goog.array.map(undefinedSettings, function(optionName) {
          return 'Option ' + optionName + ' is undefined.';
        });
      }

      message.push('Application is stopped.');

      goog.global.console.log(message.join('\n'));
    }
  });
};

goog.exportSymbol('devPanelInstall', devPanelInstall);
