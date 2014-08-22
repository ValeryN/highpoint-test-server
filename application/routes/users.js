var dateUtil = require('../core/date');
var devSettings = require('../settings');
var models = require('../model');


exports.changeEmail = function(req, res, next) {
  var setting = devSettings.get('emailChange');
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

exports.sendEmailConfirmation = function(req, res, next) {
  res.json({
    data: true
  });
};

exports.sendEmailForPassword = function(req, res, next) {
  res.json({
    data: true
  });
};

exports.confirmEmail = function(req, res, next) {
  var devOptionValue = devSettings.get('emailConfirm');
  var json = null;
  var status = 200;

  switch (devOptionValue) {
    case 403:
      status = devOptionValue;
      break;
    default:
      var token = req.query.confirmation_token;
      json = {
        data: true
      }
      break;
  }

  if (200 == status) {
    res.json(json);
  } else {
    var error = new Error();
    error.result = json;
    error.status = status;
    next(error);
  }
};

exports.addMessages = function(req, res, next) {
  var devOptionValue = devSettings.get('usersMessagesAdd');
  var json = null;
  var status = 200;

  switch (devOptionValue) {
    case 401:
    case 404:
    case 500:
      status = devOptionValue;
      break;

    default:
      var data = req.body.data;
      var delay = parseInt(req.body.delay, 10) || 0;
      var text = req.body.text;
      var userId = parseInt(req.params.userId, 10);

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

            json = {
              data: {
                messages: messages,
              }
            };
          } else {
            status = 403;
            json = {
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
          json = {
            data: {
              message: createMessage(text, parseInt(delay, 10) || 0),
            }
          };
        } else {
          status = 403;
          json = {
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
        status = 404;
      }

      break;
  }

  if (200 == status) {
    res.json(json);
  } else {
    var error = new Error();
    error.result = json;
    error.status = status;
    next(error);
  }
};

exports.getMessages = function(req, res, next) {
  var devOptionValue = devSettings.get('usersMessages');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 201:
      json = {
        data: {
          messages: null,
        }
      };
      break;

    case 202:
      json = {
        data: {
          messages: [{
            id: '1',
          }]
        }
      }
      break;

    case 401:
    case 404:
    case 500:
      status = devOptionValue;
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

          json = {
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
    res.json(json);
  } else {
    var error = new Error();
    error.result = json;
    error.status = status;
    next(error);
  }
};

exports.changePassword = function(req, res, next) {
  res.json({
    data: true
  });
};

exports.getFreePhotos = function(req, res, next) {
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

exports.accessToPhotos = function(req, res, next) {
  var userId = parseInt(req.params.photoId, 10);

  res.json({
    data: true
  });
};

exports.pokePhotos = function(req, res, next) {
  res.json({
    data: true
  });
};

exports.voteForPhoto = function(req, res, next) {
  res.json({
    data: true
  });
};

exports.getList = function(req, res, next) {
  var devOptionValue = devSettings.get('users');
  var json = null;
  var status = 200;

  switch (devOptionValue) {
    case 201:
      json = {
        data: null,
      };
      break;

    case 202:
      json = {
        data: {
          users: [{
            id: '1'
          }]
        },
      };
      break;

    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
      json = {
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
        json.data.users.push(user);

        if (pointsMap[oldId]) {
          var point = models.Model.clone(pointsMap[oldId]);
          point.id = user.id;
          point.userId = user.id;
          resultPointsMap[user.id] = point;
        }
      }

      if (req.query && '1' == req.query.includePoints) {
        json.data.points = resultPointsMap;
      }

      break;
  }

  if (200 == status) {
    res.json(json);
  } else {
    var error = new Error();
    error.result = json;
    error.status = status;
    next(error);
  }
};

exports.getUser = function(req, res, next) {
  var devOptionValue = devSettings.get('usersUser');
  var json = null;
  var status = 200;

  switch (devOptionValue) {
    case 201:
      json = {
        data: {
          user: {
            id: '1'
          }
        },
      };
      break;

    case 401:
    case 404:
    case 500:
      status = devOptionValue;
      break;

    default:
      var userId = parseInt(req.params.userId, 10);
      var user = models.users.get(userId) || models.contactUsers.get(userId);

      if (user) {
        json = {
          data: {
            user: user
          }
        };
      } else {
        status = 404;
      }

      break;
  }

  if (200 == status) {
    res.json(json);
  } else {
    var error = new Error();
    error.result = json;
    error.status = status;
    next(error);
  }
};
