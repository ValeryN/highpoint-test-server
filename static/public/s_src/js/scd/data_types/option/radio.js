goog.provide('dev.dataTypes.option.Radio');

goog.require('dev.dataTypes.Option');
goog.require('dev.dataTypes.Option.Type');


/**
 * @param {dev.dataTypes.option.Radio.Data} data
 * @constructor
 * @extends {dev.dataTypes.Option}
 */
dev.dataTypes.option.Radio = function(data) {
  dev.dataTypes.option.Radio.base(this, 'constructor', {
    name: data.name,
    type: dev.dataTypes.Option.Type.RADIO
  });

  /**
   * @type {string}
   */
  this.key = data.key;

  /**
   * @type {!Array.<dev.dataTypes.option.Radio.Item>}
   */
  this.items = data.items;
};
goog.inherits(dev.dataTypes.option.Radio, dev.dataTypes.Option);


/**
 * @typedef {{
 *  key: string,
 *  items: !Array.<dev.dataTypes.option.Radio.Item>,
 *  name: string
 * }}
 */
dev.dataTypes.option.Radio.Data;

/**
 * @typedef {{
 *  name: string,
 *  value: *
 * }}
 */
dev.dataTypes.option.Radio.Item;
