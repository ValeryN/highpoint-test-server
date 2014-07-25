var util = require('util');

var models = require('../model');
var date = require('../core/date');


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
  ACTIVITY_END: 'activityEnd',

  /**
   * Началась активность пользователя.
   */
  ACTIVITY_START: 'activityStart',

   /**
   * Прочтение всех уведомлений.
   */
  ALL_NOTIFICATIONS_READ: 'allNotificationsRead',

  /**
   * Прочтение сообщений от пользователя.
   */
  MESSAGES_READ: 'messagesRead',

  /**
   * Прочтение уведомления.
   * notificationId (number)
   */
  NOTIFICATION_READ: 'notificationRead',

  /**
   * Сообщение пользователю.
   */
  SEND_MESSAGE: 'sendMessage',

  /**
   * Текущий пользователь закончил печатать сообщение для пользователя.
   */
  TYPING_FINISH: 'typingFinish',

  /**
   * Текущий пользователь начал печатать сообщение для пользователя.
   */
  TYPING_START: 'typingStart',
};


/**
 * @enum {string}
 */
Socket.ServerMessage = {

  /**
   * Ошибка.
   */
  ERROR: 'error',

  /**
   * Обновлена часть данных текущего пользователя.
   */
  ME_UPDATE: 'meUpdate',

  /**
   * Новое сообщение от пользователя.
   */
  MESSAGE: 'message',

  /**
   * Сообщение отправлено.
   */
  MESSAGE_SENT: 'messageSent',

  /**
   * Сообщения прочитаны.
   */
  MESSAGES_READ: 'messagesRead',

  /**
   * Обновление настроек текущего пользователя.
   */
  MY_SETTINGS_UPDATE: 'mySettingsUpdate',

  /**
   * Новое уведомление.
   */
  NOTIFICATION: 'notification',

  /**
   * Перезагрузка приложения.
   */
  RELOAD: 'reload',

  /**
   * Пользователь закончил писать сообщение.
   */
  TYPING_FINISH: 'typingFinish',

  /**
   * Пользователь начал писать сообщение.
   */
  TYPING_START: 'typingStart',

  /**
   * Пользователь ушел в оффлайн.
   */
  USER_OFFLINE: 'userOffline',

  /**
   * Пользователь появился в онлайне.
   */
  USER_ONLINE: 'userOnline'
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


Socket.prototype.meUpdate = function() {
  this._io.sockets.emit(Socket.ServerMessage.ME_UPDATE, {
    user: models.myUsers.get(1)
  });
};

/**
 * @param {Message} message
 */
Socket.prototype.message = function(message) {
  this._io.sockets.emit(Socket.ServerMessage.MESSAGE, {
    message: message
  });
};

/**
 * @param {Message} message
 */
Socket.prototype.messageSent = function(message) {
  this._io.sockets.emit(Socket.ServerMessage.MESSAGE_SENT, {
    message: message
  });
};

/**
 * @param {number} userId
 * @param {Date=} opt_date
 */
Socket.prototype.messagesRead = function(userId, opt_date) {
  var date = opt_date || new Date();

  this._io.sockets.emit(Socket.ServerMessage.MESSAGES_READ, {
    date: date.dateTimeToIsoString(date),
    destinationId: userId,
  });
};

/**
 * @param {Notification} notification
 */
Socket.prototype.notification = function(notification) {
  this._io.sockets.emit(Socket.ServerMessage.NOTIFICATION, {
    notification: notification
  });
};

Socket.prototype.reload = function() {
  this._io.sockets.emit(Socket.ServerMessage.RELOAD);
};

/**
 * @param {number} userId
 */
Socket.prototype.typingFinish = function(userId) {
  this._io.sockets.emit(Socket.ServerMessage.TYPING_FINISH, {
    userId: userId
  });
};

/**
 * @param {number} userId
 */
Socket.prototype.typingStart = function(userId) {
  this._io.sockets.emit(Socket.ServerMessage.TYPING_START, {
    userId: userId
  });
};

/**
 * @param {number} userId
 */
Socket.prototype.userOffline = function(userId) {
  this._io.sockets.emit(Socket.ServerMessage.USER_OFFLINE, {
    userId: userId
  });
};

/**
 * @param {number} userId
 */
Socket.prototype.userOnline = function(userId) {
  this._io.sockets.emit(Socket.ServerMessage.USER_ONLINE, {
    userId: userId
  });
};
