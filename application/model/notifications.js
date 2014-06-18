var Model = require('./Model');
var NotificationType = require('./NotificationType');
var users = require('./users');


var model = module.exports = new Model([
  {
    id: 1,
    createdAt: "2012-08-02 00:02:56",
    source: users.get(2),
    type: NotificationType.MESSAGE,
  },
  {
    id: 2,
    createdAt: "2012-08-02 00:02:56",
    source: users.get(3),
    type: NotificationType.MESSAGE,
  }
]);
