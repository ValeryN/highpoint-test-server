exports.getIp = function() {
  var os = require('os');
  var ifaces = os.networkInterfaces();

  for (var dev in ifaces) {
    if (!dev.indexOf('en')) {
      for (var i = 0; i < ifaces[dev].length; i++) {
        if ('IPv4' == ifaces[dev][i].family) {
          return ifaces[dev][i].address;
        }
      }
    }
  }

  return '';
};
