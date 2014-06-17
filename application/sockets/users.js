var ClientMessage = require('../components/socket').ClientMessage;


var map = {
  sendMessage: ClientMessage.SEND_MESSAGE,
  messagesRead: ClientMessage.MESSAGES_READ,
  typingFinish: ClientMessage.TYPING_FINISH,
  typingStart: ClientMessage.TYPING_START
};

var getHandler = function(method, clientMessage) {
  return function(app, socket, jsonData) {
    console.log('Socket message from client: ' + clientMessage, jsonData);
  };
};

for (var method in map) {
  exports[method] = getHandler(method, map[method]);
}
