var rootPath = __dirname + '/..';
var webPath = rootPath + '/static/public';
var ip = 'auto'; //'127.0.0.1';
var port = 3002;

if ('auto' == ip) {
  var ip = require('./core/utils').getIp();

  if (!ip) {
    console.error('IP not found');
  }
}

module.exports = {
  avatarTypes: {
    s640: [640, 640],
  },
  env: 'development',
  filesPath: webPath + '/media',
  filesWebPath: '/media',
  imageServerPath: 'http://' + ip + ':' + port,
  ip: ip,
  photoTypes: {
    s640: [640, 640],
    s1000: [1000, 1000],
    s1500: [1500, 1500],
  },
  port: 3002,
  session: {
    key: 'sessionKeyFromServer',
    value: 'sessionValueFromServer',
  },
  tempFilesPath: webPath + '/t',
  webPath: webPath,
  webSocketServerPaths: ['http://' + ip + ':' + port],
  webTempFilesPath: '/t',
};
