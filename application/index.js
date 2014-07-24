var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var http = require('http');
var path = require('path');
var socketIo = require('socket.io');

var ClientMessage = require('./components/socket').ClientMessage;
var Socket = require('./components/socket');

var config = require('./config');
var routes = require('./routes');
var sockets = require('./sockets');

var app = express();
var server = http.createServer(app);

app.set('env', config.env);
app.use(require('compression')());
app.enable('case sensitive routing');
app.use(require('morgan')('tiny'));
app.use(require('method-override')());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(require('connect-multiparty')());
app.use(require('cookie-parser')('flksjf;jsE76_2ff'));
app.use(require('cookie-session')({
  secret: 'mwrY2fns'
}));
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  }
}));
app.use(express.static(config.webPath));

var io = socketIo.listen(server, {
  'browser client gzip': true,
  'log level': 3
});

var socketHandlers = {};
socketHandlers[ClientMessage.ACTIVITY_END]           = sockets.common.activityEnd;
socketHandlers[ClientMessage.ACTIVITY_START]         = sockets.common.activityStart;
socketHandlers[ClientMessage.SEND_MESSAGE]           = sockets.users.sendMessage;
socketHandlers[ClientMessage.MESSAGES_READ]          = sockets.users.messagesRead;
socketHandlers[ClientMessage.NOTIFICATION_READ]      = sockets.common.notificationRead;
socketHandlers[ClientMessage.ALL_NOTIFICATIONS_READ] = sockets.common.allNotificationsRead;
socketHandlers[ClientMessage.TYPING_FINISH]          = sockets.users.typingFinish;
socketHandlers[ClientMessage.TYPING_START]           = sockets.users.typingStart;

var socketServer = new Socket(io);
app.set('socketIo', io.sockets);
app.set('socketServer', socketServer);

io.sockets.on('connection', function(socket) {
  for (var key in socketHandlers) {
    socket.on(key, function() {
      var args = [app, socket].concat(Array.prototype.slice.call(arguments));
      socketHandlers[key].apply(null, args);
    });
  }
});

app.param(function(name, fn) {
  if (fn instanceof RegExp) {
    return function(req, res, next, val) {
      var captures = fn.exec(String(val));

      if (captures) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    }
  }
});

app.param('callId', /^\d+$/);
app.param('photoId', /^\d+$/);
app.param('photoToken', /^[\dA-Za-z_\-]+$/);
app.param('pointId', /^\d+$/);
app.param('token', /^[0-9a-zA-Z]+$/);
app.param('userId', /^\d+$/);

app.post('/v201405/contacts', routes.contacts.getUsers);
app.post('/v201405/contacts/:userId/remove', routes.contacts.remove);

app.get('/v201405/geo', routes.geo.getLocations);
app.get('/v201405/geo/find', routes.geo.findLocations);

app.get('/v201405/me', routes.me.get);
app.post('/v201405/me/career/add', routes.me.addCareerItem);
app.post('/v201405/me/career/remove', routes.me.removeCareerItems);
app.post('/v201405/me/education/add', routes.me.addEducationItem);
app.post('/v201405/me/education/remove', routes.me.removeEducationItems);
app.post('/v201405/me/filter/update', routes.me.updateFilter);
app.post('/v201405/me/languages/add', routes.me.addLanguage);
app.post('/v201405/me/languages/remove', routes.me.removeLanguages);
app.post('/v201405/me/places/add', routes.me.addPlace);
app.post('/v201405/me/places/remove', routes.me.removePlaces);

app.get('/v201405/points', routes.points.getList);
app.post('/v201405/points/:pointId/like', routes.points.like);
app.post('/v201405/points/:pointId/unlike', routes.points.unlike);

app.get('/v201405/reference', routes.reference.getReference);
app.get('/v201405/reference/career-posts/find', routes.reference.findCareerPosts);
app.get('/v201405/reference/companies/find', routes.reference.findCompanies);
app.get('/v201405/reference/languages/find', routes.reference.findLanguages);
app.get('/v201405/reference/places/find', routes.reference.findPlaces);
app.get('/v201405/reference/schools/find', routes.reference.findSchools);
app.get('/v201405/reference/specialities/find', routes.reference.findSpecialities);

app.get('/v201405/settings', routes.settings.get);

app.post('/v201405/signin', routes.auth.signin);
app.post('/v201405/signup', routes.auth.signup);

app.get('/v201405/users', routes.users.getList);
app.get('/v201405/users/:userId/messages', routes.users.getMessages);
app.post('/v201405/users/:userId/messages/add', routes.users.addMessages);




app.get('/developer/settings', routes.developer.options);
app.put('/developer/settings/option', routes.developer.setOption);
app.post('/developer/send', routes.developer.setMessage);

app.get('/apps/developer', routes.developer.app);

app.get('/images/avatar/high/:photoToken', routes.developer.getHighAvatar);
app.get('/images/avatar/square/:photoToken', routes.developer.getSquareAvatar);
app.get('/images/photo/:photoToken', routes.developer.getPhoto);

app.get('/panel', routes.pages.panel);

app.use(routes.pages.error);

server.listen(config.port, config.ip, function() {
  console.log(
    "HighPoint Test Server listening on " + config.ip + ':' + config.port);
});

exports.server = server;
