var Locations = require('../components/locations');
var devSettings = require('../settings');
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
  var devOptionValue = devSettings.get('geoCitiesFind');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 201:
      json = {
        data: null
      };
      break;

    case 202:
      json = {
        data: {
          cities: [{
            id: '1',
            name: 5,
          }]
        }
      };
      break;

    case 500:
      status = devOptionValue;
      break;

    default:
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

      json = {
        data: {
          cities: cities,
          countries: maps.countriesMap,
          regions: maps.regionsMap,
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

exports.getPopularCities = function(req, res, next) {
  var devOptionValue = devSettings.get('geoPopularCities');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 201:
      json = {
        data: null
      };
      break;

    case 202:
      json = {
        data: {
          cities: [{
            id: '1',
            name: 5,
          }]
        }
      };
      break;

    case 500:
      status = devOptionValue;
      break;

    default:
      var cities = locations.getCities([2097, 2287, 1956, 796, 1283, 2732, 2644]);
      var maps = getMaps(cities);

      json = {
        data: {
          cities: cities,
          countries: maps.countriesMap,
          regions: maps.regionsMap,
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

exports.getLocations = function(req, res, next) {
  var devOptionValue = devSettings.get('geoLocations');
  var status = 200;
  var json = null;

  switch (devOptionValue) {
    case 201:
      json = {
        data: null
      };
      break;

    case 202:
      json = {
        data: {
          cities: [{
            id: '1',
            name: 5,
          }]
        }
      };
      break;

    case 500:
      status = devOptionValue;
      break;

    default:
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

        json = {
          data: {
            cities: cities,
            countries: countries,
            regions: regions,
          }
        };
      } else {
        json = {
          data: null
        };
      }

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
