goog.provide('dev.api.xhr.ActionSend');

goog.require('goog.Uri.QueryData');
goog.require('dev.api.Xhr');


/**
 * @param {!Object} data
 * @constructor
 * @extends {dev.api.Xhr}
 */
dev.api.xhr.ActionSend = function(data) {
  dev.api.xhr.ActionSend.base(this, 'constructor');

  /** @private {!Object} */
  this._data = data;
};
goog.inherits(dev.api.xhr.ActionSend, dev.api.Xhr);


/** @inheritDoc */
dev.api.xhr.ActionSend.prototype.getContent = function() {
  return goog.Uri.QueryData.createFromMap(this._data).toString();
};

/** @inheritDoc */
dev.api.xhr.ActionSend.prototype.getMethod = function() {
  return 'POST';
};

/** @inheritDoc */
dev.api.xhr.ActionSend.prototype.getUri = function() {
  return this.generateUri('/developer/send');
};
