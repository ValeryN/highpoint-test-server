goog.provide('dev.Application');

goog.require('goog.debug.ErrorReporter');
goog.require('goog.events.EventHandler');
goog.require('npf.Application');
goog.require('npf.net.XhrIo2');


/**
 * @param {npf.application.Settings} settings
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.Application}
 */
dev.Application = function(settings, opt_domHelper) {
  dev.Application.base(this, 'constructor', settings, opt_domHelper);

  /**
   * @type {goog.events.EventHandler.<!dev.Application>}
   */
  this._handler = new goog.events.EventHandler(this);
  this.registerDisposable(this._handler);
};
goog.inherits(dev.Application, npf.Application);


/**
 * @param {Function} func
 */
dev.Application.protectAndRun = function(func) {
  /** @type {function(!Error,!Object.<string>)|undefined} */
  var errorContextProvider;

  if (goog.DEBUG) {
    errorContextProvider = function(error, context) {
      if (goog.global.console && error) {
        goog.global.console.error(error.stack);
      }
    }
  }

  /** @type {goog.debug.ErrorReporter} */
  var errorReporter = goog.debug.ErrorReporter.install(
    '', errorContextProvider);
  errorReporter.setXhrSender(dev.Application.xhrSender);
  var funcWrapper = errorReporter.protectAdditionalEntryPoint(func);

  if (funcWrapper) {
    funcWrapper();
  } else {
    func();
  }
};

/**
 * @param {string|goog.Uri} url
 * @param {string=} opt_method
 * @param {ArrayBuffer|Blob|Document|FormData|string=} opt_content
 * @param {Object|goog.structs.Map=} opt_headers
 */
dev.Application.xhrSender = function(url, opt_method, opt_content,
    opt_headers) {
  npf.net.XhrIo2.send(url, null, opt_method, opt_content, opt_headers);
};

/** @inheritDoc */
dev.Application.prototype.disposeInternal = function() {
  dev.Application.base(this, 'disposeInternal');

  this._handler = null;
};

/**
 * @return {goog.events.EventHandler.<!dev.Application>}
 */
dev.Application.prototype.getHandler = function() {
  return this._handler;
};
