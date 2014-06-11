var devSettings = require('../settings');
var models = require('../model');


exports.get = function(req, res) {
  var setting = devSettings.get(devSettings.Type.SETTINGS);
  var status = 200;
  var result = null;

  switch (setting) {
    case 401:
    case 500:
      status = setting;
      break;

    default:
      result = models.settings.getRandom();
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
