/**
 * @fileoverview Externs for SockJS 0.2
 * @see http://sockjs.com/
 * @externs
 */

/**
 * @param {string} url
 * @param {string|Array=} opt_depProtocolsWhitelist
 * @param {Object=} opt_options debug: boolean, devel: boolean, protocols_whitelist: string|Array.<string>
 * @constructor
 */
var SockJS = function(url, opt_depProtocolsWhitelist, opt_options) {};

/**
 * @type {string}
 * @const
 */
SockJS.version;

/**
 * @type {number}
 * @const
 */
SockJS.CONNECTING;

/**
 * @type {number}
 * @const
 */
SockJS.OPEN;

/**
 * @type {number}
 * @const
 */
SockJS.CLOSING;

/**
 * @type {number}
 * @const
 */
SockJS.CLOSED;

/**
 * @type {string}
 */
SockJS.prototype.protocol;

/**
 * @type {number}
 */
SockJS.prototype.readyState;

/**
 * @type {?function(SockJS.Event)}
 */
SockJS.prototype.onopen;

/**
 * @type {?function(SockJS.Event)}
 */
SockJS.prototype.onmessage;

/**
 * @type {?function(SockJS.Event)}
 */
SockJS.prototype.onclose;

/**
 * @param {number=} opt_code
 * @param {string=} opt_reason
 */
SockJS.prototype.close = function(opt_code, opt_reason) {};

/**
 * @param {string} data
 */
SockJS.prototype.send = function(data) {};

/**
 * @constructor
 */
SockJS.Event = function() {};

/**
 * @type {string}
 */
SockJS.Event.prototype.type;

/**
 * @type {Object}
 */
SockJS.Event.prototype.data;
