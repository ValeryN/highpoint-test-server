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

exports.getMessageHistory = function(req, res) {
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
        var messageItems = models.contactMessages.getAll();
        var timestamp = +(new Date());

        messageItems.forEach(function(message, i) {
          message.id = timestamp + message.id;

          if (0 == i % 2) {
            message.source_id = userId;
            message.destination_id = 1;
          } else {
            message.source_id = 1;
            message.destination_id = userId;
          }
        });

        result = messageItems;
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
