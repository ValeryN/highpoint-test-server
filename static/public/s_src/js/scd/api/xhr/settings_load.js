goog.provide('dev.api.xhr.SettingsLoad');

goog.require('goog.object');
goog.require('dev.api.JsonParser');
goog.require('dev.api.Xhr');


/**
 * @constructor
 * @extends {dev.api.Xhr}
 */
dev.api.xhr.SettingsLoad = function() {
  dev.api.xhr.SettingsLoad.base(this, 'constructor');

  /** @private {Array.<dev.dataTypes.Tab>} */
  this._tabs = null;
  /** @private {Object} */
  this._valuesMap = null;
};
goog.inherits(dev.api.xhr.SettingsLoad, dev.api.Xhr);


/** @inheritDoc */
dev.api.xhr.SettingsLoad.prototype.getUri = function() {
  return this.generateUri('/developer/settings');
};

/** @inheritDoc */
dev.api.xhr.SettingsLoad.prototype.onComplete = function(xhr, resolve) {
  var json = xhr.getResponseJson();

  if (goog.isObject(json)) {
    var jsonTabs = json['tabs'];
    var jsonValues = json['values'];

    if (goog.isObject(jsonValues)) {
      goog.object.forEach(jsonValues, function(value, key) {
        if (!this._valuesMap) {
          this._valuesMap = {};
        }

        this._valuesMap[key] = value;
      }, this);
    }

    this._tabs = dev.api.JsonParser.getInstance().getTabs(jsonTabs);
  }

  resolve();
};

/**
 * @return {Array.<dev.dataTypes.Tab>}
 */
dev.api.xhr.SettingsLoad.prototype.getTabs = function() {
  return this._tabs;
};

/**
 * @return {Object}
 */
dev.api.xhr.SettingsLoad.prototype.getValuesMap = function() {
  return this._valuesMap;
};
