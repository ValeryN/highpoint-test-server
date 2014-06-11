var Locations = require('../components/locations');
var models = require('../model');

var locations = new Locations();


var getIds = function(rawIds) {
  return rawIds.split(',').map(function(strId) {
    return parseInt(strId, 10) || 0;
  });
};

exports.findLocations = function(req, res) {
  var maxCount = 20;
  var query = '';
  var limit = maxCount;

  if (req.query) {
    query = req.query.query || '';
    limit = parseInt(req.query.limit, 10) || maxCount;
    limit = Math.min(Math.max(limit, 1), maxCount);
  }

  var cities = locations.findCities(query, limit);

  var regionIds = cities.map(function(city) {
    return city.region_id;
  });
  var regions = locations.getRegions(regionIds, true);
  var countryIds = regions.map(function(region) {
    return region.country_id;
  });
  var countries = locations.getCountries(countryIds, true);

  res.json({
    cities: cities,
    countries: countries,
    regions: regions,
  });
};

exports.getLocations = function(req, res) {
  if (req.query) {
    var cityIds = getIds(req.query.city_ids);
    var regionIds = getIds(req.query.region_ids);
    var countryIds = getIds(req.query.country_ids);

    var cities = locations.getCities(cityIds, true);
    regionIds = regionIds.concat(cities.map(function(city) {
      return city.region_id;
    }));
    var regions = locations.getRegions(regionIds, true);
    countryIds = countryIds.concat(regions.map(function(region) {
      return region.country_id;
    }));
    var countries = locations.getCountries(countryIds, true);

    res.json({
      cities: cities,
      countries: countries,
      regions: regions,
    });
  } else {
    res.json({});
  }
};
