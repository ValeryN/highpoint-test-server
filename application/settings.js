var settings = exports.settings = {};

/**
 * @typedef {{
 *    name: string,
 *    value: *
 * }}
 */
var Option;

/**
 * @typedef {{
 *    key: string,
 *    name: string,
 *    items: Option
 * }}
 */
var DictionaryItem;

var Dictionary = exports.Dictionary = {
  ME_USER: {
    key: 'meUser',
    name: 'Информация о текущем пользователе',
    type: 'radio',
    items: [
      { name: 'пользователь', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },



  AVATAR_CROP: {
    key: 'avatarCrop',
    name: 'Кроп аватара',
    type: 'radio',
    items: [
      { name: 'кроп аватара', value: 200 },
      { name: 'ошибка кропа', value: 403 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  AVATAR_UPLOAD: {
    key: 'avatarUpload',
    name: 'Загрузка аватара',
    type: 'radio',
    items: [
      { name: 'фотография пользователя', value: 200 },
      { name: 'случайная фотография', value: 201 },
      { name: 'фотография №2', value: 202 },
      { name: 'ошибка загрузки', value: 403 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  EMAIL_CHANGE: {
    key: 'emailChange',
    name: 'Подтверждение новой почты',
    type: 'radio',
    items: [
      { name: 'неверный токен', value: 403 },
      { name: 'успешно', value: 200 },
    ]
  },
  EMAIL_CONFIRM: {
    key: 'emailConfirm',
    name: 'Подтверждение почты',
    type: 'radio',
    items: [
      { name: 'неверный токен', value: 403 },
      { name: 'успешно', value: 200 },
    ]
  },
  MATRIX_USERS: {
    key: 'matrixUsers',
    name: 'Список онлайн-пользователей:',
    type: 'radio',
    items: [
      { name: 'список пользователей', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  ME_FILTER_UPDATE: {
    key: 'meFilterUpdate',
    name: 'Обновление фильтра:',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  ME_USER_SETTINGS_UPDATE: {
    key: 'meUsersSettingsUpdate',
    name: 'Обновление настроек текущего пользователя:',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  MESSAGES_HISTORY: {
    key: 'messagesHistory',
    name: 'История переписки с пользователем:',
    type: 'radio',
    items: [
      { name: 'список сообщений', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  MESSAGES_UNREAD: {
    key: 'messagesUnread',
    name: 'Список непрочитанных сообщений:',
    type: 'radio',
    items: [
      { name: 'список сообщений', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  SETTINGS: {
    key: 'settings',
    name: 'Настройки приложения:',
    type: 'radio',
    items: [
      { name: 'хэш настроек', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  SIGNIN: {
    key: 'signin',
    name: 'Авторизация:',
    type: 'radio',
    items: [
      { name: 'успешный вход', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  SIGNUP: {
    key: 'signup',
    name: 'Создание аккаунта:',
    type: 'radio',
    items: [
      { name: 'профиль пользователя', value: 200 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  USERS_FILTER: {
    key: 'usersFilter',
    name: 'Обновление параметров фильтра:',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  USERS_UPDATE: {
    key: 'usersUpdate',
    name: 'Завершение регистрации, обновление профиля:',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  USERS_UPDATE_SETTINGS: {
    key: 'usersUpdateSettings',
    name: 'Обновление настроек:',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  VALIDATORS_UNIQUENESS: {
    key: 'validatorsUniqueness',
    name: 'Валидация электронной почты:',
    type: 'radio',
    items: [
      { name: 'пользователь не существует', value: 404 },
      { name: 'пользователь существует', value: 200 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
};

/**
 * @enum {string}
 */
exports.Type = (function() {
  var map = {};

  for (var key in Dictionary) {
    map[key] = Dictionary[key].key;
  }

  return map;
})();
//console.log(exports.Type);

/**
 * @type {Array.<DictionaryItem>}
 */
exports.items = (function() {
  var result = [];

  for (var key in Dictionary) {
    result.push(Dictionary[key]);
  }

  return result;
})();

/**
 * @type {Object.<DictionaryItem>}
 */
var itemsMap = (function() {
  var map = {};

  for (var key in Dictionary) {
    map[Dictionary[key].key] = Dictionary[key];
  }

  return map;
})();

/**
 * @type {Object.<Type,*>}
 */
var valuesMap = exports.valuesMap = (function() {
  var map = {};

  for (var type in itemsMap) {
    map[type] = itemsMap[type].items[0].value;
  }

  return map;
})();

/**
 * @param {Type} type
 * @return {DictionaryItem}
 */
exports.getDictionaryItem = function(type) {
  return itemsMap[type] || null;
};

/**
 * @param {Type} type
 * @return {*}
 */
exports.get = function(type) {
  return valuesMap[type];
};

/**
 * @param {Type} type
 * @param {*} value
 */
exports.set = function(type, value) {
  valuesMap[type] = value;
};
