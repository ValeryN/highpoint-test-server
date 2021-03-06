var ClientMessage = require('../components/socket').ClientMessage;


var map = {
  activityEnd: ClientMessage.ACTIVITY_END,
  activityStart: ClientMessage.ACTIVITY_START,
  allNotificationsRead: ClientMessage.ALL_NOTIFICATIONS_READ,
  notificationRead: ClientMessage.NOTIFICATION_READ
};

var getHandler = function(method, clientMessage) {
  return function(app, socket, jsonData) {
    console.log('Socket message from client: ' + clientMessage, jsonData);
  };
};

for (var method in map) {
  exports[method] = getHandler(method, map[method]);
}
