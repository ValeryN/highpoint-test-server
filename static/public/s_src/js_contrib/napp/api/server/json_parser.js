goog.provide('napp.api.server.JsonParser');

goog.require('goog.math.Coordinate');
goog.require('goog.math.Size');
goog.require('npf.json.parser');
goog.require('napp.dataTypes.Image');


/**
 * @constructor
 */
napp.api.server.JsonParser = function() {

  /**
   * @type {string}
   */
  this.xField = 'x';

  /**
   * @type {string}
   */
  this.yField = 'y';

  /**
   * @type {string}
   */
  this.widthField = 'width';

  /**
   * @type {string}
   */
  this.heightField = 'height';

  /**
   * @type {string}
   */
  this.srcField = 'src';

  /**
   * @type {string}
   */
  this.webpSrcField = 'webpSrc';
};


/**
 * @param {*} input
 * @param {number=} opt_count
 * @return {Array.<number>}
 */
napp.api.server.JsonParser.prototype.getArrayOfId = function(input,
    opt_count) {
  return npf.json.parser.getArrayOfId(input, opt_count);
};

/**
 * @param {*} json
 * @param {function(this: SCOPE, *, number, ?): R} func
 * @param {SCOPE=} opt_obj
 * @return {!Array.<R>}
 * @template SCOPE, R
 */
napp.api.server.JsonParser.prototype.getArrayOfObject = function(json, func,
    opt_obj) {
  return npf.json.parser.getArrayOfObject(json, func, opt_obj);
};

/**
 * @param {*} input
 * @param {number=} opt_count
 * @return {Array.<string>}
 */
napp.api.server.JsonParser.prototype.getArrayOfString = function(input,
    opt_count) {
  return npf.json.parser.getArrayOfString(input, opt_count);
};

/**
 * @param {*} input
 * @param {number=} opt_count
 * @return {Array.<number>}
 */
napp.api.server.JsonParser.prototype.getArrayOfUint = function(input,
    opt_count) {
  return npf.json.parser.getArrayOfUint(input, opt_count);
};

/**
 * @param {*} jsonCoord
 * @return {goog.math.Coordinate}
 */
napp.api.server.JsonParser.prototype.getCoordinate = function(jsonCoord) {
  if (goog.isObject(jsonCoord)) {
    var x = jsonCoord[this.xField];
    var y = jsonCoord[this.yField];

    if (goog.isNumber(x) && goog.isNumber(y)) {
      return new goog.math.Coordinate(x, y);
    }
  }

  return null;
};

/**
 * @param {*} jsonCoords
 * @return {!Array.<goog.math.Coordinate>}
 */
napp.api.server.JsonParser.prototype.getCoordinates = function(jsonCoords) {
  return this.getArrayOfObject(jsonCoords, function(jsonCoord) {
    return this.getCoordinate(jsonCoord);
  }, this);
};

/**
 * @param {*} input
 * @return {goog.date.DateTime}
 */
napp.api.server.JsonParser.prototype.getDateFromIsoString = function(input) {
  return npf.json.parser.getDateFromIsoString(input);
};

/**
 * @param {!Object} json
 * @param {string=} opt_key Defaults to 'id'.
 * @return {number}
 */
napp.api.server.JsonParser.prototype.getId = function(json, opt_key) {
  /** @type {string} */
  var key = opt_key || 'id';

  return this.getUint(json[key]);
};

/**
 * @param {*} jsonImage
 * @return {napp.dataTypes.Image}
 */
napp.api.server.JsonParser.prototype.getImage = function(jsonImage) {
  if (goog.isObject(jsonImage)) {
    /** @type {string} */
    var src = this.getString(jsonImage[this.srcField]);
    /** @type {number} */
    var width = this.getUint(jsonImage[this.widthField]);
    /** @type {number} */
    var height = this.getUint(jsonImage[this.heightField]);

    if (src && width && height) {
      /** @type {string} */
      var webpSrc = this.getString(jsonImage[this.webpSrcField]);

      return new napp.dataTypes.Image(src, width, height, webpSrc);
    }
  }

  return null;
};

/**
 * @param {*} jsonImages
 * @return {!Array.<napp.dataTypes.Image>}
 */
napp.api.server.JsonParser.prototype.getImages = function(jsonImages) {
  return this.getArrayOfObject(jsonImages, function(jsonImage) {
    return this.getImage(jsonImage);
  }, this);
};

/**
 * @param {*} jsonSize
 * @return {goog.math.Size}
 */
napp.api.server.JsonParser.prototype.getSize = function(jsonSize) {
  if (goog.isObject(jsonSize)) {
    var width = this.getUint(jsonSize[this.widthField], -1);
    var height = this.getUint(jsonSize[this.heightField], -1);

    if (-1 < width && -1 < height) {
      return new goog.math.Size(width, height);
    }
  }

  return null;
};

/**
 * @param {*} jsonSizes
 * @return {!Array.<goog.math.Size>}
 */
napp.api.server.JsonParser.prototype.getSizes = function(jsonSizes) {
  return this.getArrayOfObject(jsonSizes, function(jsonSize) {
    return this.getSize(jsonSize);
  }, this);
};

/**
 * @param {*} input
 * @param {string=} opt_def Defaults to empty string.
 * @return {string}
 */
napp.api.server.JsonParser.prototype.getString = function(input, opt_def) {
  return npf.json.parser.getString(input, opt_def);
};

/**
 * @param {*} input
 * @param {number=} opt_def Defaults to 0.
 * @return {number}
 */
napp.api.server.JsonParser.prototype.getUfloat = function(input, opt_def) {
  return npf.json.parser.getUfloat(input, opt_def);
};

/**
 * @param {*} input
 * @param {number=} opt_def Defaults to 0.
 * @return {number}
 */
napp.api.server.JsonParser.prototype.getUint = function(input, opt_def) {
  return npf.json.parser.getUint(input, opt_def);
};
