var models = require('../model');


exports.getUsers = function(req, res) {
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

  res.json({
    data: {
      users: users,
      messages: messages,
    }
  });
};

exports.remove = function(req, res) {
  var contactId = parseInt(req.params.userId, 10);

  res.json({
    data: {
      id: contactId,
    },
  });
};
