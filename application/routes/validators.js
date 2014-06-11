var devSettings = require('../settings');


exports.uniqueness = function(req, res) {
  var setting = devSettings.get(devSettings.Type.VALIDATORS_UNIQUENESS);
  var status = 200;
  var result = null;

  switch (setting) {
    case 500:
      status = setting;
      break;

    case 404:
      status = setting;
      result = true;
      break;

    default:
      var caseSensitive = 'true' == req.query.case_sensitive;
      var email = req.query.user ? req.query.user.email : '';

      var found = '' == email;

      if (found) {
        res.status(404);
      }

      res.json(found);

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
