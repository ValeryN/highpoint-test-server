var Reference = require('../components/reference');
var models = require('../Model');

var reference = new Reference();


var getIds = function(rawIds) {
  return rawIds ? rawIds.split(',').map(function(strId) {
    return parseInt(strId, 10) || 0;
  }) : [];
};

var findItems = function(req, res, referenceMethod) {
  var maxCount = 20;
  var query = '';
  var limit = maxCount;

  if (req.query) {
    query = req.query.query || '';
    limit = parseInt(req.query.limit, 10) || maxCount;
    limit = Math.min(Math.max(limit, 1), maxCount);
  }

  res.json({
    data: reference[referenceMethod](query, limit)
  });
};

exports.findCareerPosts = function(req, res) {
  findItems(req, res, 'findCareerPosts');
};

exports.findCompanies = function(req, res) {
  findItems(req, res, 'findCompanies');
};

exports.findLanguages = function(req, res) {
  findItems(req, res, 'findLanguages');
};

exports.findPlaces = function(req, res) {
  findItems(req, res, 'findPlaces');
};

exports.findSchools = function(req, res) {
  findItems(req, res, 'findSchools');
};

exports.findSpecialities = function(req, res) {
  findItems(req, res, 'findSpecialities');
};

exports.getReference = function(req, res) {
  var data = null;

  if (req.query) {
    var items = [
      ['careerPostIds', 'careerPosts', 'getCareerPosts'],
      ['companyIds', 'companies', 'getCompanies'],
      ['languageIds', 'languages', 'getLanguages'],
      ['placeIds', 'places', 'getPlaces'],
      ['schoolIds', 'schools', 'getSchools'],
      ['specialityIds', 'specialities', 'getSpecialities'],
    ];
    for (var i = 0; i < items.length; i++) {
      var idsKey = items[i][0];
      var fieldKey = items[i][1];
      var methodKey = items[i][2];
      var ids = getIds(req.query[idsKey]);
      var fieldData = reference[methodKey](ids, true);

      if (fieldData && fieldData.length) {
        if (!data) {
          data = {};
        }

        data[fieldKey] = fieldData;
      }
    }
  }

  res.json({
    data: data
  });
};
