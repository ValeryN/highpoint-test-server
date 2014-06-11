goog.provide('napp.api.Server');

goog.require('goog.events.EventTarget');
goog.require('napp.api.server.JsonParser');


/**
 * @param {napp.api.server.JsonParser=} opt_jsonParser
 * @constructor
 * @extends {goog.events.EventTarget}
 */
napp.api.Server = function(opt_jsonParser) {
  napp.api.Server.base(this, 'constructor');

  /**
   * @private {napp.api.server.JsonParser}
   */
  this.jsonParser_ = opt_jsonParser || null;
};
goog.inherits(napp.api.Server, goog.events.EventTarget);


/** @inheritDoc */
napp.api.Server.prototype.disposeInternal = function() {
  napp.api.Server.base(this, 'disposeInternal');

  this.jsonParser_ = null;
};

/**
 * @return {napp.api.server.JsonParser}
 */
napp.api.Server.prototype.getJsonParser = function() {
  return this.jsonParser_;
};

/**
 * @param {napp.api.server.JsonParser} jsonParser
 */
napp.api.Server.prototype.setJsonParser = function(jsonParser) {
  this.jsonParser_ = jsonParser;
};
