var ClientMessage = require('../components/socket').ClientMessage;


/**
 * @param {ClientMessage} message
 * @param {Arguments} params
 */
var log = function(message, params) {
  console.log('Socket message from client: ' + message, params);
};


/**
 * @param {Object} app
 * @param {Socket} socket
 * @param {number} callId
 */
exports.accept = function(app, socket, callId) {
  log(ClientMessage.CALL_ACCEPT, Array.prototype.slice.call(arguments, 2));
};

/**
 * @param {Object} app
 * @param {Socket} socket
 * @param {number} callId
 */
exports.cancel = function(app, socket, callId) {
  log(ClientMessage.CALL_CANCEL, Array.prototype.slice.call(arguments, 2));
};

/**
 * @param {Object} app
 * @param {Socket} socket
 */
exports.escape = function(app, socket) {
  log(ClientMessage.CALL_ESCAPE, Array.prototype.slice.call(arguments, 2));
};

/**
 * @param {Object} app
 * @param {Socket} socket
 * @param {ChatMessage} chatMessage
 * @param {number} createdAt
 */
exports.message = function(app, socket, chatMessage, createdAt) {
  log(ClientMessage.CALL_MESSAGE, Array.prototype.slice.call(arguments, 2));
};

/**
 * @param {Object} app
 * @param {Socket} socket
 * @param {number} callId
 */
exports.reject = function(app, socket, callId) {
  log(ClientMessage.CALL_REJECT, Array.prototype.slice.call(arguments, 2));
};

/**
 * @param {Object} app
 * @param {Socket} socket
 */
exports.stop = function(app, socket) {
  log(ClientMessage.CALL_STOP, Array.prototype.slice.call(arguments, 2));
};

/**
 * @param {Object} app
 * @param {Socket} socket
 */
exports.typingFinish = function(app, socket) {
  log(ClientMessage.CALL_TYPING_FINISH, Array.prototype.slice.call(arguments, 2));
};

/**
 * @param {Object} app
 * @param {Socket} socket
 */
exports.typingStart = function(app, socket) {
  log(ClientMessage.CALL_TYPING_START, Array.prototype.slice.call(arguments, 2));
};
