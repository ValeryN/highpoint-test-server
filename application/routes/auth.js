var ErrorCode = require('../model/ErrorCode');
var devSettings = require('../settings');
var models = require('../Model');


exports.signin = function(req, res, next) {
  var setting = devSettings.get(devSettings.Type.SIGNIN);
  var status = 200;
  var result = null;

  switch (setting) {
    case 401:
    case 500:
      status = setting;
      break;

    default:
      if (req.body.email && req.body.password) {
        result = {
          data: {
            token: 'authToken'
          }
        };
      } else {
        result = {
          error: {
            code: ErrorCode.WRONG_USER_OR_PASSWORD
          }
        };
        status = 401;
      }

      break;
  }

  if (200 == status) {
    res.json(result);
  } else {
    var error = new Error('Wrong user or password');
    error.result = result;
    error.status = status;
    next(error);
  }
};

exports.signup = function(req, res) {
  var setting = devSettings.get(devSettings.Type.SIGNUP);
  var status = 200;
  var result = null;

  switch (setting) {
    case 500:
      status = setting;
      break;

    default:
      var email = req.body.email || '';
      var password = req.body.password || '';

      if (email && password) {
        result = {
          data: {
            user: models.myUsers.get(1)
          }
        };
      } else {
        status = 403;
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
