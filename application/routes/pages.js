var ErrorCode = require('../model/ErrorCode');
var MainTemplate = require('../views/main');
var config = require('../config');
var models = require('../model');


/**
 * @param {Request} req
 * @return {boolean}
 */
var isCompiled = function(req) {
  return !req.query || undefined === req.query.source;
};

exports.panel = function(req, res) {
  var template = new MainTemplate({
    compiled: isCompiled(req),
    config: config,
  });
  res.send(template.render());
};

exports.error = function(err, req, res, next) {
  console.error(err.stack);

  var status = err.status || 0;
  var result = err.result || null;

  if (401 == status) {
    result = result || {
      error: {
        code: ErrorCode.WRONG_TOKEN
      }
    };
  } else if (404 == status) {
    result = result || {
      error: {
        code: ErrorCode.NOT_FOUND
      }
    };
  } else if (!status || 500 == status) {
    status = 500;
    result = result || {
      error: {
        code: ErrorCode.SERVER_ERROR
      }
    };
  }

  res.status(status);
  res.json(result);
};
