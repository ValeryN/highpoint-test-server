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
 * @param {number} userId
 * @param {ChatMessage} chatMessage
 * @param {number} createdAt
 */
exports.message = function(app, socket, userId, chatMessage, createdAt) {
  log(ClientMessage.CONTACT_MESSAGE, Array.prototype.slice.call(arguments, 2));
};

/**
 * @param {Object} app
 * @param {Socket} socket
 * @param {number} userId
 */
exports.messageRead = function(app, socket, userId) {
  log(ClientMessage.CONTACT_MESSAGE_READ, Array.prototype.slice.call(arguments, 2));
};

/**
 * @param {Object} app
 * @param {Socket} socket
 * @param {number} userId
 */
exports.typingFinish = function(app, socket, userId) {
  log(ClientMessage.CONTACT_TYPING_FINISH, Array.prototype.slice.call(arguments, 2));
};

/**
 * @param {Object} app
 * @param {Socket} socket
 * @param {number} userId
 */
exports.typingStart = function(app, socket, userId) {
  log(ClientMessage.CONTACT_TYPING_START, Array.prototype.slice.call(arguments, 2));
};
