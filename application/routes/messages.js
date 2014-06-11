var devSettings = require('../settings');
var models = require('../model');


exports.getUnreadMessages = function(req, res) {
  var setting = devSettings.get(devSettings.Type.MESSAGES_UNREAD);
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
      result = models.messages.getAll();
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
