goog.provide('dev.developer.ui.LinkItem');

goog.require('goog.dom.forms');
goog.require('goog.events.EventType');
goog.require('dev.developer.ui.InnerItem');
goog.require('dev.developer.ui.linkItem.Renderer');


/**
 * @param {string} linkContent
 * @param {dev.developer.ui.linkItem.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {dev.developer.ui.InnerItem}
 */
dev.developer.ui.LinkItem = function(linkContent, opt_renderer, opt_domHelper) {
  dev.developer.ui.LinkItem.base(
    this,
    'constructor',
    opt_renderer || dev.developer.ui.linkItem.Renderer.getInstance(),
    opt_domHelper);

  /**
   * @private {string}
   */
  this._linkContent = linkContent;

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

  this.addClassName(dev.developer.ui.LinkItem.CSS_CLASS);
};
goog.inherits(dev.developer.ui.LinkItem, dev.developer.ui.InnerItem);


/**
 * @type {string}
 */
dev.developer.ui.LinkItem.CSS_CLASS =
  goog.getCssName('devPanel-inner-linkItem');


/** @inheritDoc */
dev.developer.ui.LinkItem.prototype.enterDocument = function() {
  dev.developer.ui.LinkItem.base(this, 'enterDocument');

  /** @type {Element} */
  var linkElement = this.getLinkElement();

  if (linkElement) {
    this.getHandler()
      .listen(linkElement, goog.events.EventType.CLICK, this._onLinkClick);
  }
};

/**
 * @param {number=} opt_defValue
 * @return {number}
 */
dev.developer.ui.LinkItem.prototype.getInputIntValue = function(opt_defValue) {
  /** @type {number} */
  var defValue = opt_defValue || 0;
  /** @type {number} */
  var value = parseInt(this.getInputValue(), 10);

  if (isNaN(value)) {
    return defValue;
  }

  return value;
};

/**
 * @param {string=} opt_defValue
 * @return {string}
 */
dev.developer.ui.LinkItem.prototype.getInputValue = function(opt_defValue) {
  /** @type {string} */
  var defValue = opt_defValue || '';
  /** @type {Element} */
  var inputElement = this.getInputElement();

  if (inputElement) {
    var value = goog.dom.forms.getValue(inputElement);

    if (goog.isString(value)) {
      return value;
    }
  }

  return defValue;
};

/**
 * @return {string}
 */
dev.developer.ui.LinkItem.prototype.getLinkContent = function() {
  return this._linkContent;
};

/**
 * @return {Element}
 */
dev.developer.ui.LinkItem.prototype.getLinkElement = function() {
  return this.getRenderer().getLinkElement(this.getElement());
};

/**
 * @return {Element}
 */
dev.developer.ui.LinkItem.prototype.getInputElement = function() {
  return this.getRenderer().getInputElement(this.getElement());
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
dev.developer.ui.LinkItem.prototype._onLinkClick = function(evt) {
  this.dispatchEvent(dev.developer.ui.InnerItem.EventType.ACTION);
};

/**
 * @return {boolean}
 */
dev.developer.ui.LinkItem.prototype.isInputEnabled = function() {
  return this._inputEnabled;
};

/**
 * @param {boolean} enable
 */
dev.developer.ui.LinkItem.prototype.setInputEnabled = function(enable) {
  this._inputEnabled = enable;
};

/**
 * @return {string}
 */
dev.developer.ui.LinkItem.prototype.getDefaultInputValue = function() {
  return this._defaultInputValue;
};

/**
 * @param {string|number} value
 */
dev.developer.ui.LinkItem.prototype.setDefaultInputValue = function(value) {
  this._defaultInputValue = value + '';
};

/**
 * @return {string}
 */
dev.developer.ui.LinkItem.prototype.getInputPrefix = function() {
  return this._inputPrefix;
};

/**
 * @param {string} prefix
 */
dev.developer.ui.LinkItem.prototype.setInputPrefix = function(prefix) {
  this._inputPrefix = prefix;
};

/**
 * @return {string}
 */
dev.developer.ui.LinkItem.prototype.getInputSuffix = function() {
  return this._inputSuffix;
};

/**
 * @param {string} suffix
 */
dev.developer.ui.LinkItem.prototype.setInputSuffix = function(suffix) {
  this._inputSuffix = suffix;
};
