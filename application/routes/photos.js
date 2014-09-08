var config = require('../config');
var devSettings = require('../settings');
var models = require('../model');


exports.addPhoto = function(req, res, next) {
  var devOptionValue = devSettings.get('photosAdd');
  var status = 200;
  var json = null;
  var async = false;

  switch (devOptionValue) {
    case 201:
      json = {
        data: {
          photo: models.photos.getRandom(),
        }
      };
      break;

    case 202:
      json = {
        data: {
          photo: models.photos.getAt(1),
        }
      };
      break;

    case 203:
      json = {
        data: {
          photo: 5,
        }
      };
      break;

    case 4031:
      json = {
        error: {
          code: models.ErrorCode.WRONG_FILE_FORMAT,
        }
      };
      status = 403;
      break;

    case 4032:
      json = {
        error: {
          code: models.ErrorCode.TOO_LARGE_FILE,
        }
      };
      status = 403;
      break;

    case 4033:
      json = {
        error: {
          code: models.ErrorCode.TOO_SMALL_SIZE,
        }
      };
      status = 403;
      break;

    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
      if (req.files && req.files.image) {
        async = true;

        var uploadedImage = new models.UploadedAvatar();
        uploadedImage.upload(req.files.image, function(err, image) {
          if (err) return next(err);

          var id = models.photos.getNextId();

          res.json({
            data: {
              photo: {
                id: id,
                image: {
                  src: config.imageServerPath + image.src,
                  width: image.width,
                  height: image.height,
                },
                position: id
              }
            }
          });
        });
      } else {
        json = {
          error: {
            code: models.ErrorCode.WRONG_PARAMS,
            params: [{
              code: models.ErrorCode.REQUIRED,
              name: 'image'
            }]
          }
        };
        status = 403;
      }

      break;
  }

  if (!async) {
    if (200 == status) {
      res.json(json);
    } else {
      var error = new Error();
      error.result = json;
      error.status = status;
      next(error);
    }
  }
};

exports.removePhoto = function(req, res, next) {
  var devOptionValue = devSettings.get('photosRemove');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 401:
    case 403:
    case 404:
    case 500:
      status = devOptionValue;
      break;

    default:
      var photoId = parseInt(req.params.photoId, 10);
      json = {
        data: {
          id: photoId
        }
      };
      break;
  }

  if (200 == status) {
    res.json(json);
  } else {
    var error = new Error();
    error.result = json;
    error.status = status;
    next(error);
  }
};
