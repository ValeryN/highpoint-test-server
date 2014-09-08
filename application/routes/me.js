var config = require('../config');
var devSettings = require('../settings');
var models = require('../model');

var uploadedAvatar = new models.UploadedAvatar();

var getIds = function(rawIds) {
  return rawIds ? rawIds.split(',').map(function(strId) {
    return parseInt(strId, 10) || 0;
  }) : [];
};

exports.get = function(req, res, next) {
  var devOptionValue = devSettings.get('meUser');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 201:
      json = {
        data: {
          user: {
            id: '1',
            name: 10
          }
        }
      };
      break;

    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
      json = {
        data: {
          user: models.myUsers.get(1)
        }
      };
      break;
  }

  if (200 == status) {
    res.json(json);
  } else {
    var error = new Error();
    error.status = status;
    next(error);
  }
};

exports.addAvatar = function(req, res, next) {
  var devOptionValue = devSettings.get('avatarAdd');
  var status = 200;
  var json = null;
  var async = false;

  switch (devOptionValue) {
    case 201:
      json = {
        data: {
          image: models.avatars.getRandom().originalImage,
        }
      };
      break;

    case 202:
      json = {
        data: {
          image: models.avatars.getAt(1).originalImage,
        }
      };
      break;

    case 203:
      json = {
        data: {
          image: {
            src: 1,
          }
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
      if (req && req.files && req.files.image) {
        async = true;
        uploadedAvatar.upload(req.files.image, function(err, image) {
          if (err) return next(err);

          res.json({
            data: {
              image: {
                src: config.imageServerPath + image.src,
                width: image.width,
                height: image.height,
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

exports.cropAvatar = function(req, res, next) {
  var devOptionValue = devSettings.get('avatarCrop');
  var status = 200;
  var json = null;
  var async = false;

  switch (devOptionValue) {
    case 201:
      var avatar = models.avatars.getAt(0);
      avatar.crop = { left: 0, top: 0, width: -10, height: -10 };

      json = {
        data: {
          avatar: avatar
        }
      };
      break;

    case 401:
    case 404:
    case 500:
      status = devOptionValue;
      break;

    default:
      var regExp = /^\d+$/;
      var height = regExp.test(req.body.height) ?
        parseInt(req.body.height, 10) : -1;
      var width = regExp.test(req.body.width) ?
        parseInt(req.body.width, 10) : -1;
      var top = regExp.test(req.body.top) ?
        parseInt(req.body.top, 10) : -1;
      var left = regExp.test(req.body.left) ?
        parseInt(req.body.left, 10) : -1;

      if (0 < height && 0 < width && 0 <= left && 0 <= top) {
        async = true;
        uploadedAvatar.crop({
          height: height,
          left: left,
          top: top,
          width: width
        }, function(err, image, originImage) {
          if (err) return next(err);

          res.json({
            data: {
              avatar: {
                crop: {
                  height: height,
                  left: left,
                  top: top,
                  width: width
                },
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
              }
            }
          });
        });
      } else {
        status = 403;
        json = {
          error: {
            code: models.ErrorCode.WRONG_PARAMS,
            params: []
          }
        };

        if (0 >= height) {
          json.error.params.push({
            code: models.ErrorCode.WRONG_FORMAT,
            name: 'height',
          });
        }

        if (0 >= width) {
          json.error.params.push({
            code: models.ErrorCode.WRONG_FORMAT,
            name: 'width',
          });
        }

        if (0 > left) {
          json.error.params.push({
            code: models.ErrorCode.WRONG_FORMAT,
            name: 'left',
          });
        }

        if (0 > top) {
          json.error.params.push({
            code: models.ErrorCode.WRONG_FORMAT,
            name: 'top',
          });
        }
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

exports.updateFilter = function(req, res, next) {
  var devOptionValue = devSettings.get('meFilterUpdate');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
      var filter = models.filters.getAt(0);
      filter.cityIds = req.body.cityIds ?
        getIds(req.body.cityIds) : filter.cityIds;
      filter.genders = req.body.genders ?
        getIds(req.body.genders) : filter.genders;
      filter.maxAge = parseInt(req.body.maxAge, 10) || filter.maxAge;
      filter.minAge = parseInt(req.body.minAge, 10) || filter.minAge;
      filter.viewType = parseInt(req.body.viewType, 10) || filter.viewType;

      json = {
        data: {
          filter: filter
        },
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

exports.getPhotos = function(req, res, next) {
  var devOptionValue = devSettings.get('myPhotos');
  var json = null;
  var status = 200;

  switch (devOptionValue) {
    case 201:
      json = {
        data: {
          photos: null
        }
      };
      break;

    case 202:
      json = {
        data: {
          photos: 1
        }
      };
      break;

    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
      json = {
        data: {
          photos: models.photos.getList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        }
      };
      break
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

exports.sortPhotos = function(req, res, next) {
  var devOptionValue = devSettings.get('myPhotosSort');
  var json = null;
  var status = 200;

  switch (devOptionValue) {
    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
      var rawIds = null;
      var ids = null;

      try {
        rawIds = JSON.parse(req.body.ids);
      } catch (e) {}

      if (Array.isArray(rawIds)) {
        ids = [];

        rawIds.forEach(function(rawId) {
          if (/^\d+$/.test(rawId)) {
            var id = parseInt(rawId, 10);

            if (0 < id) {
              ids.push(id);
            }
          }
        });
      }

      if (ids) {
        json = {
          data: {
            photos: models.photos.getList(ids)
          }
        };
      } else {
        status = 403;
        json = {
          error: {
            code: models.ErrorCode.WRONG_PARAMS,
            params: [{
              code: models.ErrorCode.REQUIRED,
              name: 'ids',
            }]
          }
        };
      }

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

var addReferenceItem = function(req, res, referenceField, jsonField) {
  var name = req.body.name;

  if (name) {
    data = {};
    data[jsonField] = {
      id: models[referenceField].getNextId(),
      name: name
    };
    res.json({
      data: data
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
    data: {
      ids: ids
    }
  });
};

exports.addCareerItem = function(req, res, next) {
  var devOptionValue = devSettings.get('meCareerAdd');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
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

        json = {
          data: {
            careerItem: {
              id: models.careerItems.getNextId(),
              companyId: company.id,
              fromYear: fromYear || null,
              postId: careerPost ? careerPost.id : null,
              toYear: toYear || null,
            }
          }
        };
      } else {
        status = 403;
        json = {
          error: {
            code: models.ErrorCode.WRONG_PARAMS,
            params: [{
              code: models.ErrorCode.REQUIRED,
              name: 'company'
            }]
          }
        };
      }

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

exports.removeCareerItems = function(req, res, next) {
  var devOptionValue = devSettings.get('meCareerRemove');
  var status = 200;

  switch (devOptionValue) {
    case 401:
    case 500:
      status = devOptionValue;
      break;
  }

  if (200 == status) {
    removeReferenceItems(req, res);
  } else {
    var error = new Error();
    error.status = status;
    next(error);
  }
};

exports.addLanguage = function(req, res, next) {
  var devOptionValue = devSettings.get('meLanguageAdd');
  var status = 200;

  switch (devOptionValue) {
    case 401:
    case 500:
      status = devOptionValue;
      break;
  }

  if (200 == status) {
    addReferenceItem(req, res, 'languages', 'language');
  } else {
    var error = new Error();
    error.status = status;
    next(error);
  }
};

exports.removeLanguages = function(req, res, next) {
  var devOptionValue = devSettings.get('meLanguageRemove');
  var status = 200;

  switch (devOptionValue) {
    case 401:
    case 500:
      status = devOptionValue;
      break;
  }

  if (200 == status) {
    removeReferenceItems(req, res);
  } else {
    var error = new Error();
    error.status = status;
    next(error);
  }
};

exports.addPlace = function(req, res, next) {
  var devOptionValue = devSettings.get('mePlaceAdd');
  var status = 200;

  switch (devOptionValue) {
    case 401:
    case 500:
      status = devOptionValue;
      break;
  }

  if (200 == status) {
    addReferenceItem(req, res, 'places', 'place');
  } else {
    var error = new Error();
    error.status = status;
    next(error);
  }
};

exports.removePlaces = function(req, res, next) {
  var devOptionValue = devSettings.get('mePlaceRemove');
  var status = 200;

  switch (devOptionValue) {
    case 401:
    case 500:
      status = devOptionValue;
      break;
  }

  if (200 == status) {
    removeReferenceItems(req, res);
  } else {
    var error = new Error();
    error.status = status;
    next(error);
  }
};

exports.addEducationItem = function(req, res, next) {
  var devOptionValue = devSettings.get('meEducationAdd');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 401:
    case 500:
      status = devOptionValue;
      break;

    default:
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

        json = {
          data: {
            educationItem: {
              id: models.educationItems.getNextId(),
              fromYear: fromYear || null,
              schoolId: school.id,
              specialityId: speciality ? speciality.id : null,
              toYear: toYear || null,
            }
          }
        };
      } else {
        status = 403;
        json = {
          error: {
            code: models.ErrorCode.WRONG_PARAMS,
            params: [{
              code: models.ErrorCode.REQUIRED,
              name: 'school'
            }]
          }
        };
      }

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

exports.removeEducationItems = function(req, res, next) {
  var devOptionValue = devSettings.get('meEducationRemove');
  var status = 200;

  switch (devOptionValue) {
    case 401:
    case 500:
      status = devOptionValue;
      break;
  }

  if (200 == status) {
    removeReferenceItems(req, res);
  } else {
    var error = new Error();
    error.status = status;
    next(error);
  }
};
