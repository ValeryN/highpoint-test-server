goog.provide('dev.dataTypes.Tab');


/**
 * @param {dev.dataTypes.Tab.Data} data
 * @constructor
 */
dev.dataTypes.Tab = function(data) {

  /**
   * @type {string}
   */
  this.name = data.name;

  /**
   * @type {!Array.<dev.dataTypes.Section>}
   */
  this.sections = data.sections;
};


/**
 * @typedef {{
 *  name: string,
 *  sections: !Array.<dev.dataTypes.Section>
 * }}
 */
dev.dataTypes.Tab.Data;
