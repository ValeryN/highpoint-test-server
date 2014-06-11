var config = require('../config');
var devSettings = require('../settings');
var models = require('../model');

var uploadedAvatar = new models.UploadedAvatar();

exports.get = function(req, res) {
  var devOption = devSettings.get(devSettings.Type.ME_USER);
  var status = 200;
  var result = null;

  switch (devOption) {
    case 401:
    case 500:
      status = devOption;
      break;

    default:
      result = {
        data: {
          user: models.myUsers.get(1)
        }
      };
      break;
  }

  if (200 == status) {
    res.json(result);
  } else {
    var error = new Error();
    error.result = result;
    error.status = status;
    next(error);
  }
};

exports.cropAvatar = function(req, res, next) {
  var settings = devSettings.get(devSettings.Type.AVATAR_UPLOAD);
  var status;
  var result = null;

  switch (settings) {
    case 403:
    case 500:
      status = settings;
      break;

    default:
      if (req.body && req.body.crop) {
        uploadedAvatar.crop(req.body.crop, function(err, image, originImage) {
          if (err) return next(err);

          res.json({
            crop: req.body.crop,
            image: {
              src: config.address + image.src,
              width: image.width,
              height: image.height,
            },
            origin_image: {
              src: config.address + originImage.src,
              width: originImage.width,
              height: originImage.height,
            },
          });
        });
      } else {
        status = 403;
      }

      break;
  }

  if (200 == status) {
    res.json(result);
  } else {
    var error = new Error();
    error.result = result;
    error.status = status;
    next(error);
  }
};

exports.uploadAvatar = function(req, res, next) {
  var devOptionValue = devSettings.get(devSettings.Type.AVATAR_UPLOAD);
  var status;
  var result = null;

  switch (devOptionValue) {
    case 201:
      result = models.avatars.getRandom().origin_image;
      status = 200;
      break;

    case 202:
      result = models.avatars.getAt(2).origin_image;
      status = 200;
      break;

    case 403:
    case 500:
      status = devOptionValue;
      break;

    default:
      if (req && req.files && req.files.image) {
        uploadedAvatar.upload(req.files.image, function(err, image) {
          if (err) return next(err);

          res.json({
            src: config.address + image.src,
            width: image.width,
            height: image.height,
          });
        });
      } else {
        status = 403;
      }

      break;
  }

  if (200 == status) {
    res.json(result);
  } else {
    var error = new Error();
    error.result = result;
    error.status = status;
    next(error);
  }
};

exports.updateFilter = function(req, res) {
  var setting = devSettings.get(devSettings.Type.ME_FILTER_UPDATE);
  var status = 200;
  var result = null;

  switch (setting) {
    case 401:
    case 500:
      status = setting;
      break;

    default:
      var cityIds = req.body.cityIds.split(',');
      var genders = req.body.genders.split(',');
      var maxAge = req.body.maxAge;
      var minAge = req.body.minAge;
      var viewType = req.body.viewType;
      result = {};

      break;
  }

  if (200 == status) {
    res.json(result);
  } else {
    var error = new Error();
    error.result = result;
    error.status = status;
    next(error);
  }
};

exports.getPhotos = function(req, res) {
  res.json({
    commercial: models.photos.getList([11, 12, 13]),
    free: models.photos.getList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  });
};

exports.sortPhotos = function(req, res) {
  res.json(null);
};

exports.removePhoto = function(req, res) {
  var photoId = parseInt(req.params.photoId, 10);

  res.json(null);
};

exports.uploadPhoto = function(req, res) {
  var commercial = req.body.photo && "true" == req.body.photo.commercial;
  var file = req.files.photo && req.files.photo.image;
  var title = req.body.photo ? req.body.photo.title : '';

  res.json(models.photos.getRandom());
};
