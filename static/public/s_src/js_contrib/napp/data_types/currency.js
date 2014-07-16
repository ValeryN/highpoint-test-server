goog.provide('napp.dataTypes.Currency');


/**
 * @param {string} id
 * @constructor
 */
napp.dataTypes.Currency = function(id) {

  /**
   * @type {string}
   */
  this.id = id;
};


/**
 * @return {!napp.dataTypes.Currency}
 */
napp.dataTypes.Currency.prototype.clone = function() {
  return new napp.dataTypes.Currency(this.id);
};
