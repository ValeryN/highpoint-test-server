goog.require('goog.events.EventWrapper');
goog.require('goog.locale');
goog.require('dev.Application');
goog.require('devi.Application');


var devPanelInstall = function() {
  dev.Application.protectAndRun(function() {
    goog.locale.setLocale(goog.LOCALE);

    /** @type {!devi.Application} */
    var application = devi.Application.install();
    application.init();
  });
};

goog.exportSymbol('devPanelInstall', devPanelInstall);
