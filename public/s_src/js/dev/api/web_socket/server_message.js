goog.provide('dev.api.webSocket.ServerMessage');


/**
 * @enum {string}
 */
dev.api.webSocket.ServerMessage = {

  /**
   * Обновлены баны.
   * fullBan (boolean)
   * bans (Array.<dev.dataTypes.Ban>)
   */
  BANS_UPDATE: 'update_bans',

  /**
   * Принятие звонка.
   * call {!dev.dataTypes.Call}
   */
  CALL_ACCEPT: 'call_accept',

  /**
   * Решение о дальнейшем общении после звонка.
   * callId (number)
   * userId (number) Идентификатор пользователя, который дал ответ.
   * agree (boolean) Согласен ли пользователь общаться дальше.
   */
  CALL_ANSWER: 'call_answer',

  /**
   * Отмена звонка.
   * call (!dev.dataTypes.Call)
   * reason (dev.dataTypes.Reason)
   */
  CALL_CANCEL: 'call_cancel',

  /**
   * Жалоба в звонке на текущего пользователя от собеседника.
   * callId (number)
   * userId (number)
   */
  CALL_CLAIM: 'call_claim',

  /**
   * Отключение собеседника в звонке.
   * call (!dev.dataTypes.Call)
   * userId (number?) Идентификатор пользователя, завершившего звонок.
   *                  Если null, то по таймауту.
   */
  CALL_DISCONNECT: 'call_disconnect',

  /**
   * Отказ от дальнейшего общения.
   * call (!dev.dataTypes.Call)
   * userId (number?) Идентификатор пользователя, завершившего звонок.
   *                  Если null, то по таймауту.
   */
  CALL_ESCAPE: 'call_escape',

  /**
   * Входящее сообщение в звонке.
   * userId (number) Идентификатор другого пользователя.
   * chatMessage (!dev.dataTypes.ChatMessage)
   * createAt (!goog.date.DateTime)
   */
  CALL_MESSAGE: 'call_message',

  /**
   * Ошибка при принятии входящего сообщения.
   * chatMessage (!dev.dataTypes.ChatMessage)
   * createAt (!goog.date.DateTime)
   * type (string)
   */
  CALL_MESSAGE_ERROR: 'call_message_error',

  /**
   * Подтверждение отправки сообщения звонка
   * userId (number) Идентификатор другого пользователя.
   * chatMessage (!dev.dataTypes.ChatMessage)
   * createdAt (!goog.date.DateTime)
   */
  CALL_MESSAGE_SENT: 'call_message_sent',

  /**
   * Отклонение звонка.
   * call (!dev.dataTypes.Call)
   */
  CALL_REJECT: 'call_reject',

  /**
   * Решение о раскрытии информации в анонимном чате.
   * callId (number)
   * userId (number) Идентификатор пользователя, который дал ответ.
   * reveal (boolean) Пользователь раскрывает информацию или нет.
   * user (dev.dataTypes.User) Пользователь, если ответ положительный.
   */
  CALL_REVEAL: 'call_reveal',

  /**
   * Состояние звонка на момент восстановления сессии.
   * call (!dev.dataTypes.Call)
   * type (string) 'source' (инициатор звонка), 'destination'.
   * left (number) Осталось до окончания звонка.
   */
  CALL_STATE: 'call_state',

  /**
   * Завершение звонка.
   * call (!dev.dataTypes.Call)
   * userId (number?) Идентификатор пользователя, завершившего звонок.
   *                  Если null, то по таймауту.
   */
  CALL_STOP: 'call_stop',

  /**
   * Собеседник в звонке закончил писать сообщение.
   * userId (number?)
   */
  CALL_TYPING_FINISH: 'call_typing_finish',

  /**
   * Собеседник в звонке начал писать сообщение.
   * userId (number?)
   */
  CALL_TYPING_START: 'call_typing_start',

  /**
   * Собеседник в звонке ушел в оффлайн.
   * userId (number)
   */
  CALLER_OFFLINE: 'caller_offline',

  /**
   * Собеседник в звонке появился в онлайне.
   * userId (number)
   */
  CALLER_ONLINE: 'caller_online',

  /**
   * Закрытие соединения.
   * reason (string) Пока только 'new_session'
   */
  CLOSE: 'close',

  /**
   * Добавление пользователя в КЛ.
   * user (!dev.dataTypes.User)
   */
  CONTACT_ADD: 'add_contact',

  /**
   * Новое сообщение от пользователя КЛ.
   * userId (number) Идентификатор пользователя, от которого пришло сообщение.
   * chatMessage (!dev.dataTypes.ChatMessage)
   * createdAt (!goog.date.DateTime)
   */
  CONTACT_MESSAGE: 'contact_message',

  /**
   * Ошибка при принятии нового сообщения от пользователя КЛ.
   * userId (number) Идентификатор пользователя, от которого пришло сообщение.
   * chatMessage (!dev.dataTypes.ChatMessage)
   * createdAt (!goog.date.DateTime)
   * reason (string) 'banned', 'ratelimit', 'not_in_contacts', 'duplicate'
   */
  CONTACT_MESSAGE_ERROR: 'contact_message_error',

  /**
   * Сообщение прочитано.
   * userId (number)
   * readAt (!goog.date.DateTime)
   */
  CONTACT_MESSAGE_READ: 'contact_message_read',

  /**
   * Сообщение отправлено пользователю КЛ.
   * userId (number) Идентификатор пользователя, который отправил сообщение.
   * chatMessage (!dev.dataTypes.ChatMessage)
   * createdAt (!goog.date.DateTime)
   */
  CONTACT_MESSAGE_SENT: 'contact_message_sent',

  /**
   * Пользователь в оффлайне.
   * userId (number)
   */
  CONTACT_OFFLINE: 'contact_offline',

  /**
   * Пользователь в онлайне.
   * userId (number)
   */
  CONTACT_ONLINE: 'contact_online',

  /**
   * Пользователь удален из КЛ.
   * user (!dev.dataTypes.User)
   */
  CONTACT_REMOVE: 'remove_contact',

  /**
   * Пользователь КЛ законил печатать сообщение.
   * userId (number)
   */
  CONTACT_TYPING_FINISH: 'contact_typing_finish',

  /**
   * Пользователь КЛ начал печатать сообщение.
   * userId (number)
   */
  CONTACT_TYPING_START: 'contact_typing_start',

  /**
   * Избранный пользователь в оффлайне.
   * userId (number)
   */
  FAVORITE_OFFLINE: 'favourite_offline',

  /**
   * Избранный пользователь в онлайне.
   * userId (number)
   */
  FAVORITE_ONLINE: 'favourite_online',

  /**
   * Избранный пользователь удален.
   * userId (number)
   */
  FAVORITE_REMOVE: 'remove_favourite',

  /**
   * Обновлен счетчик пользователей, готовых к анонимному знакомству.
   * count (number)
   */
  INCOGNITO_COUNT_UPDATE: 'update_incognito_counts',

  /**
   * Входящий звонок.
   * call (!dev.dataTypes.Call)
   */
  INCOMING_CALL: 'call_in',

  /**
   * Отмена входящего звонка.
   * call (!dev.dataTypes.Call)
   * reason (dev.dataTypes.Reason)
   */
  INCOMING_CALL_CANCEL: 'call_in_cancel',

  /**
   * Бан в звонке.
   * userId (number)
   */
  INTERBAN: 'interban',

  /**
   * Обновлены баннеры в матрице онлайн-знакомств
   * banners (!Array.<dev.dataTypes.MatrixBanner>)
   */
  MATRIX_BANNERS_UPDATE: 'update_matrix_banners',

  /**
   * Обновлена часть данных текущего пользователя.
   * data (dev.api.webSocket.Profile.Data)
   */
  ME_UPDATE: 'update_current_user',

  /**
   * Обновлен пропущенный звонок
   * call (dev.dataTypes.Call)
   */
  MISSED_CALL_UPDATE: 'update_skipped_call',

  /**
   * Новое уведомление.
   * notification (!dev.dataTypes.Notification)
   */
  NOTIFICATION: 'notification',

  /**
   * Исходящий звонок.
   * call (!dev.dataTypes.Call)
   */
  OUTGOING_CALL: 'call_out',

  /**
   * Отмена исходящего звонка.
   * call (!dev.dataTypes.Call)
   * reason (dev.dataTypes.Reason)
   */
  OUTGOING_CALL_CANCEL: 'call_out_cancel',

  /**
   * Перезагрузка приложения.
   * delay (number)
   */
  PAGE_RELOAD: 'reload_page',

  /**
   * Показать панель социальных кнопок.
   */
  SOCIAL_BUTTONS_SHOW: 'show_like_us_window'
};
