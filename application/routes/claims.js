var models = require('../model');


exports.getList = function(req, res) {
  res.json(models.notifications.getAll());
};
