var ServerMessage = require('./components/socket').ServerMessage;

var settings = exports.settings = {};

var Dictionary = {
  contacts: {
    key: 'contacts',
    name: 'Список контактов',
    type: 'radio',
    items: [
      { name: 'список', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'некорректные данные', value: 202 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  contactsRemove: {
    key: 'contactsRemove',
    name: 'Удаление контакта',
    type: 'radio',
    items: [
      { name: 'удачное удаление', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'контакт не найден', value: 404 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  geoCitiesFind: {
    key: 'geoCitiesFind',
    name: 'Поиск городов',
    type: 'radio',
    items: [
      { name: 'список', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'некорректные данные', value: 202 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  geoLocations: {
    key: 'geoLocations',
    name: 'Список географический локаций',
    type: 'radio',
    items: [
      { name: 'список', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'некорректные данные', value: 202 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  geoPopularCities: {
    key: 'geoPopularCities',
    name: 'Популярные города',
    type: 'radio',
    items: [
      { name: 'список', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'некорректные данные', value: 202 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  meCareerAdd: {
    key: 'meCareerAdd',
    name: 'Добавление карьеры',
    type: 'radio',
    items: [
      { name: 'успешное добавление', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  meCareerRemove: {
    key: 'meCareerRemove',
    name: 'Удаление карьеры',
    type: 'radio',
    items: [
      { name: 'успешное удаление', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  meEducationAdd: {
    key: 'meEducationAdd',
    name: 'Добавление образования',
    type: 'radio',
    items: [
      { name: 'успешное добавление', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  meEducationRemove: {
    key: 'meEducationRemove',
    name: 'Удаление образования',
    type: 'radio',
    items: [
      { name: 'успешное удаление', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  meFilterUpdate: {
    key: 'meFilterUpdate',
    name: 'Обновление фильтра:',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  meLanguageAdd: {
    key: 'meLanguageAdd',
    name: 'Добавление языка',
    type: 'radio',
    items: [
      { name: 'успешное добавление', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  meLanguageRemove: {
    key: 'meLanguageRemove',
    name: 'Удаление языка',
    type: 'radio',
    items: [
      { name: 'успешное удаление', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  mePlaceAdd: {
    key: 'mePlaceAdd',
    name: 'Добавление места',
    type: 'radio',
    items: [
      { name: 'успешное добавление', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  mePlaceRemove: {
    key: 'mePlaceRemove',
    name: 'Удаление места',
    type: 'radio',
    items: [
      { name: 'успешное удаление', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  meUser: {
    key: 'meUser',
    name: 'Информация о текущем пользователе',
    type: 'radio',
    items: [
      { name: 'пользователь', value: 200 },
      { name: 'некорректные данные', value: 201 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  messagesUnread: {
    key: 'messagesUnread',
    name: 'Список непрочитанных сообщений',
    type: 'radio',
    items: [
      { name: 'список', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'некорректные данные', value: 202 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  points: {
    key: 'points',
    name: 'Список поинтов',
    type: 'radio',
    items: [
      { name: 'список', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'некорректные данные', value: 202 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  pointsLike: {
    key: 'pointsLike',
    name: 'Лайк поинта',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'поинт не найден', value: 404 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  pointsLikedUsers: {
    key: 'pointsLikedUsers',
    name: 'Пользователи, залайкавшие поинт',
    type: 'radio',
    items: [
      { name: 'список', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'некорректные данные', value: 202 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'поинт не найден', value: 404 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  pointsUnlike: {
    key: 'pointsUnlike',
    name: 'Анлайк поинта',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'неавторизованный пользователь', value: 401 },
      { name: 'поинт не найден', value: 404 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  settings: {
    key: 'settings',
    name: 'Настройки приложения',
    type: 'radio',
    items: [
      { name: 'хэш настроек', value: 200 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  signin: {
    key: 'signin',
    name: 'Авторизация:',
    type: 'radio',
    items: [
      { name: 'успешный вход', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  signup: {
    key: 'signup',
    name: 'Создание аккаунта:',
    type: 'radio',
    items: [
      { name: 'профиль пользователя', value: 200 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  users: {
    key: 'users',
    name: 'Список пользователей',
    type: 'radio',
    items: [
      { name: 'список', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'некорректные данные', value: 202 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  usersMessages: {
    key: 'usersMessages',
    name: 'История переписки с пользователем',
    type: 'radio',
    items: [
      { name: 'список', value: 200 },
      { name: 'пустой список', value: 201 },
      { name: 'некорректные данные', value: 202 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'пользователь не найден', value: 404 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  usersMessagesAdd: {
    key: 'usersMessagesAdd',
    name: 'Отправка сообщения',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'пользователь не найден', value: 404 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  usersUser: {
    key: 'usersUser',
    name: 'Информация о пользователе',
    type: 'radio',
    items: [
      { name: 'информация', value: 200 },
      { name: 'некорректные данные', value: 201 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'пользователь не найден', value: 404 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },


  avatarCrop: {
    key: 'avatarCrop',
    name: 'Кроп аватара',
    type: 'radio',
    items: [
      { name: 'кроп аватара', value: 200 },
      { name: 'ошибка кропа', value: 403 },
      { name: 'ошибка сервера', value: 500 },
    ]
  },
  avatarUpload: {
    key:'avatarUpload',
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
  emailChange: {
    key: 'emailChange',
    name: 'Подтверждение новой почты',
    type: 'radio',
    items: [
      { name: 'неверный токен', value: 403 },
      { name: 'успешно', value: 200 },
    ]
  },
  emailConfirm: {
    key: 'emailConfirm',
    name: 'Подтверждение почты',
    type: 'radio',
    items: [
      { name: 'неверный токен', value: 403 },
      { name: 'успешно', value: 200 },
    ]
  },
  matrixUsers: {
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
  meUsersSettingsUpdate: {
    key: 'meUsersSettingsUpdate',
    name: 'Обновление настроек текущего пользователя:',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  usersFilter: {
    key: 'usersFilter',
    name: 'Обновление параметров фильтра:',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  usersUpdate: {
    key: 'usersUpdate',
    name: 'Завершение регистрации, обновление профиля:',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  usersUpdateSettings: {
    key: 'usersUpdateSettings',
    name: 'Обновление настроек:',
    type: 'radio',
    items: [
      { name: 'успешное выполнение', value: 200 },
      { name: 'ошибка авторизации', value: 401 },
      { name: 'ошибка сервера', value: 500 }
    ]
  },
  validatorsUniqueness: {
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

exports.tabs = [
  {
    name: 'Текущий пользователь',
    sections: [
      {
        name: 'Настройки выдачи HTTP запросов',
        options: [
          Dictionary.signin,
          Dictionary.meUser,
          Dictionary.meFilterUpdate,
          Dictionary.meCareerAdd,
          Dictionary.meCareerRemove,
          Dictionary.meEducationAdd,
          Dictionary.meEducationRemove,
          Dictionary.meLanguageAdd,
          Dictionary.meLanguageRemove,
          Dictionary.mePlaceAdd,
          Dictionary.mePlaceRemove,
        ]
      },
      {
        name: 'Web Sockets',
        options: [
          {
            name: 'Обновить данные пользователя',
            type: 'action',
            value: {
              action: ServerMessage.ME_UPDATE,
            }
          },
        ]
      },
    ]
  },
  {
    name: 'Настройки приложения',
    sections: [
      {
        name: 'Настройки выдачи HTTP запросов',
        options: [
          Dictionary.settings,
        ]
      },
    ]
  },
  {
    name: 'Контакты',
    sections: [
      {
        name: 'Настройки выдачи HTTP запросов',
        options: [
          Dictionary.contacts,
          Dictionary.contactsRemove,
        ]
      },
    ]
  },
  {
    name: 'Поинты',
    sections: [
      {
        name: 'Настройки выдачи HTTP запросов',
        options: [
          Dictionary.points,
          Dictionary.pointsLikedUsers,
          Dictionary.pointsLike,
          Dictionary.pointsUnlike,
        ]
      },
    ]
  },
  {
    name: 'Сообщения',
    sections: [
      {
        name: 'Настройки выдачи HTTP запросов',
        options: [
          Dictionary.messagesUnread,
        ]
      },
    ]
  },
  {
    name: 'Пользователи',
    sections: [
      {
        name: 'Настройки выдачи HTTP запросов',
        options: [
          Dictionary.users,
          Dictionary.usersUser,
          Dictionary.usersMessages,
          Dictionary.usersMessagesAdd,
        ]
      },
    ]
  },
  {
    name: 'Фотографии',
    sections: [
      {
        name: 'Настройки выдачи HTTP запросов',
        options: [
          Dictionary.avatarUpload,
          Dictionary.avatarCrop,
        ]
      },
    ]
  },
  {
    name: 'Географические локации',
    sections: [
      {
        name: 'Настройки выдачи HTTP запросов',
        options: [
          Dictionary.geoLocations,
          Dictionary.geoCitiesFind,
          Dictionary.geoPopularCities,
        ]
      },
    ]
  },
];

/**
 * @type {Object.<Type,*>}
 */
var valuesMap = exports.valuesMap = (function() {
  var map = {};

  for (var key in Dictionary) {
    map[key] = Dictionary[key].items[0].value;
  }

  return map;
})();

/**
 * @param {string} type
 * @return {*}
 */
exports.get = function(type) {
  return valuesMap[type];
};

/**
 * @param {string} type
 * @param {*} value
 */
exports.set = function(type, value) {
  valuesMap[type] = value;
};
