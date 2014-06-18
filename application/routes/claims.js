var models = require('../Model');


exports.getList = function(req, res) {
  res.json(models.notifications.getAll());
};
