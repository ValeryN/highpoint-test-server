var rootPath = __dirname + '/..';
var webPath = rootPath + '/public';

module.exports = {
  address: 'http://localhost:3002',
  apiAddress: '',
  env: 'development',
  filesPath: webPath + '/media',
  filesWebPath: '/media',
  session: {
    key: 'sessionKeyFromServer',
    value: 'sessionValueFromServer',
  },
  ip: '',// '127.0.0.1',
  tempFilesPath: webPath + '/t',
  webTempFilesPath: '/t',
  port: 3002,
  webPath: webPath,
  avatarTypes: {
    s640: [640, 640],
  },
  photoTypes: {
    s640: [640, 640],
    s1000: [1000, 1000],
    s1500: [1500, 1500],
  }
};
