var ErrorCode = require('../model/ErrorCode');
var devSettings = require('../settings');
var models = require('../model');


exports.signin = function(req, res, next) {
  var devOptionValue = devSettings.get('signin');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
      if (req.body.email && req.body.password) {
        json = {
          data: {
            token: 'authToken'
          }
        };
      } else {
        json = {
          error: {
            code: ErrorCode.WRONG_USER_OR_PASSWORD
          }
        };
        status = 401;
      }

      break;
  }

  if (200 == status) {
    res.json(json);
  } else {
    var error = new Error('Wrong user or password');
    error.result = json;
    error.status = status;
    next(error);
  }
};

exports.signup = function(req, res) {
  var devOptionValue = devSettings.get('signup');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 500:
      status = devOptionValue;
      break;

    default:
      var email = req.body.email || '';
      var password = req.body.password || '';

      if (email && password) {
        json = {
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
    res.json(json);
  } else {
    var error = new Error();
    error.result = json;
    error.status = status;
    next(error);
  }
};
