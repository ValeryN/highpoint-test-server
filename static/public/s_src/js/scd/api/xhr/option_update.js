goog.provide('dev.api.xhr.OptionUpdate');

goog.require('goog.Uri.QueryData');
goog.require('goog.json');
goog.require('dev.api.Xhr');


/**
 * @param {string} type
 * @param {*} value
 * @constructor
 * @extends {dev.api.Xhr}
 */
dev.api.xhr.OptionUpdate = function(type, value) {
  dev.api.xhr.OptionUpdate.base(this, 'constructor');

  /** @private {string} */
  this._type = type;
  /** @private {*} */
  this._value = value;
};
goog.inherits(dev.api.xhr.OptionUpdate, dev.api.Xhr);


/** @inheritDoc */
dev.api.xhr.OptionUpdate.prototype.getContent = function() {
  return goog.Uri.QueryData.createFromMap({
    'key': this._type,
    'value': goog.json.serialize(this._value)
  }).toString();
};

/** @inheritDoc */
dev.api.xhr.OptionUpdate.prototype.getMethod = function() {
  return 'PUT';
};

/** @inheritDoc */
dev.api.xhr.OptionUpdate.prototype.getUri = function() {
  return this.generateUri('/developer/settings/option');
};
