goog.provide('dev.dataTypes.Section');


/**
 * @param {dev.dataTypes.Section.Data} data
 * @constructor
 */
dev.dataTypes.Section = function(data) {

  /**
   * @type {string}
   */
  this.name = data.name;

  /**
   * @type {!Array.<dev.dataTypes.Option>}
   */
  this.options = data.options;
};


/**
 * @typedef {{
 *  name: string,
 *  options: !Array.<dev.dataTypes.Option>
 * }}
 */
dev.dataTypes.Section.Data;
