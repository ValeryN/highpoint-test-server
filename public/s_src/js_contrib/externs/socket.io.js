/**
 * @fileoverview Externs for socket.io
 * @see http://socket.io/
 * @externs
 */


/**
 * @type {!Object}
 */
var io = {};


/**
 * @type {number}
 */
io.protocol;

/**
 * Available transports, these will be populated with the available transports
 * @type {!Array.<string>}
 */
io.transports;

/**
 * @type {string}
 */
io.version;

/**
 * Manages connections to hosts.
 * @param {string} host
 * @param {Object=} opt_details
 * @return {io.SocketNamespace}
 */
io.connect = function(host, opt_details) {};

/**
 * Event emitter constructor.
 * @constructor
 */
io.EventEmitter = function() {};

/**
 * Adds a listener.
 * @param {string} name
 * @param {Function} fn
 * @return {!io.EventEmitter}
 */
io.EventEmitter.prototype.on = function(name, fn) {};

/**
 * Adds a listener.
 * @param {string} name
 * @param {Function} fn
 * @return {!io.EventEmitter}
 */
io.EventEmitter.prototype.addListener = function(name, fn) {};

/**
 * Adds a volatile listener.
 * @param {string} name
 * @param {Function} fn
 * @return {!io.EventEmitter}
 */
io.EventEmitter.prototype.once = function(name, fn) {};

/**
 * Removes a listener.
 * @param {string} name
 * @param {Function} fn
 * @return {!io.EventEmitter}
 */
io.EventEmitter.prototype.removeListener = function(name, fn) {};

/**
 * Removes all listeners for an event.
 * @param {string} name
 * @return {!io.EventEmitter}
 */
io.EventEmitter.prototype.removeAllListeners = function(name) {};

/**
 * Gets all listeners for a certain event.
 * @param {string} name
 * @return {Function|Array.<Function>}
 */
io.EventEmitter.prototype.listeners = function(name) {};

/**
 * Emits an event.
 * @param {string} name
 * @param {...*} var_args
 * @return {boolean}
 */
io.EventEmitter.prototype.emit = function(name, var_args) {};

/**
 * @type {!Object}
 */
io.JSON = {};

/**
 * The stringify method takes a value and an optional replacer, and an optional
 * space parameter, and returns a JSON text. The replacer can be a function
 * that can replace values, or an array of strings that will select the keys.
 * A default replacer method can be provided. Use of the space parameter can
 * produce text that is more easily readable.
 * @param {*} value
 * @param {Function|Array.<string>|number} replacer
 * @param {number|string} space
 * @return {string}
 * @throws {Error}
 */
io.JSON.stringify = function(value, replacer, space) {};

/**
 * The parse method takes a text and an optional reviver function, and returns
 * a JavaScript value if the text is a valid JSON text.
 * @param {string} text
 * @param {Function=} opt_reviver
 * @throws {SyntaxError}
 */
io.JSON.parse = function(text, opt_reviver) {};

/**
 * Create a new `Socket.IO client` which can establish a persistent
 * connection with a Socket.IO enabled server.
 * @param {Object=} opt_options
 * @constructor
 * @extends {io.EventEmitter}
 */
io.Socket = function(opt_options) {};

/**
 * @type {string}
 */
io.Socket.prototype.sessionid;

/**
 * Returns a namespace listener/emitter for this socket
 * @param {string} name
 * @return {io.SocketNamespace}
 */
io.Socket.prototype.of = function(name) {};

/**
 * Connects to the server.
 * @param {Function=} opt_fn
 * @return {io.Socket}
 */
io.Socket.prototype.connect = function(opt_fn) {};

/**
 * Sends a message.
 * @param {Object} data
 * @return {io.Socket}
 */
io.Socket.prototype.packet = function(data) {};

/**
 * Flushes the buffer data over the wire.
 * To be invoked manually when 'manualFlush' is set to true.
 */
io.Socket.prototype.flushBuffer = function() {};

/**
 * Disconnect the established connect.
 * @return {io.Socket}
 */
io.Socket.prototype.disconnect = function() {};

/**
 * Socket namespace constructor.
 * @param {io.Socket} socket
 * @param {string=} opt_name
 * @constructor
 */
io.SocketNamespace = function(socket, opt_name) {};

/**
 * @type {io.Socket}
 */
io.SocketNamespace.prototype.socket;

/**
 * @type {string}
 */
io.SocketNamespace.prototype.name;

/**
 * Adds a listener.
 * @param {string} name
 * @param {Function} fn
 * @return {!io.SocketNamespace}
 */
io.SocketNamespace.prototype.on = function(name, fn) {};

/**
 * Creates a new namespace, by proxying the request to the socket. This
 * allows us to use the synax as we do on the server.
 * @param {string} name
 * @return {!io.SocketNamespace}
 */
io.SocketNamespace.prototype.of = function(name) {};

/**
 * Sends a message.
 * @param {*} data
 * @param {Function=} opt_fn
 * @return {!io.SocketNamespace}
 */
io.SocketNamespace.prototype.send = function(data, opt_fn) {};

/**
 * Adds a listener.
 * @param {string} name
 * @param {Function} fn
 * @return {!io.SocketNamespace}
 */
io.SocketNamespace.prototype.addListener = function(name, fn) {};

/**
 * Adds a volatile listener.
 * @param {string} name
 * @param {Function} fn
 * @return {!io.SocketNamespace}
 */
io.SocketNamespace.prototype.once = function(name, fn) {};

/**
 * Removes a listener.
 * @param {string} name
 * @param {Function} fn
 * @return {!io.SocketNamespace}
 */
io.SocketNamespace.prototype.removeListener = function(name, fn) {};

/**
 * Removes all listeners for an event.
 * @param {string} name
 * @return {!io.SocketNamespace}
 */
io.SocketNamespace.prototype.removeAllListeners = function(name) {};

/**
 * Gets all listeners for a certain event.
 * @param {string} name
 * @return {Function|Array.<Function>}
 */
io.SocketNamespace.prototype.listeners = function(name) {};

/**
 * Emits an event.
 * @param {string} name
 * @param {Object=} opt_data
 * @return {!io.SocketNamespace}
 */
io.SocketNamespace.prototype.emit = function(name, opt_data) {};

/**
 * This is the transport template for all supported transport methods.
 * @param {io.Socket} socket
 * @param {string} sessionId
 * @constructor
 * @extends {io.EventEmitter}
 */
io.Transport = function(socket, sessionId) {};

/**
 * @type {io.Socket}
 */
io.Transport.prototype.socket;

/**
 * @type {string}
 */
io.Transport.prototype.sessid;

/**
 * @type {!Object}
 */
io.parser = {};

/**
 * Errors advice.
 * @type {!Array.<string>}
 */
io.parser.advice;

/**
 * Packet types.
 * @type {!Array.<string>}
 */
io.parser.packets;

/**
 * Errors reasons.
 * @type {!Array.<string>}
 */
io.parser.reasons;

/**
 * Decodes data payload. Detects multiple message.
 * @param {string} data
 * @return {Array.<string>}
 */
io.parser.decodePayload = function(data) {};

/**
 * Utilities namespace.
 * @type {!Object}
 */
io.util = {};

/**
 * Parses an URI.
 * @param {string} str
 * @return {!Object.<string,string>}
 */
io.util.parseUri = function(str) {};

/**
 * Produces a unique url that identifies a Socket.IO connection.
 * @param {Object} uri
 * @return {string}
 */
io.util.uniqueUri = function(uri) {};

/**
 * Mergest 2 query strings in to once unique query string.
 * @param {string} base
 * @param {string} addition
 * @return {string}
 */
io.util.query = function(base, addition) {};

/**
 * Transforms a querystring in to an object.
 * @param {string} qs
 * @return {!Object}
 */
io.util.chunkQuery = function(qs) {};

/**
 * Executes the given function when the page is loaded.
 * @example
 *   io.util.load(function () { console.log('page loaded'); });
 * @param {Function} fn
 */
io.util.load = function(fn) {};

/**
 * Defers a function to ensure a spinner is not displayed by the browser.
 * @param {Function} fn
 */
io.util.defer = function(fn) {};

/**
 * Merges two objects.
 * @param {Object} target
 * @param {Object} additional
 */
io.util.merge = function(target, additional) {};

/**
 * Merges prototypes from objects
 * @param {Function} ctor1
 * @param {Function} ctor2
 */
io.util.mixin = function(ctor1, ctor2) {};

/**
 * Checks if the given object is an Array.
 * @example
 *   io.util.isArray([]); // true
 *   io.util.isArray({}); // false
 * @param {*} obj
 * @return {boolean}
 */
io.util.isArray = function(obj) {};

/**
 * Intersects values of two arrays into a third.
 * @param {Array} arr
 * @param {Array} arr2
 * @return {Array}
 */
io.util.intersect = function(arr, arr2) {};

/**
 * Array indexOf compatibility.
 * @param {Array} arr
 * @param {*} o
 * @param {number} i
 * @return {number}
 */
io.util.indexOf = function(arr, o, i) {};

/**
 * Converts enumerables to array.
 * @param {Object} enu
 * @return {Array}
 */
io.util.toArray = function(enu) {};

/**
 * UA / engines detection namespace.
 * @type {!Object}
 */
io.util.ua = {};

/**
 * Whether the UA supports CORS for XHR.
 * @type {boolean}
 */
io.util.ua.hasCORS;

/**
 * Detect webkit.
 * @type {boolean}
 */
io.util.ua.webkit;

/**
 * Detect iPad/iPhone/iPod.
 * @type {boolean}
 */
io.util.ua.iDevice;
