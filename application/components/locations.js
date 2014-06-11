var http = require('http');

var config = require('../config');
var models = require('../model');


/**
 * @constructor
 */
var Locations = module.exports = function() {

  /**
   * @private {Object.<City>}
   */
  this._citiesMap = {};

  /**
   * @private {Object.<Country>}
   */
  this._countriesMap = {};

  /**
   * @private {Object.<string>}
   */
  this._fullCityNamesMap = {};

  /**
   * @private {Object.<Region>}
   */
  this._regionsMap = {};

  this._setLocations(
    models.countries.getAll(), models.regions.getAll(), models.cities.getAll());
};


/**
 * @param {number} id
 * @return City
 */
Locations.prototype.getCity = function(id) {
  return this._citiesMap[id] || null;
};

/**
 * @param {Array.<number>} ids
 * @param {boolean=} opt_distinct
 * @return {!Array.<City>}
 */
Locations.prototype.getCities = function(ids, opt_distinct) {
  var cities = [];
  var idsMap = {};

  ids.forEach(function(id) {
    var city = this._citiesMap[id];

    if (city && (!opt_distinct || !idsMap[city.id])) {
      cities.push(city);
      idsMap[city.id] = 1;
    }
  }, this);

  return cities;
};

/**
 * @param {string} query
 * @param {number} limit
 * @return {!Array.<City>}
 */
Locations.prototype.findCities = function(query, limit) {
  query = query.toLowerCase();

  var func1 = function(city) {
    return city.name.toLowerCase() == query;
  };
  var func2 = function(city) {
    return city.name.toLowerCase() != query &&
      0 == city.full_name.toLowerCase().indexOf(query);
  };
  var func3 = function(city) {
    return city.name.toLowerCase() != query &&
      0 < city.full_name.toLowerCase().indexOf(query);
  };

  /** @type {!Array.<City>} */
  var cities = this._findCities(func1, limit);
  cities = cities.concat(this._findCities(func2, limit - cities.length));

  return cities.concat(this._findCities(func3, limit - cities.length));
};

/**
 * @param {function(City):boolean} func
 * @param {number} limit
 * @return {!Array.<City>}
 * @private
 */
Locations.prototype._findCities = function(func, limit) {
  var cities = [];

  for (var strId in this._citiesMap) {
    if (cities.length >= limit) {
      break;
    }

    var city = this._citiesMap[strId];

    if (func(city)) {
      cities.push(city);
    }
  }

  return cities;
};

/**
 * @param {number} id
 * @return {Country}
 */
Locations.prototype.getCountry = function(id) {
  return this._countriesMap[id] || null;
};

/**
 * @param {Array.<number>} ids
 * @param {boolean=} opt_distinct
 * @return {!Array.<Country>}
 */
Locations.prototype.getCountries = function(ids, opt_distinct) {
  var countries = [];
  var idsMap = {};

  ids.forEach(function(id) {
    var country = this._countriesMap[id];

    if (country && (!opt_distinct || !idsMap[country.id])) {
      countries.push(country);
      idsMap[country.id] = 1;
    }
  }, this);

  return countries;
};

/**
 * @param {!Array.<Country>} countries
 * @param {!Array.<Region>} regions
 * @param {!Array.<City>} cities
 * @private
 */
Locations.prototype._setLocations = function(countries, regions, cities) {
  this._citiesMap = {};
  this._countriesMap = {};
  this._regionsMap = {};

  countries.forEach(function(country) {
    this._countriesMap[country.id] = country;
  }, this);

  regions.forEach(function(region) {
    this._regionsMap[region.id] = region;
  }, this);

  cities.forEach(function(city) {
    /** @type {!Array.<string>} */
    var names = [city.name];
    var region = this._regionsMap[city.region_id];

    if (region) {
      names.push(region.name);

      var country = this._countriesMap[region.country_id];

      if (country) {
        names.push(country.name);
      }
    }

    city.full_name = names.join(', ');
    this._citiesMap[city.id] = city;
  }, this);
};

/**
 * @param {number} id
 * @return {Region}
 */
Locations.prototype.getRegion = function(id) {
  return this._regionsMap[id] || null;
};

/**
 * @param {Array.<number>} ids
 * @param {boolean=} opt_distinct
 * @return {!Array.<Region>}
 */
Locations.prototype.getRegions = function(ids, opt_distinct) {
  var regions = [];
  var idsMap = {};

  ids.forEach(function(id) {
    var region = this._regionsMap[id];

    if (region && (!opt_distinct || !idsMap[region.id])) {
      regions.push(region);
      idsMap[region.id] = 1;
    }
  }, this);

  return regions;
};
