var models = require('../Model');

exports.like = function(req, res) {
  res.json({
    data: {
      success: true
    }
  });
};

exports.unlike = function(req, res) {
  res.json({
    data: {
      success: true
    }
  });
};

exports.getList = function(req, res) {
  var result = {
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
    result.data.points.push(point);

    var user = models.users.get(point.userId);
    point.userId = point.id;

    if (user) {
      user = models.Model.clone(user);
      user.id = point.id;
      resultUsersMap[user.id] = user;
    }
  }

  if (req.query && '1' == req.query.includeUsers) {
    result.data.users = resultUsersMap;
  }

  res.json(result);
};
