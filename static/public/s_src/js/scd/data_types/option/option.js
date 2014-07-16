goog.provide('dev.dataTypes.Option');
goog.provide('dev.dataTypes.Option.Type');

goog.require('goog.object');


/**
 * @param {dev.dataTypes.Option.Data} data
 * @constructor
 */
dev.dataTypes.Option = function(data) {

  /**
   * @type {string}
   */
  this.name = data.name;

  /**
   * @type {dev.dataTypes.Option.Type}
   */
  this.type = data.type;
};


/**
 * @typedef {{
 *  name: string,
 *  type: dev.dataTypes.Option.Type
 * }}
 */
dev.dataTypes.Option.Data;

/**
 * @enum {string}
 */
dev.dataTypes.Option.Type = {
  ACTION: 'action',
  RADIO: 'radio'
};

/**
 * @param {*} type
 * @return {dev.dataTypes.Option.Type?}
 */
dev.dataTypes.Option.getType = (function() {
  var map = goog.object.transpose(dev.dataTypes.Option.Type);

  return function(type) {
    return goog.isString(type) && map[type] ?
      /** @type {dev.dataTypes.Option.Type} */ (type) : null;
  }
})();
