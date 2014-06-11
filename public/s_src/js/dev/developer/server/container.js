goog.provide('dev.developer.server.Container');

goog.require('goog.Uri');
goog.require('goog.Uri.QueryData');
goog.require('goog.json');
goog.require('goog.object');
goog.require('npf.net.XhrIo2');
goog.require('dev.api.JsonParser');
goog.require('dev.dataTypes.ServerSetting');
goog.require('dev.developer.server.Section');
goog.require('dev.developer.ui.Container');
goog.require('devi');
goog.require('dev.developer.server.TabPanel');


/**
 * @param {dev.developer.ui.container.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {dev.developer.ui.Container}
 */
dev.developer.server.Container = function(opt_renderer, opt_domHelper) {
  dev.developer.server.Container.base(
    this, 'constructor', opt_renderer, opt_domHelper);

  /**
   * @private {Array.<dev.dataTypes.ServerSetting>}
   */
  this._settings = null;

  /**
   * @type {Object.<dev.dataTypes.ServerSetting.Type,*>}
   * @private
   */
  this._settingValuesMap = null;

  /** @type {goog.Uri} */
  var uri = new goog.Uri(devi.SERVER_PATH + '/developer/settings');
  npf.net.XhrIo2.send(uri, goog.bind(this._onSettingsLoad, this));
};
goog.inherits(dev.developer.server.Container, dev.developer.ui.Container);


/** @inheritDoc */
dev.developer.server.Container.prototype.createDom = function() {
  dev.developer.server.Container.base(this, 'createDom');

  this._applySettings();
};

/** @inheritDoc */
dev.developer.server.Container.prototype.disposeInternal = function() {
  dev.developer.server.Container.base(this, 'disposeInternal');

  this._settings = null;
  this._settingValuesMap = null;
};

/** @inheritDoc */
dev.developer.server.Container.prototype.createTabPanel = function() {
  return new dev.developer.server.TabPanel();
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
dev.developer.server.Container.prototype._onSettingsLoad = function(evt) {
  var xhr = /** @type {npf.net.XhrIo2} */ (evt.target);

  if (!this.isDisposed() && xhr && xhr.isSuccess()) {
    var json = xhr.getResponseJson();

    if (goog.isObject(json)) {
      var jsonSettings = json['options'];
      var jsonValues = json['values'];
      /** @type {!Object.<dev.dataTypes.ServerSetting.Type,*>} */
      var values = {};

      if (goog.isObject(jsonValues)) {
        goog.object.forEach(jsonValues, function(value, jsonType) {
          /** @type {dev.dataTypes.ServerSetting.Type?} */
          var type = dev.dataTypes.ServerSetting.getType(jsonType);

          if (type) {
            values[type] = value;
          }
        }, this);

        this._settingValuesMap = values;
      }

      this._settings =
        dev.api.JsonParser.getInstance().getServerSettings(jsonSettings);
      this._applySettings();
    }
  }
};

/**
 * @private
 */
dev.developer.server.Container.prototype._applySettings = function() {
  var tabPanel = /** @type {dev.developer.server.TabPanel} */ (
    this.getTabPanel());

  if (tabPanel && this._settings) {
    tabPanel.setSettings(this._settings, this._settingValuesMap);
    this.listen(dev.developer.server.Section.EventType.SETTING_UPDATE,
      this._onSettingUpdate);
  }
};

/**
 * @param {dev.developer.server.SectionSettingEvent} evt
 * @private
 */
dev.developer.server.Container.prototype._onSettingUpdate = function(evt) {
  /** @type {dev.dataTypes.ServerSetting.Type} */
  var type = evt.settingType;
  /** @type {*} */
  var value = evt.value;
  /** @type {goog.Uri} */
  var uri = new goog.Uri(devi.SERVER_PATH + '/developer/settings/option');
  /** @type {string} */
  var content = goog.Uri.QueryData.createFromMap({
    'key': type,
    'value': goog.json.serialize(value)
  }).toString();
  npf.net.XhrIo2.send(uri, goog.nullFunction, 'POST', content);
};
