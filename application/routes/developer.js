var fs = require('fs');

var ServerMessage = require('../components/socket').ServerMessage;
var models = require('../Model');
var config = require('../config');
var devSettings = require('../settings');
var utils = require('../core/utils');


exports.app = function(req, res) {
  var viewOptions = {
    config: config,
  };

  res.render('developer', viewOptions);
};

exports.options = function(req, res) {
  res.json({
    values: devSettings.valuesMap,
    tabs: [
      {
        name: 'Текущий пользователь',
        sections: [
          {
            name: 'Настройки выдачи HTTP запросов',
            options: [
              devSettings.Dictionary.ME_USER,
              devSettings.Dictionary.ME_FILTER_UPDATE,
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
              devSettings.Dictionary.SETTINGS,
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
              devSettings.Dictionary.MESSAGES_HISTORY,
              devSettings.Dictionary.MESSAGES_UNREAD,
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
              devSettings.Dictionary.EMAIL_CHANGE,
              devSettings.Dictionary.EMAIL_CONFIRM,
              devSettings.Dictionary.SIGNIN,
              devSettings.Dictionary.SIGNOUT,
              devSettings.Dictionary.USERS_UPDATE,
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
              devSettings.Dictionary.AVATAR_UPLOAD,
              devSettings.Dictionary.AVATAR_CROP,
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
              devSettings.Dictionary.LOCATIONS_CITIES,
              devSettings.Dictionary.LOCATIONS_REGIONS,
              devSettings.Dictionary.LOCATIONS_COUNTRIES,
            ]
          },
        ]
      },
    ]
  });
};

exports.setOption = function(req, res) {
  var key = req.body.key;
  var value = JSON.parse(req.body.value);

  if (key) {
    devSettings.set(key, value);
  }

  res.json(null);
};

/**
 * @param {string} message
 * @param {number=} opt_status
 * @return {Error}
 */
var createError = function(message, opt_status) {
  var error = new Error(message);
  error.status = opt_status || 404;

  return error;
};

var getAvatar = function(type, req, res, next) {
  var name = req.params.photoToken;
  var fileName = config.webPath + '/s/avatars/' + name + '.jpg';
  var avatarTypes = config.avatarTypes;

  if (!req.query || !req.query.size || !avatarTypes[req.query.size]) {
    next(createError('Image size not found'));
  } else if (!fs.existsSync(fileName)) {
    next(createError('Image not found'));
  } else {
    var size = req.query.size;
    var ext = 'webp' == req.query.ext ? 'webp' : 'jpg';
    var resultFileName =
      config.tempFilesPath + '/avatar_' + name + '_' + size + '.' + ext;
    var resultWebFileName =
      config.webTempFilesPath + '/avatar_' + name + '_' + size + '.' + ext;

    if (fs.existsSync(resultFileName)) {
      res.sendfile(resultWebFileName, {
        maxAge: 31536000000,
        root: config.webPath,
      });
    } else {
      var crop = 'high' == type ? models.avatars.getHighCropRect(name) :
        models.avatars.getSquareCropRect(name);

      utils.convertImage(fileName, resultFileName, {
        crop: crop,
        ext: ext,
        resize: avatarTypes[size]
      }, function(err) {
        if (err) return next(err);

        res.sendfile(resultWebFileName, {
          maxAge: 31536000000,
          root: config.webPath,
        });
      });
    }
  }
};

exports.getHighAvatar = function(req, res, next) {
  getAvatar('high', req, res, next);
};

exports.getSquareAvatar = function(req, res, next) {
  getAvatar('high', req, res, next);
};

exports.getPhoto = function(req, res) {
  var name = req.params.photoToken;
  var fileName = config.webPath + '/s/photos/' + name + '.jpg';
  var photoTypes = config.photoTypes;

  if (!req.query || !req.query.size || !photoTypes[req.query.size]) {
    next(createError('Image size not found'));
  } else if (!fs.existsSync(fileName)) {
    next(createError('Image not found'));
  } else {
    var size = req.query.size;
    var ext = 'webp' == req.query.ext ? 'webp' : 'jpg';
    var resultFileName =
      config.tempFilesPath + '/photo_' + name + '_' + size + '.' + ext;
    var resultWebFileName =
      config.webTempFilesPath + '/photo_' + name + '_' + size + '.' + ext;

    if (fs.existsSync(resultFileName)) {
      res.sendfile(resultWebFileName, {
        maxAge: 31536000000,
        root: config.webPath,
      });
    } else {
      utils.convertImage(fileName, resultFileName, {
        ext: ext,
        resize: photoTypes[size]
      }, function(err) {
        if (err) return next(err);

        res.sendfile(resultWebFileName, {
          maxAge: 31536000000,
          root: config.webPath,
        });
      });
    }
  }
};

exports.setMessage = function(req, res) {
  var socketServer = req.app.get('socketServer');
  var message = null;
  var userId = req.body.userId ?
    req.body.userId : devSettings.get(devSettings.Type.USER_ID);

  switch (req.body.action) {
    case ServerMessage.ME_UPDATE:
      socketServer.meUpdate();
      break;

    case ServerMessage.MESSAGE:
      var message = models.messages.getRandom();
      message.sourceId = userId;
      socketServer.message(message);
      break;

    case ServerMessage.MESSAGE_SENT:
      var message = models.messages.getRandom();
      message.id += 100;
      message.sourceId = 1;
      message.destinationId = userId;
      socketServer.messageSent(message);
      break;

    case ServerMessage.MESSAGES_READ:
      socketServer.messagesRead(userId);
      break;

    case ServerMessage.NOTIFICATION:
      var notification = null;

      switch (req.body.type) {
        case 1:
          notification = models.users.get(2);
          break;
      }

      if (notification) {
        socketServer.notification(notification);
      }

      break;

    case ServerMessage.RELOAD:
      socketServer.reload();
      break;

    case ServerMessage.TYPING_FINISH:
      socketServer.typingFinish(userId);
      break;

    case ServerMessage.TYPING_START:
      socketServer.typingStart(userId);
      break;

    case ServerMessage.USER_OFFLINE:
      socketServer.userOffline(userId);
      break;

    case ServerMessage.USER_ONLINE:
      socketServer.userOnline(userId);
      break;
  }

  res.json(null);
};
