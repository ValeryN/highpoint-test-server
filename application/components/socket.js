var util = require('util');

var models = require('../model');


/**
 * @param {io} io
 * @constructor
 */
var Socket = module.exports = function(io) {
  this._io = io;
};


/**
 * @enum {string}
 */
Socket.ClientMessage = {

  /**
   * Закончилась активность пользователя.
   */
  ACTIVITY_END: 'activity_end',

  /**
   * Началась активность пользователя.
   */
  ACTIVITY_START: 'activity_start',

  /**
   * Сообщение пользователю.
   * userId (number)
   * chatMessage (!MessageBody)
   * createAt (!goog.date.DateTime)
   */
  MESSAGE: 'message',

  /**
   * Прочтение сообщений от пользователя.
   * userId (number)
   */
  MESSAGE_READ: 'message_read',

  /**
   * Текущий пользователь закончил печатать сообщение для пользователя.
   * userId (number)
   */
  TYPING_FINISH: 'typing_finish',

  /**
   * Текущий пользователь начал печатать сообщение для пользователя.
   * userId (number)
   */
  TYPING_START: 'typing_start',

  /**
   * Прочтение уведомления.
   * notificationId (number)
   */
  NOTIFICATION_READ: 'notification_read'
};


/**
 * @enum {string}
 */
Socket.ServerMessage = {

  /**
   * Закрытие соединения.
   * reason (string) Пока только 'new_session'
   */
  CLOSE: 'close',

  /**
   * Новое сообщение от пользователя.
   * userId (number) Идентификатор пользователя, от которого пришло сообщение.
   * chatMessage (!MessageBody)
   * createdAt (!goog.date.DateTime)
   */
  MESSAGE: 'message',

  /**
   * Ошибка при принятии нового сообщения от пользователя
   * userId (number) Идентификатор пользователя, от которого пришло сообщение.
   * chatMessage (!Messagebody)
   * createdAt (!goog.date.DateTime)
   * reason (string) 'banned', 'ratelimit', 'not_in_contacts', 'duplicate'
   */
  MESSAGE_ERROR: 'message_error',

  /**
   * Сообщение прочитано.
   * userId (number)
   * readAt (!goog.date.DateTime)
   */
  MESSAGE_READ: 'message_read',

  /**
   * Сообщение отправлено пользователю.
   * userId (number) Идентификатор пользователя, который отправил сообщение.
   * chatMessage (!MessageBody)
   * createdAt (!goog.date.DateTime)
   */
  MESSAGE_SENT: 'message_sent',

  /**
   * Обновлена часть данных текущего пользователя.
   * data (Object)
   */
  ME_UPDATE: 'update_current_user',

  /**
   * Новое уведомление
   * notification (Notification)
   */
  NOTIFICATION: 'notification'
};


var pad = function(num, length) {
  var s = String(num);

  return new Array(Math.max(0, length - s.length) + 1).join('0') + s;
};

var createIsoDate = function(date) {
  return util.format('%s-%s-%s %s:%s:%s',
    pad(date.getFullYear(), 4),
    pad(date.getMonth() + 1, 2),
    pad(date.getDate(), 2),
    pad(date.getHours(), 2),
    pad(date.getMinutes(), 2),
    pad(date.getSeconds(), 2)
  );
};

var createBan = function(reason, from, to) {
  return {
    finish_at: createIsoDate(to),
    reason: reason,
    start_at: createIsoDate(from),
  };
};

/**
 * @param {string=} opt_reason
 */
Socket.prototype.close = function(opt_reason) {
  var reason = opt_reason || 'new_session';
  this._io.sockets.emit(Socket.ServerMessage.CLOSE, reason);
};

/**
 * @param {number=} opt_userId
 * @param {number=} opt_chatMessageIndex
 */
Socket.prototype.message = function(opt_userId, opt_chatMessageIndex) {
  var userId = opt_userId || models.contactUsers.getRandom().id;
  var chatMessage = undefined === opt_chatMessageIndex
    ? models.chatMessages.getRandom()
    : models.chatMessages.getAt(opt_chatMessageIndex);

  if (chatMessage) {
    this._io.sockets.emit(
      Socket.ServerMessage.MESSAGE, userId, chatMessage, +(new Date()));
  }
};

/**
 * @param {number=} opt_userId
 * @param {number=} opt_chatMessageIndex
 * @param {string=} opt_reason
 */
Socket.prototype.messageError = function(opt_userId,
    opt_chatMessageIndex, opt_reason) {
  var userId = opt_userId || models.contactUsers.getRandom().id;
  var chatMessage = undefined === opt_chatMessageIndex
    ? models.chatMessages.getRandom()
    : models.chatMessages.getAt(opt_chatMessageIndex);
  var reason = opt_reason || 'banned';

  if (chatMessage) {
    this._io.sockets.emit(Socket.ServerMessage.MESSAGE_ERROR, userId,
      chatMessage, +(new Date()), reason);
  }
};

/**
 * @param {number=} opt_userId
 */
Socket.prototype.messageRead = function(opt_userId) {
  var userId = opt_userId || models.contactUsers.getRandom().id;

  this._io.sockets.emit(
    Socket.ServerMessage.MESSAGE_READ, userId, +(new Date()));
};

/**
 * @param {number=} opt_userId
 * @param {number=} opt_chatMessageIndex
 */
Socket.prototype.messageSent = function(opt_userId,
    opt_chatMessageIndex) {
  var userId = opt_userId || models.contactUsers.getRandom().id;
  var chatMessage = undefined === opt_chatMessageIndex
    ? models.chatMessages.getRandom()
    : models.chatMessages.getAt(opt_chatMessageIndex);

  if (chatMessage) {
    this._io.sockets.emit(
      Socket.ServerMessage.MESSAGE_SENT, userId, chatMessage, +(new Date()));
  }
};

/**
 * @param {number=} opt_userId
 */
Socket.prototype.typingFinish = function(opt_userId) {
  var userId = opt_userId || models.contactUsers.getRandom().id;
  this._io.sockets.emit(Socket.ServerMessage.TYPING_FINISH, userId);
};

/**
 * @param {number=} opt_userId
 */
Socket.prototype.typingStart = function(opt_userId) {
  var userId = opt_userId || models.contactUsers.getRandom().id;
  this._io.sockets.emit(Socket.ServerMessage.TYPING_START, userId);
};

Socket.prototype.meUpdate = function() {
  this._io.sockets.emit(Socket.ServerMessage.ME_UPDATE, {
    name: 'Паша'
  });
};

/**
 * @param {number=} opt_notificationId
 */
Socket.prototype.notification = function(opt_notificationId) {
  var notification = opt_notificationId ?
    models.notifications.get(opt_notificationId) : models.notifications.getRandom();

  if (notification) {
    this._io.sockets.emit(Socket.ServerMessage.NOTIFICATION, notification);
  }
};
