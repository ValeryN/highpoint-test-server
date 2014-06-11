goog.provide('npf.ui.SimpleComponent');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('npf.ui.Component');


/**
 * @param {string|Array.<string>=} opt_className
 * @param {string|Array.<string>=} opt_contentClassName
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {npf.ui.Component}
 */
npf.ui.SimpleComponent = function(opt_className, opt_contentClassName,
    opt_domHelper) {
  npf.ui.SimpleComponent.base(this, 'constructor', opt_domHelper);

  /** @type {Array.<string>} */
  var classNames = null;
  /** @type {Array.<string>} */
  var contentClassNames = null;

  if (goog.isArray(opt_className)) {
    classNames = opt_className;
  } else if (goog.isString(opt_className)) {
    classNames = [opt_className];
  }

  if (goog.isArray(opt_contentClassName)) {
    contentClassNames = opt_contentClassName;
  } else if (goog.isString(opt_contentClassName)) {
    contentClassNames = [opt_contentClassName];
  }

  /**
   * @private {Array.<string>}
   */
  this.classNames_ = classNames;

  /**
   * @private {Array.<string>}
   */
  this.contentClassNames_ = contentClassNames;

  /**
   * @private {Element}
   */
  this.contentElement_ = null;

  /**
   * @private {string}
   */
  this.contentTagName_ = goog.dom.TagName.DIV;

  /**
   * @private {string}
   */
  this.tagName_ = goog.dom.TagName.DIV;
};
goog.inherits(npf.ui.SimpleComponent, npf.ui.Component);


/** @inheritDoc */
npf.ui.SimpleComponent.prototype.createDom = function() {
  /** @type {!Element} */
  var element = this.getDomHelper().createDom(this.tagName_, this.classNames_);
  this.setElementInternal(element);

  if (this.contentClassNames_) {
    this.contentElement_ = this.getDomHelper().createDom(this.contentTagName_,
      this.contentClassNames_);
    goog.dom.appendChild(element, this.contentElement_);
  } else {
    this.contentElement_ = element;
  }
};

/** @inheritDoc */
npf.ui.SimpleComponent.prototype.decorateInternal = function(element) {
  npf.ui.SimpleComponent.base(this, 'decorateInternal', element);

  if (this.contentClassNames_) {
    this.contentElement_ = this.getElementByClass(this.contentClassNames_[0]);
  }
};

/** @inheritDoc */
npf.ui.SimpleComponent.prototype.disposeInternal = function() {
  npf.ui.SimpleComponent.base(this, 'disposeInternal');

  this.classNames_ = null;
  this.contentClassNames_ = null;
  this.contentElement_ = null;
};

/** @inheritDoc */
npf.ui.SimpleComponent.prototype.getContentElement = function() {
  return this.contentElement_ || this.getElement();
};

/**
 * @return {Array.<string>?}
 */
npf.ui.SimpleComponent.prototype.getClassNames = function() {
  return this.classNames_;
};

/**
 * @return {Array.<string>?}
 */
npf.ui.SimpleComponent.prototype.getContentClassNames = function() {
  return this.contentClassNames_;
};

/**
 * @return {string}
 */
npf.ui.SimpleComponent.prototype.getTagName = function() {
  return this.tagName_;
};

/**
 * @param {string} tagName
 */
npf.ui.SimpleComponent.prototype.setTagName = function(tagName) {
  this.tagName_ = tagName;
};

/**
 * @return {string}
 */
npf.ui.SimpleComponent.prototype.getContentTagName = function() {
  return this.contentTagName_;
};

/**
 * @param {string} tagName
 */
npf.ui.SimpleComponent.prototype.setContentTagName = function(tagName) {
  this.contentTagName_ = tagName;
};
