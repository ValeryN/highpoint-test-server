goog.provide('dev.api.webSocket.ServerMessage');


/**
 * @enum {string}
 */
dev.api.webSocket.ServerMessage = {

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
