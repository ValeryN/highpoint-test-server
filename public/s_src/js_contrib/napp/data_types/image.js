goog.provide('napp.dataTypes.Image');

goog.require('goog.math.Size');
goog.require('npf.graphics.Scale');


/**
 * @param {string} src
 * @param {number} width
 * @param {number} height
 * @param {string=} opt_webpSrc
 * @constructor
 */
napp.dataTypes.Image = function(src, width, height, opt_webpSrc) {

  /**
   * @type {string}
   */
  this.src = src;

  /**
   * @type {number}
   */
  this.width = width;

  /**
   * @type {number}
   */
  this.height = height;

  /**
   * @type {string}
   */
  this.webpSrc = opt_webpSrc || '';
};


/**
 * @type {boolean}
 */
napp.dataTypes.Image.webpSupported = false;

/**
 * @param {number} sourceWidth
 * @param {number} sourceHeight
 * @param {number|null=} opt_maxWidth
 * @param {number|null=} opt_maxHeight
 * @return {!goog.math.Size}
 * @deprecated Use npf.graphics.Scale
 */
napp.dataTypes.Image.getSize = function(sourceWidth, sourceHeight, opt_maxWidth,
    opt_maxHeight) {
  var size = new goog.math.Size(sourceWidth, sourceHeight);

  return (new npf.graphics.Scale(opt_maxWidth, opt_maxHeight).contain(size));
};

/**
 * @return {string}
 */
napp.dataTypes.Image.prototype.getSrc = function() {
  return napp.dataTypes.Image.webpSupported && this.webpSrc ?
    this.webpSrc : this.src;
};

/**
 * @return {!napp.dataTypes.Image}
 */
napp.dataTypes.Image.prototype.clone = function() {
  return new napp.dataTypes.Image(
    this.src, this.width, this.height, this.webpSrc);
};

/**
 * @param {number|null=} opt_maxWidth
 * @param {number|null=} opt_maxHeight
 * @param {number|null=} opt_maxScale Defaults to 1.
 * @return {!goog.math.Size}
 */
napp.dataTypes.Image.prototype.contain = function(opt_maxWidth, opt_maxHeight,
    opt_maxScale) {
  var size = new goog.math.Size(this.width, this.height);

  return (new npf.graphics.Scale(opt_maxWidth, opt_maxHeight).
    contain(size, opt_maxScale));
};

/**
 * @param {number|null=} opt_maxWidth
 * @param {number|null=} opt_maxHeight
 * @return {!goog.math.Size}
 */
napp.dataTypes.Image.prototype.cover = function(opt_maxWidth, opt_maxHeight) {
  var size = new goog.math.Size(this.width, this.height);

  return (new npf.graphics.Scale(opt_maxWidth, opt_maxHeight).cover(size));
};

/**
 * @param {number|null=} opt_maxWidth
 * @param {number|null=} opt_maxHeight
 * @param {number|null=} opt_xScale
 * @param {number|null=} opt_yScale
 * @return {!goog.math.Size}
 */
napp.dataTypes.Image.prototype.percentage = function(opt_maxWidth,
    opt_maxHeight, opt_xScale, opt_yScale) {
  var size = new goog.math.Size(this.width, this.height);

  return (new npf.graphics.Scale(opt_maxWidth, opt_maxHeight).
    percentage(size, opt_xScale, opt_yScale));
};

/**
 * @return {!Object}
 */
napp.dataTypes.Image.prototype.toJson = function() {
  var json = {
    'src': this.src,
    'width': this.width,
    'height': this.height
  };

  if (this.webpSrc) {
    json['webpSrc'] = this.webpSrc;
  }

  return json;
};

/**
 * @param {number|null=} opt_maxWidth
 * @param {number|null=} opt_maxHeight
 * @param {number|null=} opt_maxScale Defaults to 1.
 * @return {!goog.math.Size}
 * @deprecated Use {@link contain}
 */
napp.dataTypes.Image.prototype.getSize = function(opt_maxWidth, opt_maxHeight,
    opt_maxScale) {
  return this.contain(opt_maxWidth, opt_maxHeight, opt_maxScale);
};
