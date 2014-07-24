var dateUtil = require('../core/date');
var devSettings = require('../settings');
var models = require('../Model');


exports.changeEmail = function(req, res) {
  var setting = devSettings.get(devSettings.Type.EMAIL_CHANGE);
  var status = 200;
  var result = null;

  switch (setting) {
    case 403:
      status = setting;
      break;
    default:
      result = {
        data: true
      };
      break;
  }

  if (200 == status) {
    res.json(result);
  } else {
    var error = new Error();
    error.result = result;
    error.status = status;
    next(error);
  }
};

exports.sendEmailConfirmation = function(req, res) {
  res.json({
    data: true
  });
};

exports.sendEmailForPassword = function(req, res) {
  res.json({
    data: true
  });
};

exports.confirmEmail = function(req, res) {
  var setting = devSettings.get(devSettings.Type.EMAIL_CONFIRM);
  var status = 200;
  var result = null;

  switch (setting) {
    case 403:
      status = setting;
      break;
    default:
      var token = req.query.confirmation_token;
      result = {
        data: true
      }
      break;
  }

  if (200 == status) {
    res.json(result);
  } else {
    var error = new Error();
    error.result = result;
    error.status = status;
    next(error);
  }
};

exports.addMessages = function(req, res, next) {
  var data = req.body.data;
  var delay = parseInt(req.body.delay, 10) || 0;
  var text = req.body.text;
  var userId = parseInt(req.params.userId, 10);
  var error = null;

  var createMessage = function(text, delay) {
    return {
      id: models.messages.getNextId(),
      createdAt: dateUtil.dateTimeToIsoString(new Date(+(new Date) + delay)),
      destinationId: userId,
      readAt: null,
      sourceId: 1,
      text: text,
    };
  };

  if (userId) {
    if (data) {
      try {
        data = JSON.parse(req.body.data);
      } catch (e) { }

      if (data && Array.isArray(data)) {
        var messages = [];

        data.forEach(function(item) {
          if (item.text) {
            messages.push(
              createMessage(item.text, parseInt(item.delay, 10) || 0));
          }
        });

        messages.sort(function(m1, m2) {
          if (m1.createdAt < m2.createdAt) {
            return 1;
          } else if (m1.createdAt > m2.createdAt) {
            return -1;
          }

          return 0;
        });

        res.json({
          data: {
            messages: messages,
          }
        });
      } else {
        error = new Error();
        error.status = 403;
        error.result = {
          error: {
            code: models.ErrorCode.WRONG_PARAMS,
            params: [{
              code: models.ErrorCode.WRONG_JSON,
              name: 'data'
            }],
          }
        };
      }
    } else if (text) {
      res.json({
        data: {
          message: createMessage(text, parseInt(delay, 10) || 0),
        }
      });
    } else {
      error = new Error();
      error.status = 403;
      error.result = {
        error: {
          code: models.ErrorCode.WRONG_PARAMS,
          params: [{
            code: models.ErrorCode.REQUIRED,
            name: 'text'
          }],
        }
      };
    }
  } else {
    error = new Error();
    error.status = 404;
  }

  if (error) {
    next(error);
  }
};

exports.getMessages = function(req, res) {
  var setting = devSettings.get(devSettings.Type.MESSAGES_HISTORY);
  var status = 200;
  var result = null;

  switch (setting) {
    case 201:
      break;

    case 401:
    case 500:
      status = setting;
      break;

    default:
      var userId = parseInt(req.params.userId, 10);

      if (userId) {
        var afterMessageId = req.query ?
          parseInt(req.query.afterMessageId, 10) || 0 : 0;
        var messageCount = models.messages.getCount();
        var count = 20;
        var messages = [];

        for (var i = 0; i < count; i++) {
          var message = models.messages.getAt(
            (afterMessageId + i) % messageCount);
          message.id = models.messages.getNextId();

          if (i % 2) {
            message.sourceId = userId;
            message.destinationId = 1;
          } else {
            message.sourceId = 1;
            message.destinationId = userId;
          }

          messages.push(message);

          result = {
            data: {
              messages: messages,
            }
          }
        }
      } else {
        status = 404;
      }

      break;
  }

  if (200 == status) {
    res.json(result);
  } else {
    var error = new Error();
    error.result = result;
    error.status = status;
    next(error);
  }
};

exports.changePassword = function(req, res) {
  res.json({
    data: true
  });
};

exports.getFreePhotos = function(req, res) {
  var userId = parseInt(req.params.photoId, 10);
  var status = 200;
  var result = null;

  if (userId) {
    result = models.photos.getList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  } else {
    status = 404;
  }

  if (200 == status) {
    res.json(result);
  } else {
    var error = new Error();
    error.result = result;
    error.status = status;
    next(error);
  }
};

exports.accessToPhotos = function(req, res) {
  var userId = parseInt(req.params.photoId, 10);

  res.json({
    data: true
  });
};

exports.pokePhotos = function(req, res) {
  res.json({
    data: true
  });
};

exports.voteForPhoto = function(req, res) {
  res.json({
    data: true
  });
};

exports.getList = function(req, res) {
  var result = {
    data: {
      users: []
    }
  };
  var afterUserId = 0;
  var count = 10;

  if (req.query && req.query.afterUserId) {
    afterUserId = parseInt(req.query.afterUserId, 10) || 0;
  }

  var users = models.users.getAll().filter(function(user) {
    return 1 != user.id;
  });

  var pointsMap = {};
  var points = models.points.getAll();

  points.forEach(function(point) {
    pointsMap[point.userId] = point;
  });

  var resultPointsMap = {};

  for (var i = afterUserId; i < afterUserId + count; i++) {
    var oldId = users[i % users.length].id;
    var user = models.Model.clone(users[i % users.length]);
    user.id = 100 + i;
    result.data.users.push(user);

    if (pointsMap[oldId]) {
      var point = models.Model.clone(pointsMap[oldId]);
      point.id = user.id;
      point.userId = user.id;
      resultPointsMap[user.id] = point;
    }
  }

  if (req.query && '1' == req.query.includePoints) {
    result.data.points = resultPointsMap;
  }

  res.json(result);
};
