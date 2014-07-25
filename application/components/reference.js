var config = require('../config');
var models = require('../model');


/**
 * @constructor
 */
var Reference = module.exports = function() {

  /**
   * @private {Object.<Object.<Object>>}
   */
  this._map = {};

  var keys = [
    'careerPosts', 'companies', 'languages',
    'places', 'schools', 'specialities'];

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    this._map[key] = {};

    models[key].getAll().forEach(function(item) {
      this._map[key][item.id] = item;
    }, this);
  }
};


/**
 * @param {number} id
 * @return {CareerPost}
 */
Reference.prototype.getCareerPost = function(id) {
  return this._map.careerPosts[id] || null;
};

/**
 * @param {Array.<number>} ids
 * @param {boolean=} opt_distinct
 * @return {!Array.<CareerPost>}
 */
Reference.prototype.getCareerPosts = function(ids, opt_distinct) {
  return this._getItems(ids, this.getCareerPost, opt_distinct);
};

/**
 * @param {string} query
 * @param {number} limit
 * @return {!Array.<CareerPost>}
 */
Reference.prototype.findCareerPosts = function(query, limit) {
  return this._findItems(this._map.careerPosts, query, limit);
};

/**
 * @param {number} id
 * @return {Company}
 */
Reference.prototype.getCompany = function(id) {
  return this._map.companies[id] || null;
};

/**
 * @param {Array.<number>} ids
 * @param {boolean=} opt_distinct
 * @return {!Array.<Company>}
 */
Reference.prototype.getCompanies = function(ids, opt_distinct) {
  return this._getItems(ids, this.getCompany, opt_distinct);
};

/**
 * @param {string} query
 * @param {number} limit
 * @return {!Array.<Company>}
 */
Reference.prototype.findCompanies = function(query, limit) {
  return this._findItems(this._map.companies, query, limit);
};

/**
 * @param {number} id
 * @return {Language}
 */
Reference.prototype.getLanguage = function(id) {
  return this._map.languages[id] || null;
};

/**
 * @param {Array.<number>} ids
 * @param {boolean=} opt_distinct
 * @return {!Array.<Language>}
 */
Reference.prototype.getLanguages = function(ids, opt_distinct) {
  return this._getItems(ids, this.getLanguage, opt_distinct);
};

/**
 * @param {string} query
 * @param {number} limit
 * @return {!Array.<Language>}
 */
Reference.prototype.findLanguages = function(query, limit) {
  return this._findItems(this._map.languages, query, limit);
};

/**
 * @param {number} id
 * @return {Place}
 */
Reference.prototype.getPlace = function(id) {
  return this._map.places[id] || null;
};

/**
 * @param {Array.<number>} ids
 * @param {boolean=} opt_distinct
 * @return {!Array.<Place>}
 */
Reference.prototype.getPlaces = function(ids, opt_distinct) {
  return this._getItems(ids, this.getPlace, opt_distinct);
};

/**
 * @param {string} query
 * @param {number} limit
 * @return {!Array.<Place>}
 */
Reference.prototype.findPlaces = function(query, limit) {
  return this._findItems(this._map.places, query, limit);
};

/**
 * @param {number} id
 * @return {School}
 */
Reference.prototype.getSchool = function(id) {
  return this._map.schools[id] || null;
};

/**
 * @param {Array.<number>} ids
 * @param {boolean=} opt_distinct
 * @return {!Array.<School>}
 */
Reference.prototype.getSchools = function(ids, opt_distinct) {
  return this._getItems(ids, this.getSchool, opt_distinct);
};

/**
 * @param {string} query
 * @param {number} limit
 * @return {!Array.<School>}
 */
Reference.prototype.findSchools = function(query, limit) {
  return this._findItems(this._map.schools, query, limit);
};

/**
 * @param {number} id
 * @return {Speciality}
 */
Reference.prototype.getSpeciality = function(id) {
  return this._map.specialities[id] || null;
};

/**
 * @param {Array.<number>} ids
 * @param {boolean=} opt_distinct
 * @return {!Array.<Speciality>}
 */
Reference.prototype.getSpecialities = function(ids, opt_distinct) {
  return this._getItems(ids, this.getSpeciality, opt_distinct);
};

/**
 * @param {string} query
 * @param {number} limit
 * @return {!Array.<Speciality>}
 */
Reference.prototype.findSpecialities = function(query, limit) {
  return this._findItems(this._map.specialities, query, limit);
};

/**
 * @param {Object} map
 * @param {string} query
 * @param {number} limit
 * @return {!Array.<Object>}
 * @private
 */
Reference.prototype._findItems = function(map, query, limit) {
  query = query.toLowerCase();

  var func1 = function(item) {
    return item.name.toLowerCase() == query;
  };
  var func2 = function(item) {
    var name = item.name.toLowerCase();

    return name != query && 0 == name.indexOf(query);
  };
  var func3 = function(item) {
    var name = item.name.toLowerCase();

    return name != query && 0 < name.indexOf(query);
  };

  var result = this._findItemsByFunc(map, func1, limit);
  result = result.concat(
    this._findItemsByFunc(map, func2, limit - result.length));

  return result.concat(
    this._findItemsByFunc(map, func3, limit - result.length));
};

/**
 * @param {Object} map
 * @param {function(Object):boolean} func
 * @param {number} limit
 * @return {!Array.<Object>}
 * @private
 */
Reference.prototype._findItemsByFunc = function(map, func, limit) {
  var result = [];

  for (var strId in map) {
    if (result.length >= limit) {
      break;
    }

    var city = map[strId];

    if (func.call(this, city)) {
      result.push(city);
    }
  }

  return result;
};

/**
 * @param {Array.<number>} ids
 * @param {function(number):Object} func
 * @param {boolean=} opt_distinct
 * @return {!Array.<Object>}
 * @private
 */
Reference.prototype._getItems = function(ids, func, opt_distinct) {
  var result = [];
  var idsMap = {};

  ids.forEach(function(id) {
    var item = func.call(this, id);

    if (item && (!opt_distinct || !idsMap[item.id])) {
      result.push(item);
      idsMap[item.id] = 1;
    }
  }, this);

  return result;
};
