var Locations = require('../components/locations');
var models = require('../model');

var locations = new Locations();


var getIds = function(rawIds) {
  return rawIds ? rawIds.split(',').map(function(strId) {
    return parseInt(strId, 10) || 0;
  }) : [];
};

/**
 * @param {!Array.<City>} cities
 * @return {{regionsMap:!Object.<Region>,countriesMap:!Object.<Country>}}
 */
var getMaps = function(cities) {
  var regionIds = cities.map(function(city) {
    return city.regionId;
  });
  var regions = locations.getRegions(regionIds, true);
  var countryIds = regions.map(function(region) {
    return region.countryId;
  });
  var countriesMap = {};
  var regionsMap = {};

  locations.getCountries(countryIds, true).forEach(function(country) {
    countriesMap[country.id] = country;
  });
  regions.forEach(function(region) {
    regionsMap[region.id] = region;
  });

  return {
    countriesMap: countriesMap,
    regionsMap: regionsMap,
  }
};

exports.findCities = function(req, res) {
  var maxCount = 20;
  var query = '';
  var limit = maxCount;

  if (req.query) {
    query = req.query.query || '';
    limit = parseInt(req.query.limit, 10) || maxCount;
    limit = Math.min(Math.max(limit, 1), maxCount);
  }

  var cities = locations.findCities(query, limit);
  var maps = getMaps(cities);

  res.json({
    data: {
      cities: cities,
      countries: maps.countriesMap,
      regions: maps.regionsMap,
    }
  });
};

exports.getPopularCities = function(req, res) {
  var cities = locations.getCities([2097, 2287, 1956, 796, 1283, 2732, 2644]);
  var maps = getMaps(cities);

  res.json({
    data: {
      cities: cities,
      countries: maps.countriesMap,
      regions: maps.regionsMap,
    }
  });
};

exports.getLocations = function(req, res) {
  if (req.query) {
    var cityIds = getIds(req.query.cityIds);
    var regionIds = getIds(req.query.regionIds);
    var countryIds = getIds(req.query.countryIds);

    var cities = locations.getCities(cityIds, true);
    regionIds = regionIds.concat(cities.map(function(city) {
      return city.regionId;
    }));
    var regions = locations.getRegions(regionIds, true);
    countryIds = countryIds.concat(regions.map(function(region) {
      return region.countryId;
    }));
    var countries = locations.getCountries(countryIds, true);

    res.json({
      data: {
        cities: cities,
        countries: countries,
        regions: regions,
      }
    });
  } else {
    res.json({
      data: null
    });
  }
};
