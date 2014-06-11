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
 */
exports.activityEnd = function(app, socket) {
  log(ClientMessage.ACTIVITY_END, arguments);
};

/**
 * @param {Object} app
 * @param {Socket} socket
 */
exports.activityStart = function(app, socket) {
  log(ClientMessage.ACTIVITY_START, Array.prototype.slice.call(arguments, 2));
};

/**
 * @param {Object} app
 * @param {Socket} socket
 * @param {number} notificationId
 */
exports.notificationRead = function(app, socket, notificationId) {
  log(ClientMessage.NOTIFICATION_READ, Array.prototype.slice.call(arguments, 2));
};
