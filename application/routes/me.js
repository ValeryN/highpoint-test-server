var config = require('../config');
var devSettings = require('../settings');
var models = require('../Model');

var uploadedAvatar = new models.UploadedAvatar();

var getIds = function(rawIds) {
  return rawIds ? rawIds.split(',').map(function(strId) {
    return parseInt(strId, 10) || 0;
  }) : [];
};

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
              src: config.imageServerPath + image.src,
              width: image.width,
              height: image.height,
            },
            origin_image: {
              src: config.imageServerPath + originImage.src,
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
            src: config.imageServerPath + image.src,
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
      var cityIds = req.body.cityIds ? req.body.cityIds.split(',') : [];
      var genders = req.body.genders ? req.body.genders.split(',') : [];
      var maxAge = req.body.maxAge;
      var minAge = req.body.minAge;
      var viewType = req.body.viewType;
      result = {
        data: true
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

exports.getPhotos = function(req, res) {
  res.json({
    commercial: models.photos.getList([11, 12, 13]),
    free: models.photos.getList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  });
};

exports.sortPhotos = function(req, res) {
  res.json({
    data: true
  });
};

exports.removePhoto = function(req, res) {
  var photoId = parseInt(req.params.photoId, 10);

  res.json({
    data: true
  });
};

exports.uploadPhoto = function(req, res) {
  var commercial = req.body.photo && "true" == req.body.photo.commercial;
  var file = req.files.photo && req.files.photo.image;
  var title = req.body.photo ? req.body.photo.title : '';

  res.json(models.photos.getRandom());
};

var addReferenceItem = function(req, res, referenceField) {
  var name = req.body.name;

  if (name) {
    res.json({
      data: {
        id: models[referenceField].getNextId(),
        name: name
      }
    });
  } else {
    res.status(403);
    res.json({
      error: {
        code: models.ErrorCode.WRONG_PARAMS,
        params: [{
          code: models.ErrorCode.REQUIRED,
          name: 'name'
        }]
      }
    });
  }
};

var removeReferenceItems = function(req, res) {
  var ids = getIds(req.body.ids);

  res.json({
    data: ids
  });
};

exports.addCareerItem = function(req, res) {
  var companyId = parseInt(req.body.companyId, 10) || 0;
  var companyName = req.body.companyName;
  var fromYear = parseInt(req.body.fromYear, 10) || 0;
  var postId = parseInt(req.body.postId, 10) || 0;
  var postName = req.body.postName;
  var toYear = parseInt(req.body.toYear, 10) || 0;
  var company = companyId ? models.companies.get(companyId) : null;

  if (!company && companyName) {
    company = {
      id: models.companies.getNextId(),
      name: companyName,
    };
    models.companies.add(company);
  }

  if (company) {
    var careerPost = postId ? models.careerPosts.get(postId) : null;

    if (!careerPost && postName) {
      careerPost = {
        id: models.careerPosts.getNextId(),
        name: postName,
      };
      models.careerPosts.add(careerPost);
    }

    res.json({
      data: {
        id: models.careerItems.getNextId(),
        companyId: company.id,
        fromYear: fromYear || null,
        postId: careerPost ? careerPost.id : null,
        toYear: toYear || null,
      }
    });
  } else {
    res.status(403);
    res.json({
      error: {
        code: models.ErrorCode.WRONG_PARAMS,
        params: [{
          code: models.ErrorCode.REQUIRED,
          name: 'company'
        }]
      }
    });
  }
};

exports.removeCareerItems = function(req, res) {
  removeReferenceItems(req, res);
};

exports.addLanguage = function(req, res) {
  addReferenceItem(req, res, 'languages');
};

exports.removeLanguages = function(req, res) {
  removeReferenceItems(req, res);
};

exports.addPlace = function(req, res) {
  addReferenceItem(req, res, 'places');
};

exports.removePlaces = function(req, res) {
  removeReferenceItems(req, res);
};

exports.addEducationItem = function(req, res) {
  var fromYear = parseInt(req.body.fromYear, 10) || 0;
  var schoolId = parseInt(req.body.schoolId, 10) || 0;
  var schoolName = req.body.schoolName;
  var specialityId = parseInt(req.body.specialityId, 10) || 0;
  var specialityName = req.body.specialityName;
  var toYear = parseInt(req.body.toYear, 10) || 0;
  var school = schoolId ? models.schools.get(schoolId) : null;

  if (!school && schoolName) {
    school = {
      id: models.schools.getNextId(),
      name: schoolName,
    };
    models.schools.add(school);
  }

  if (school) {
    var speciality = specialityId ? models.specialities.get(specialityId) : null;

    if (!speciality && specialityName) {
      speciality = {
        id: models.specialities.getNextId(),
        name: specialityName,
      };
      models.specialities.add(speciality);
    }

    res.json({
      data: {
        id: models.educationItems.getNextId(),
        fromYear: fromYear || null,
        schoolId: school.id,
        specialityId: speciality ? speciality.id : null,
        toYear: toYear || null,
      }
    });
  } else {
    res.status(403);
    res.json({
      error: {
        code: models.ErrorCode.WRONG_PARAMS,
        params: [{
          code: models.ErrorCode.REQUIRED,
          name: 'school'
        }]
      }
    });
  }
};

exports.removeEducationItems = function(req, res) {
  removeReferenceItems(req, res);
};
