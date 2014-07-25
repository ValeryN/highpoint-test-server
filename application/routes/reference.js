var Reference = require('../components/reference');
var models = require('../model');

var reference = new Reference();


var getIds = function(rawIds) {
  return rawIds ? rawIds.split(',').map(function(strId) {
    return parseInt(strId, 10) || 0;
  }) : [];
};

var findItems = function(req, res, referenceMethod, jsonField) {
  var maxCount = 20;
  var query = '';
  var limit = maxCount;

  if (req.query) {
    query = req.query.query || '';
    limit = parseInt(req.query.limit, 10) || maxCount;
    limit = Math.min(Math.max(limit, 1), maxCount);
  }

  var data = {};
  data[jsonField] = reference[referenceMethod](query, limit);

  res.json({
    data: data
  });
};

exports.findCareerPosts = function(req, res) {
  findItems(req, res, 'findCareerPosts', 'careerPosts');
};

exports.findCompanies = function(req, res) {
  findItems(req, res, 'findCompanies', 'companies');
};

exports.findLanguages = function(req, res) {
  findItems(req, res, 'findLanguages', 'languages');
};

exports.findPlaces = function(req, res) {
  findItems(req, res, 'findPlaces', 'places');
};

exports.findSchools = function(req, res) {
  findItems(req, res, 'findSchools', 'schools');
};

exports.findSpecialities = function(req, res) {
  findItems(req, res, 'findSpecialities', 'specialities');
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
