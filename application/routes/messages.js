var devSettings = require('../settings');
var models = require('../model');


exports.getUnreadMessages = function(req, res, next) {
  var devOptionValue = devSettings.get('messagesUnread');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 201:
      json = {
        data: {
          messages: null
        }
      }
      break;

    case 202:
      json = {
        data: {
          messages: [{
            id: '1',
            sourceId: '1',
          }]
        }
      }
      break;

    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
      var ids = [];

      for (var i = 21; i <=35; i++) {
        ids.push(i);
      }

      json = {
        data: {
          messages: models.messages.getList(ids)
        }
      };
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
