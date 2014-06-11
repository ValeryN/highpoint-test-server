goog.provide('dev.dataTypes.Ban');
goog.provide('dev.dataTypes.Ban.Data');
goog.provide('dev.dataTypes.Ban.Type');


/**
 * @param {dev.dataTypes.Ban.Data} data
 * @constructor
 */
dev.dataTypes.Ban = function(data) {

  /**
   * @type {!goog.date.DateTime}
   */
  this.finishAt = data.finishAt;

  /**
   * Причина бана, которая отображается пользователю.
   * @type {string}
   */
  this.reason = data.reason;

  /**
   * @type {!goog.date.DateTime}
   */
  this.startAt = data.startAt;

  /**
   * @type {dev.dataTypes.Ban.Type}
   */
  this.type = data.type;
};


/**
 * @typedef {{
 *  finishAt: !goog.date.DateTime,
 *  reason: string,
 *  startAt: !goog.date.DateTime,
 *  type: dev.dataTypes.Ban.Type
 * }}
 */
dev.dataTypes.Ban.Data;


/**
 * @enum {number}
 */
dev.dataTypes.Ban.Type = {
  FULL: 1, // Полный бан
  INCOGNITO: 2 // Бан на общение в анонимном чате
};


/**
 * @return {!dev.dataTypes.Ban}
 */
dev.dataTypes.Ban.prototype.clone = function() {
  return new dev.dataTypes.Ban({
    finishAt: this.finishAt,
    reason: this.reason,
    startAt: this.startAt,
    type: this.type
  });
};
