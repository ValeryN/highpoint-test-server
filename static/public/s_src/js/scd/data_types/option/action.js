goog.provide('dev.dataTypes.option.Action');

goog.require('dev.dataTypes.Option');
goog.require('dev.dataTypes.Option.Type');


/**
 * @param {dev.dataTypes.option.Action.Data} data
 * @constructor
 * @extends {dev.dataTypes.Option}
 */
dev.dataTypes.option.Action = function(data) {
  dev.dataTypes.option.Action.base(this, 'constructor', {
    name: data.name,
    type: dev.dataTypes.Option.Type.ACTION
  });

  /**
   * @type {!Object}
   */
  this.value = data.value;
};
goog.inherits(dev.dataTypes.option.Action, dev.dataTypes.Option);


/**
 * @typedef {{
 *  name: string,
 *  value: !Object
 * }}
 */
dev.dataTypes.option.Action.Data;
