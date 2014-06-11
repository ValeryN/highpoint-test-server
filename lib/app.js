var application = require('../application');


var optimist = require('optimist');
var argv = optimist
  .usage('Usage: $0')
  .alias('help', 'h')
  .describe('help', 'This text')
  .alias('port', 'p')
  .default('port', 3001)
  .describe('port', 'Application port: http://localhost:<port>')
  .describe('api', 'API address. For example http://192.168.0.1')
  .argv;

if (argv.h) {
  optimist.showHelp();
} else {
  application.start(argv.p, argv.api);
}
