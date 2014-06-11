var fs = require('fs');
var imagemagick = require('imagemagick');

var ServerMessage = require('../components/socket').ServerMessage;
var models = require('../model');
var config = require('../config');
var devSettings = require('../settings');


exports.app = function(req, res) {
  var viewOptions = {
    config: config,
  };

  res.render('developer', viewOptions);
};

exports.options = function(req, res) {
  res.json({
    options: devSettings.items,
    values: devSettings.valuesMap
  });
};

exports.setOption = function(req, res) {
  var key = req.body.key;
  var value = JSON.parse(req.body.value);

  if (key) {
    devSettings.set(key, value);
  }

  res.json(null);
};

var getAvatar = function(type, req, res, next) {
  var name = req.params.photoToken;
  var fileName = config.webPath + '/s/avatars/' + name + '.jpg';
  var avatarTypes = config.avatarTypes;

  if (!req.query || !req.query.size || !avatarTypes[req.query.size]) {
    res.status(404);
    res.send('Image size not found');
  } else if (!fs.existsSync(fileName)) {
    res.status(404);
    res.send('Image not found');
  } else {
    var size = req.query.size;
    var ext = 'webp' == req.query.ext ? 'webp' : 'jpg';
    var resultFileName =
      [config.tempFilesPath + '/avatar_' + name, size + '.' + ext].join('_');
    var resultWebFileName =
      [config.webTempFilesPath + '/avatar_' + name, size + '.' + ext].join('_');

    if (fs.existsSync(resultFileName)) {
      res.sendfile(resultWebFileName, {
        maxAge: 31536000000,
        root: config.webPath,
      });
    } else {
      var crop = 'high' == type ?
        models.avatars.getHighCrop(name) : models.avatars.getSquareCrop(name);
      var command = [
        fileName,
        '-crop', crop,
        '-resize', avatarTypes[size].join('x'),
        '-strip',
        '-quality', 85,
        resultFileName
      ];
      imagemagick.convert(command, function(err) {
        if (err) {
          next(err);
        } else {
          res.sendfile(resultWebFileName, {
            maxAge: 31536000000,
            root: config.webPath,
          });
        }
      });
    }
  }
};

exports.getHighAvatar = function(req, res, next) {
  getAvatar('high', req, res, next);
};

exports.getSquareAvatar = function(req, res, next) {
  getAvatar('high', req, res, next);
};

exports.getPhoto = function(req, res) {
  var name = req.params.photoToken;
  var fileName = config.webPath + '/s/photos/' + name + '.jpg';
  var photoTypes = config.photoTypes;

  if (!req.query || !req.query.size || !photoTypes[req.query.size]) {
    res.status(404);
    res.send('Image size not found');
  } else if (!fs.existsSync(fileName)) {
    res.status(404);
    res.send('Image not found');
  } else {
    var size = req.query.size;
    var ext = 'webp' == req.query.ext ? 'webp' : 'jpg';
    var resultFileName =
      [config.tempFilesPath + '/photo_' + name, size + '.' + ext].join('_');
    var resultWebFileName =
      [config.webTempFilesPath + '/photo_' + name, size + '.' + ext].join('_');

    if (fs.existsSync(resultFileName)) {
      res.sendfile(resultWebFileName, {
        maxAge: 31536000000,
        root: config.webPath,
      });
    } else {
      var command = [
        fileName,
        '-resize', photoTypes[size].join('x'),
        '-strip',
        '-quality', 85,
        resultFileName
      ];
      imagemagick.convert(command, function(err) {
        if (err) {
          next(err);
        } else {
          res.sendfile(resultWebFileName, {
            maxAge: 31536000000,
            root: config.webPath,
          });
        }
      });
    }
  }
};

exports.setMessage = function(req, res) {
  var socketServer = req.app.get('socketServer');
  var contactId = req.body.userId ?
    req.body.userId : devSettings.get(devSettings.Type.CONTACT_ID);
  var incomingCallId = devSettings.get(devSettings.Type.INCOMING_CALL_ID);
  var outgoingCallId = devSettings.get(devSettings.Type.OUTGOING_CALL_ID);
  var incognitoIncomingCallId = devSettings.get(
    devSettings.Type.INCOGNITO_INCOMING_CALL_ID);
  var incognitoOutgoingCallId = devSettings.get(
    devSettings.Type.INCOGNITO_OUTGOING_CALL_ID);

  var incognito = 'true' == req.body.incognito;
  var incoming = 'true' == req.body.incoming;
  var callId;

  if (incognito) {
    callId = incoming ? incognitoIncomingCallId : incognitoOutgoingCallId;
  } else {
    callId = incoming ? incomingCallId : outgoingCallId;
  }

  switch (req.body.action) {
    case ServerMessage.BANS_UPDATE:
      socketServer.bansUpdate(req.body.full, req.body.incognito);
      break;

    case ServerMessage.CALL_ACCEPT:
      socketServer.callAccept(callId);

      break;

    case ServerMessage.CALL_ANSWER:
      var agree = req.body.agree;
      socketServer.callAnswer(callId, !!agree, true);

      break;

    case ServerMessage.CALL_CANCEL:
      var reason = req.body.reason;
      socketServer.callCancel(callId, reason);
      break;

    case ServerMessage.CALL_CLAIM:
      socketServer.callClaim(callId);
      break;

    case ServerMessage.CALL_DISCONNECT:
      var timeout = req.body.timeout;

      if (timeout) {
        socketServer.callDisconnectByTimeout(callId);
      } else {
        socketServer.callDisconnect(callId, true);
      }

      break;

    case ServerMessage.CALL_ESCAPE:
      var timeout = req.body.timeout;

      if (timeout) {
        socketServer.callEscapeByTimeout(callId);
      } else {
        socketServer.callEscape(callId, true);
      }

      break;

    case ServerMessage.CALL_MESSAGE:
      socketServer.callMessage(callId);
      break;

    case ServerMessage.CALL_MESSAGE_ERROR:
      var errorType = req.body.error;
      socketServer.callMessageError(undefined, errorType);
      break;

    case ServerMessage.CALL_MESSAGE_SENT:
      socketServer.callMessageSent(callId);
      break;

    case ServerMessage.CALL_REJECT:
      socketServer.callReject(callId);
      break;

    case ServerMessage.CALL_REVEAL:
      var reveal = req.body.reveal;
      socketServer.callReveal(callId, true, reveal);
      break;

    case ServerMessage.CALL_STATE:
      socketServer.callState(callId);
      break;

    case ServerMessage.CALL_STOP:
      var timeout = req.body.timeout;

      if (timeout) {
        socketServer.callStopByTimeout(callId);
      } else {
        socketServer.callStop(callId, true);
      }

      break;

    case ServerMessage.CALL_TYPING_FINISH:
      socketServer.callTypingFinish(callId, true);
      break;

    case ServerMessage.CALL_TYPING_START:
      socketServer.callTypingStart(callId, true);
      break;

    case ServerMessage.CALLER_OFFLINE:
      socketServer.callerOffline(callId, true);
      break;

    case ServerMessage.CALLER_ONLINE:
      socketServer.callerOnline(callId, true);
      break;

    case ServerMessage.CLOSE:
      socketServer.close();
      break;

    case ServerMessage.CONTACT_ADD:
      socketServer.contactAdd(contactId);

      break;

    case ServerMessage.CONTACT_MESSAGE:
      socketServer.contactMessage(contactId);

      break;

    case ServerMessage.CONTACT_MESSAGE_ERROR:
      var error = req.body.error;
      socketServer.contactMessageError(contactId, undefined, error);

      break;

    case ServerMessage.CONTACT_MESSAGE_READ:
      socketServer.contactMessageRead(contactId);
      break;

    case ServerMessage.CONTACT_MESSAGE_SENT:
      socketServer.contactMessageSent(contactId);
      break;

    case ServerMessage.CONTACT_OFFLINE:
      socketServer.contactOffline(contactId);
      break;

    case ServerMessage.CONTACT_ONLINE:
      socketServer.contactOnline(contactId);
      break;

    case ServerMessage.CONTACT_REMOVE:
      socketServer.contactRemove(contactId);
      break;

    case ServerMessage.CONTACT_TYPING_FINISH:
      socketServer.contactTypingFinish(contactId);
      break;

    case ServerMessage.CONTACT_TYPING_START:
      socketServer.contactTypingStart(contactId);
      break;

    case ServerMessage.FAVORITE_OFFLINE:
      socketServer.favoriteOffline();
      break;

    case ServerMessage.FAVORITE_ONLINE:
      socketServer.favoriteOnline();
      break;

    case ServerMessage.FAVORITE_REMOVE:
      socketServer.favoriteRemove();
      break;

    case ServerMessage.INCOGNITO_COUNT_UPDATE:
      socketServer.incognitoCountUpate();
      break;

    case ServerMessage.INCOMING_CALL:
      socketServer.incomingCall(callId);

      break;

    case ServerMessage.INCOMING_CALL_CANCEL:
      var reason = req.body.reason;
      socketServer.incomingCallCancel(callId, reason);
      break;

    case ServerMessage.INTERBAN:
      socketServer.interban(callId);
      break;

    case ServerMessage.MATRIX_BANNERS_UPDATE:
      socketServer.matrixBannerUpdate();
      break;

    case ServerMessage.ME_UPDATE:
      socketServer.meUpdate();
      break;

    case ServerMessage.MISSED_CALL_UPDATE:
      socketServer.missedCallUpdate();
      break;

    case ServerMessage.NOTIFICATION:
      var notificationId = 0;

      switch (req.body.type) {
        case 'added_to_favourites':
          switch (req.body.gender) {
            case '1':
              notificationId = 1;
              break;
            case '2':
              notificationId = 2;
              break;
            default:
              notificationId = 3;
              break;
          }

          break;

        case 'added_to_favourites_wrapper':
          notificationId = 4;
          break;

        case 'appointment_created':
          switch (req.body.gender) {
            case '1':
              notificationId = 5;
              break;
            case '2':
              notificationId = 6;
              break;
            default:
              notificationId = 7;
              break;
          }

          break;

        case 'avatar_claim':
          notificationId = 8;
          break;

        case 'call_claim':
          notificationId = 9;
          break;

        case 'call_missed':
          switch (req.body.gender) {
            case '1':
              notificationId = 10;
              break;
            case '2':
              notificationId = 11;
              break;
            default:
              notificationId = 12;
              break;
          }

          break;

        case 'claim_warned':
          notificationId = 13;
          break;

        case 'email_change_queued':
          notificationId = 14;
          break;

        case 'email_confirmed':
          notificationId = 15;
          break;

        case 'hon_selection_created':
          switch (req.body.gender) {
            case '1':
              notificationId = 16;
              break;
            case '2':
              notificationId = 17;
              break;
            default:
              notificationId = 18;
              break;
          }

          break;

        case 'new_gift':
          switch (req.body.gender) {
            case '1':
              notificationId = 19;
              break;
            case '2':
              notificationId = 20;
              break;
            default:
              notificationId = 21;
              break;
          }

          break;

        case 'new_message':
          switch (req.body.gender) {
            case '1':
              notificationId = 22;
              break;
            case '2':
              notificationId = 23;
              break;
            default:
              notificationId = 24;
              break;
          }

          break;

        case 'poke_photos':
          notificationId = 25;

          break;

        case 'profile_approved':
          switch (req.body.status) {
            case 'confirmed':
              notificationId = 26;
              break;

            case 'email':
              notificationId = 27;
              break;

            default:
              notificationId = 28;
              break;
          }

          break;

        case 'profile_rejected':
          switch (req.body.field) {
            case 'name':
              notificationId = 29;
              break;

            case 'photo':
              notificationId = 30;
              break;

            default:
              notificationId = 31;
              break;
          }

          break;

        case 'profile_will_be_approved':
          notificationId = 32;
          break;

        case 'promo_code_redeemed':
          notificationId = 33;
          break;

        case 'status_approved':
          notificationId = 34;
          break;

        case 'status_rejected':
          notificationId = 35;
          break;

        case 'transaction':
          notificationId = 36;
          break;

        case 'service_expired':
          switch (req.body.service_type) {
            case 'additional_favourites':
              notificationId = 37;
              break;

            case 'hon_shows':
              notificationId = 38;
              break;

            case 'vip_status':
              notificationId = 39;
              break;
          }

          break;
      }

      if (notificationId) {
        socketServer.notification(notificationId);
      }

      break;

    case ServerMessage.OUTGOING_CALL:
      socketServer.outgoingCall(callId);
      break;

    case ServerMessage.OUTGOING_CALL_CANCEL:
      var reason = req.body.reason;
      socketServer.outgoingCallCancel(callId, reason);
      break;

    case ServerMessage.PAGE_RELOAD:
      socketServer.pageReload();
      break;

    case ServerMessage.SOCIAL_BUTTONS_SHOW:
      socketServer.socialButtonsShow();
      break;
  }

  res.json(null);
};
