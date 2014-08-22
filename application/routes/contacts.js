var models = require('../model');
var devSettings = require('../settings');


exports.getUsers = function(req, res, next) {
  var devOptionValue = devSettings.get('contacts');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 201:
      json = {
        data: {
          users: [],
          messages: {},
        }
      };
      break;

    case 202:
      json = {
        data: {
          users: [{
            id: '1',
            age: -1,
            name: '',
          }],
          messages: {},
        }
      };
      break;

    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
      var users = models.contactUsers.getAll();
      var messageCount = models.messages.getCount();
      var messages = {};

      users.forEach(function(user, i) {
        var message = models.messages.getAt(i % messageCount);
        message.id = models.messages.getNextId();

        if (i % 2) {
          message.destinationId = user.id;
          message.sourceId = 1;
        } else {
          message.destinationId = 1;
          message.sourceId = user.id;
        }

        messages[user.id] = message;
      });

      json = {
        data: {
          users: users,
          messages: messages,
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

exports.remove = function(req, res, next) {
  var devOptionValue = devSettings.get('contactsRemove');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 401:
    case 404:
    case 500:
      status = devOptionValue;
      break;

    default:
      var contactId = parseInt(req.params.userId, 10);

      if (contactId) {
        json = {
          data: {
            id: contactId,
          },
        };
      } else {
        status = 404;
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
