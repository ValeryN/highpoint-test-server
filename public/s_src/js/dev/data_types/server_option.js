goog.provide('dev.dataTypes.ServerOption');


/**
 * @param {string} name
 * @param {*} value
 * @constructor
 */
dev.dataTypes.ServerOption = function(name, value) {
  /**
   * @type {string}
   */
  this.name = name;

  /**
   * @type {*}
   */
  this.value = value;
};
