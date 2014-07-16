goog.provide('dev.panel.Link');
goog.provide('dev.panel.Link.EventType');

goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('npf.ui.Component');
goog.require('ojster');
goog.require('dev.panel.templates.Link');


/**
 * @param {dev.dataTypes.option.Action} option
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.Component}
 */
dev.panel.Link = function(option, opt_domHelper) {
  dev.panel.Link.base(this, 'constructor', opt_domHelper);

  /**
   * @private {boolean}
   */
  this._inputEnabled = false;

  /**
   * @private {string}
   */
  this._defaultInputValue = '';

  /**
   * @private {string}
   */
  this._inputPrefix = '';

  /**
   * @private {string}
   */
  this._inputSuffix = '';

  /**
   * @private {dev.dataTypes.option.Action}
   */
  this._option = option;
};
goog.inherits(dev.panel.Link, npf.ui.Component);


/**
 * @type {string}
 */
dev.panel.Link.CSS_CLASS = goog.getCssName('panel-link');

/**
 * @enum {string}
 */
dev.panel.Link.CssClass = {
  INPUT: goog.getCssName('panel-link-input'),
  LINK: goog.getCssName('panel-link-link')
};

/**
 * @enum {string}
 */
dev.panel.Link.EventType = {
  ACTION: goog.events.getUniqueId('action')
};


/** @inheritDoc */
dev.panel.Link.prototype.createDom = function() {
  var template = new dev.panel.templates.Link({
    inputEnabled: this._inputEnabled,
    defaultInputValue: this._defaultInputValue,
    inputSuffix: this._inputSuffix,
    inputPrefix: this._inputPrefix,
    option: this._option
  });
  template.setBaseCssName(dev.panel.Link.CSS_CLASS);
  /** @type {!Element} */
  var element = ojster.createElement(template);
  this.setElementInternal(element);
};

/** @inheritDoc */
dev.panel.Link.prototype.enterDocument = function() {
  dev.panel.Link.base(this, 'enterDocument');

  /** @type {!Element} */
  var linkElement = this.getRequiredElementByClass(
    dev.panel.Link.CssClass.LINK);

  this.getHandler().
    listen(linkElement, goog.events.EventType.CLICK, this._onLinkClick);
};

/**
 * @param {number=} opt_defValue
 * @return {number}
 */
dev.panel.Link.prototype.getInputIntValue = function(opt_defValue) {
  /** @type {number} */
  var defValue = opt_defValue || 0;
  /** @type {number} */
  var value = parseInt(this.getInputValue(), 10);

  return isNaN(value) ? defValue : value;
};

/**
 * @param {string=} opt_defValue
 * @return {string}
 */
dev.panel.Link.prototype.getInputValue = function(opt_defValue) {
  /** @type {string} */
  var defValue = opt_defValue || '';
  /** @type {Element} */
  var inputElement = this.getElementByClass(
    dev.panel.Link.CssClass.INPUT);

  if (inputElement) {
    var value = goog.dom.forms.getValue(inputElement);

    if (goog.isString(value)) {
      return value;
    }
  }

  return defValue;
};

/**
 * @return {dev.dataTypes.option.Action}
 */
dev.panel.Link.prototype.getOption = function() {
  return this._option;
};

/**
 * @return {boolean}
 */
dev.panel.Link.prototype.isInputEnabled = function() {
  return this._inputEnabled;
};

/**
 * @param {boolean} enable
 */
dev.panel.Link.prototype.setInputEnabled = function(enable) {
  this._inputEnabled = enable;
};

/**
 * @return {string}
 */
dev.panel.Link.prototype.getDefaultInputValue = function() {
  return this._defaultInputValue;
};

/**
 * @param {string|number} value
 */
dev.panel.Link.prototype.setDefaultInputValue = function(value) {
  this._defaultInputValue = value + '';
};

/**
 * @return {string}
 */
dev.panel.Link.prototype.getInputPrefix = function() {
  return this._inputPrefix;
};

/**
 * @param {string} prefix
 */
dev.panel.Link.prototype.setInputPrefix = function(prefix) {
  this._inputPrefix = prefix;
};

/**
 * @return {string}
 */
dev.panel.Link.prototype.getInputSuffix = function() {
  return this._inputSuffix;
};

/**
 * @param {string} suffix
 */
dev.panel.Link.prototype.setInputSuffix = function(suffix) {
  this._inputSuffix = suffix;
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
dev.panel.Link.prototype._onLinkClick = function(evt) {
  this.dispatchEvent(dev.panel.Link.EventType.ACTION);
};
