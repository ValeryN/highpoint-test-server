goog.provide('devi.Application');

goog.require('dev.Application');
goog.require('dev.api.xhr.OptionUpdate');
goog.require('dev.api.xhr.SettingsLoad');
goog.require('dev.Panel');
goog.require('dev.panel.TabSection.EventType');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {dev.Application}
 */
devi.Application = function(opt_domHelper) {
  devi.Application.base(this, 'constructor', null, opt_domHelper);

  /**
   * @private {dev.Panel}
   */
  this._container = null;
};
goog.inherits(devi.Application, dev.Application);


/**
 * @private {devi.Application}
 */
devi.Application._instance = null;

/**
 * @return {!devi.Application}
 */
devi.Application.install = function() {
  devi.Application._instance = new devi.Application();

  return devi.Application._instance;
};

/**
 * @return {devi.Application}
 */
devi.Application.getInstance = function() {
  return devi.Application._instance;
};

/** @inheritDoc */
devi.Application.prototype.disposeInternal = function() {
  devi.Application.base(this, 'disposeInternal');

  this._container = null;
};

/** @inheritDoc */
devi.Application.prototype.initInternal = function() {
  devi.Application.base(this, 'initInternal');

  var loader = new dev.api.xhr.SettingsLoad();
  loader.send(function(r) {
    var loader = /** @type {dev.api.xhr.SettingsLoad} */ (r);

    if (!this.isDisposed()) {
      /** @type {Array.<dev.dataTypes.Tab>} */
      var tabs = loader.getTabs();
      /** @type {Object} */
      var valuesMap = loader.getValuesMap();

      this._container = new dev.Panel(tabs, valuesMap);
      this.registerDisposable(this._container);
      this._container.render();

      this._container.listen(
        dev.panel.TabSection.EventType.SETTING_UPDATE,
        this._onSettingUpdate, false, this);
    }
  }, this);
};

/**
 * @param {dev.panel.TabSectionSettingEvent} evt
 * @private
 */
devi.Application.prototype._onSettingUpdate = function(evt) {
  /** @type {string} */
  var type = evt.settingType;
  /** @type {*} */
  var value = evt.value;

  var loader = new dev.api.xhr.OptionUpdate(type, value);
  loader.send();
};
