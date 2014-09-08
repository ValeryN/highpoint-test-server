var Model = require('./Model');
var config = require('../config');


var model = module.exports = new Model([
  {
    avatar: {
      maxFileSize: 1024 * 1024 * 10, // 10 МБ
      minCropSize: {
        width: 640,
        height: 640
      },
      minImageSize: {
        width: 640,
        height: 640
      }
    },
    photo: {
      maxFileSize: 1024 * 1024 * 10, // 10 МБ
      minImageSize: {
        width: 640,
        height: 640
      }
    },
    point: {
      maxPeriod: 360,
      minPeriod: 10,
    },
    webSocketUrls: config.webSocketServerPaths,
  }
], null);
