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
 *    type: string,
 *    name: string,
 *    options: Option
 * }}
 */
var DictionaryItem;

var Dictionary = exports.Dictionary = {
  AVATAR_CROP: {
    type: 'avatarCrop',
    name: 'Кроп аватара',
    options: [
      { name: 'кроп аватара', value: 200 },
      { name: 'ошибка кропа', value: 403 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  AVATAR_UPLOAD: {
    type: 'avatarUpload',
    name: 'Загрузка аватара',
    options: [
      { name: 'фотография пользователя', value: 200 },
      { name: 'случайная фотография', value: 201 },
      { name: 'фотография №2', value: 202 },
      { name: 'ошибка загрузки', value: 403 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  EMAIL_CHANGE: {
    type: 'emailChange',
    name: 'Подтверждение новой почты',
    options: [
      { name: 'неверный токен', value: 403 },
      { name: 'успешно', value: 200 },
    ]
  },
  EMAIL_CONFIRM: {
    type: 'emailConfirm',
    name: 'Подтверждение почты',
    options: [
      { name: 'неверный токен', value: 403 },
      { name: 'успешно', value: 200 },
    ]
  },
  MATRIX_USERS: {
    type: 'matrixUsers',
    name: 'Список онлайн-пользователей:',
    options: [
      { name: 'список пользователей', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  ME_FILTER_UPDATE: {
    type: 'meFilterUpdate',
    name: 'Обновление фильтра:',
    options: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  ME_USER: {
    type: 'meUser',
    name: 'Информация о текущем пользователе',
    options: [
      { name: 'пользователь', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  ME_USER_SETTINGS_UPDATE: {
    type: 'meUsersSettingsUpdate',
    name: 'Обновление настроек текущего пользователя:',
    options: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  MESSAGES_HISTORY: {
    type: 'messagesHistory',
    name: 'История переписки с пользователем:',
    options: [
      { name: 'список сообщений', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  MESSAGES_UNREAD: {
    type: 'messagesUnread',
    name: 'Список непрочитанных сообщений:',
    options: [
      { name: 'список сообщений', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  SETTINGS: {
    type: 'settings',
    name: 'Настройки приложения:',
    options: [
      { name: 'хэш настроек', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  SIGNIN: {
    type: 'signin',
    name: 'Авторизация:',
    options: [
      { name: 'успешный вход', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  SIGNUP: {
    type: 'signup',
    name: 'Создание аккаунта:',
    options: [
      { name: 'профиль пользователя', value: 200 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  USERS_FILTER: {
    type: 'usersFilter',
    name: 'Обновление параметров фильтра:',
    options: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  USERS_UPDATE: {
    type: 'usersUpdate',
    name: 'Завершение регистрации, обновление профиля:',
    options: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  USERS_UPDATE_SETTINGS: {
    type: 'usersUpdateSettings',
    name: 'Обновление настроек:',
    options: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  VALIDATORS_UNIQUENESS: {
    type: 'validatorsUniqueness',
    name: 'Валидация электронной почты:',
    options: [
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
    map[key] = Dictionary[key].type;
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
    map[Dictionary[key].type] = Dictionary[key];
  }

  return map;
})();

/**
 * @type {Object.<Type,*>}
 */
var valuesMap = exports.valuesMap = (function() {
  var map = {};

  for (var type in itemsMap) {
    map[type] = itemsMap[type].options[0].value;
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
