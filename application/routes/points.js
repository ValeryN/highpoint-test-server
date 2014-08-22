var devSettings = require('../settings');
var models = require('../model');


exports.like = function(req, res, next) {
  var devOptionValue = devSettings.get('pointsLike');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 401:
    case 404:
    case 500:
      status = devOptionValue;
      break;

    default:
      json = {
        data: {
          success: true
        }
      };
      break;
  }

  if (200 == status) {
    res.json(json);
  } else {
    var error = new Error();
    error.status = status;
    next(error);
  }
};

exports.unlike = function(req, res, next) {
  var devOptionValue = devSettings.get('pointsUnlike');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 401:
    case 404:
    case 500:
      status = devOptionValue;
      break;

    default:
      json = {
        data: {
          success: true
        }
      };
      break;
  }

  if (200 == status) {
    res.json(json);
  } else {
    var error = new Error();
    error.status = status;
    next(error);
  }
};

exports.getList = function(req, res, next) {
  var devOptionValue = devSettings.get('points');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 201:
      json = {
        data: {
          points: null
        }
      };
      break;

    case 202:
      json = {
        data: {
          points: [{
            id: '1',
            createdAt: '2014444',
            userId: '1',
          }]
        }
      };
      break;

    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
      json = {
        data: {
          points: []
        }
      };
      var afterPointId = 0;
      var count = 10;

      if (req.query && req.query.afterPointId) {
        afterPointId = parseInt(req.query.afterPointId, 10) || 0;
      }

      var points = models.points.getAll().filter(function(point) {
        return 1 != point.userId;
      });

      var resultUsersMap = {};

      for (var i = afterPointId; i < afterPointId + count; i++) {
        var oldId = points[i % points.length].id;
        var point = models.Model.clone(points[i % points.length]);
        point.id = 100 + i;
        json.data.points.push(point);

        var user = models.users.get(point.userId);
        point.userId = point.id;

        if (user) {
          user = models.Model.clone(user);
          user.id = point.id;
          resultUsersMap[user.id] = user;
        }
      }

      if (req.query && '1' == req.query.includeUsers) {
        json.data.users = resultUsersMap;
      }

      break;
  }

  if (200 == status) {
    res.json(json);
  } else {
    var error = new Error();
    error.status = status;
    next(error);
  }
};

exports.getLikedUsers = function(req, res, next) {
  var devOptionValue = devSettings.get('pointsLikedUsers');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 201:
      json = {
        data: {
          users: null
        }
      };
      break;

    case 202:
      json = {
        data: {
          users: [{
            id: '1',
            createdAt: '2014444',
            userId: '1',
          }]
        }
      };
      break;

    case 401:
    case 404:
    case 500:
      status = devOptionValue;
      break;

    default:
      json = {
        data: {
          users: models.users.getList([1, 2, 4, 5, 7, 8])
        }
      };

      break;
  }

  if (200 == status) {
    res.json(json);
  } else {
    var error = new Error();
    error.status = status;
    next(error);
  }
};
