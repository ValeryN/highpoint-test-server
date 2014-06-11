var inherits = require('util').inherits;

var OjsterTemplate = require('ojster').Template;


var Template = module.exports = function(data, ctx, writer) {
  OjsterTemplate.call(this, data, ctx, writer);
};
inherits(Template, OjsterTemplate);


/**
 * @private {Object.<string>}
 */
Template.prototype._cssNameMapping = null;

/**
 * 'whole' or 'parts'
 * @private {string}
 */
Template.prototype._mappingStyle = 'parts';


/** @inheritDoc */
Template.prototype.getCssName = function(name, modifiers) {
  var cssName = OjsterTemplate.prototype.getCssName.call(this, name, modifiers);

  if (this._cssNameMapping) {
    if ('whole' == this._mappingStyle) {
      return this._getCssNameMapping(cssName);
    } else {
      return this._renameCssNameByParts(cssName);
    }
  }

  return cssName;
};

/**
 * @param {string} cssName
 * @return {string}
 * @private
 */
Template.prototype._getCssNameMapping = function(cssName) {
  return this._cssNameMapping[cssName] || cssName;
};

/**
 * @param {string} cssName
 * @return {string}
 * @private
 */
Template.prototype._renameCssNameByParts = function(cssName) {
  var parts = cssName.split('-');
  var mapped = [];

  for (var i = 0; i < parts.length; i++) {
    mapped.push(this._getCssNameMapping(parts[i]));
  }

  return mapped.join('-');
};

/**
 * @return {string}
 */
Template.prototype.getMappingStyle = function() {
  return this._mappingStyle;
};

/**
 * @param {string} style 'whole' or 'parts'
 */
Template.prototype.setMappingStyle = function(style) {
  this._mappingStyle = style;
};

/**
 * @return {Object.<string>}
 */
Template.prototype.getCssNameMapping = function() {
  return this._cssNameMapping;
};

/**
 * @param {Object.<string>} map
 */
Template.prototype.setCssNameMapping = function(map) {
  this._cssNameMapping = map;
};
