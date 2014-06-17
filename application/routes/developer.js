var fs = require('fs');
var imagemagick = require('imagemagick');

var ServerMessage = require('../components/socket').ServerMessage;
var models = require('../model');
var config = require('../config');
var devSettings = require('../settings');


exports.app = function(req, res) {
  var viewOptions = {
    config: config,
  };

  res.render('developer', viewOptions);
};

exports.options = function(req, res) {
  res.json({
    options: devSettings.items,
    values: devSettings.valuesMap
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

var getAvatar = function(type, req, res, next) {
  var name = req.params.photoToken;
  var fileName = config.webPath + '/s/avatars/' + name + '.jpg';
  var avatarTypes = config.avatarTypes;

  if (!req.query || !req.query.size || !avatarTypes[req.query.size]) {
    res.status(404);
    res.send('Image size not found');
  } else if (!fs.existsSync(fileName)) {
    res.status(404);
    res.send('Image not found');
  } else {
    var size = req.query.size;
    var ext = 'webp' == req.query.ext ? 'webp' : 'jpg';
    var resultFileName =
      [config.tempFilesPath + '/avatar_' + name, size + '.' + ext].join('_');
    var resultWebFileName =
      [config.webTempFilesPath + '/avatar_' + name, size + '.' + ext].join('_');

    if (fs.existsSync(resultFileName)) {
      res.sendfile(resultWebFileName, {
        maxAge: 31536000000,
        root: config.webPath,
      });
    } else {
      var crop = 'high' == type ?
        models.avatars.getHighCrop(name) : models.avatars.getSquareCrop(name);
      var command = [
        fileName,
        '-crop', crop,
        '-resize', avatarTypes[size].join('x'),
        '-strip',
        '-quality', 85,
        resultFileName
      ];
      imagemagick.convert(command, function(err) {
        if (err) {
          next(err);
        } else {
          res.sendfile(resultWebFileName, {
            maxAge: 31536000000,
            root: config.webPath,
          });
        }
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
    res.status(404);
    res.send('Image size not found');
  } else if (!fs.existsSync(fileName)) {
    res.status(404);
    res.send('Image not found');
  } else {
    var size = req.query.size;
    var ext = 'webp' == req.query.ext ? 'webp' : 'jpg';
    var resultFileName =
      [config.tempFilesPath + '/photo_' + name, size + '.' + ext].join('_');
    var resultWebFileName =
      [config.webTempFilesPath + '/photo_' + name, size + '.' + ext].join('_');

    if (fs.existsSync(resultFileName)) {
      res.sendfile(resultWebFileName, {
        maxAge: 31536000000,
        root: config.webPath,
      });
    } else {
      var command = [
        fileName,
        '-resize', photoTypes[size].join('x'),
        '-strip',
        '-quality', 85,
        resultFileName
      ];
      imagemagick.convert(command, function(err) {
        if (err) {
          next(err);
        } else {
          res.sendfile(resultWebFileName, {
            maxAge: 31536000000,
            root: config.webPath,
          });
        }
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
