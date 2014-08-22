var devSettings = require('../settings');
var models = require('../model');


exports.get = function(req, res, next) {
  var setting = devSettings.get('settings');
  var status = 200;
  var json = null;

  switch (setting) {
    case 500:
      status = setting;
      break;

    default:
      json = models.settings.getRandom();
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
