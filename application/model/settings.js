var Model = require('./Model');
var config = require('../config');


var model = module.exports = new Model([
  {
    avatar: {
      maxFileSize: 1024 * 1024 * 10, // 10 МБ
      minImageSize: [640, 640]
    },
    point: {
      maxPeriod: 360,
      minPeriod: 10,
    },
    webSocketUrls: config.webSocketServerPaths,
  }
], null);
