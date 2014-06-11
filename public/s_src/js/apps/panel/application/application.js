goog.provide('devi.Application');

goog.require('dev.Application');
goog.require('dev.Developer');


/**
 * @param {devi.application.Settings} settings
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {dev.Application}
 */
devi.Application = function(settings, opt_domHelper) {
  devi.Application.base(this, 'constructor', settings, opt_domHelper);
};
goog.inherits(devi.Application, dev.Application);


/**
 * @private {devi.Application}
 */
devi.Application._instance = null;

/**
 * @param {devi.application.Settings} settings
 * @return {!devi.Application}
 */
devi.Application.install = function(settings) {
  devi.Application._instance = new devi.Application(settings);
  return devi.Application._instance;
};

/**
 * @return {devi.Application}
 */
devi.Application.getInstance = function() {
  return devi.Application._instance;
};


/** @inheritDoc */
devi.Application.prototype.initInternal = function() {
  devi.Application.base(this, 'initInternal');

  var developer = new dev.Developer();
  this.registerDisposable(developer);
  developer.init();
};
