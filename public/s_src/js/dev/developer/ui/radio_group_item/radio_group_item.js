goog.provide('dev.developer.ui.RadioGroupItem');
goog.provide('dev.developer.ui.RadioGroupItem.Option');

goog.require('goog.array');
goog.require('goog.events.EventType');
goog.require('goog.math');
goog.require('dev.developer.ui.InnerItem');
goog.require('dev.developer.ui.radioGroupItem.Renderer');


/**
 * @param {string} header
 * @param {Array.<dev.developer.ui.RadioGroupItem.Option>} options
 * @param {number=} opt_selectedIndex
 * @param {dev.developer.ui.radioGroupItem.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {dev.developer.ui.InnerItem}
 */
dev.developer.ui.RadioGroupItem = function(header, options, opt_selectedIndex,
    opt_renderer, opt_domHelper) {
  dev.developer.ui.RadioGroupItem.base(
    this,
    'constructor',
    opt_renderer || dev.developer.ui.radioGroupItem.Renderer.getInstance(),
    opt_domHelper);

  /**
   * @private {string}
   */
  this._header = header;

  /**
   * @private {string}
   */
  this._optionName = dev.developer.ui.RadioGroupItem.getOptionName();

  /**
   * @private {Array.<dev.developer.ui.RadioGroupItem.Option>}
   */
  this._options = options;

  /**
   * @private {number}
   */
  this._selectedIndex = opt_selectedIndex || 0;

  this.addClassName(dev.developer.ui.RadioGroupItem.CSS_CLASS);
};
goog.inherits(dev.developer.ui.RadioGroupItem, dev.developer.ui.InnerItem);


/**
 * @typedef {{
 *  key: string,
 *  value: string
 * }}
 */
dev.developer.ui.RadioGroupItem.Option;

/**
 * @type {string}
 */
dev.developer.ui.RadioGroupItem.CSS_CLASS =
  goog.getCssName('devPanel-inner-radioGroupItem');

/**
 * @return {string}
 */
dev.developer.ui.RadioGroupItem.getOptionName = (function() {
  var counter = 0;

  return function() {
    return dev.developer.ui.RadioGroupItem.CSS_CLASS + (++counter);
  };
})();


/** @inheritDoc */
dev.developer.ui.RadioGroupItem.prototype.createDom = function() {
  dev.developer.ui.RadioGroupItem.base(this, 'createDom');

  this.applySelectedIndex(this._selectedIndex);
};

/** @inheritDoc */
dev.developer.ui.RadioGroupItem.prototype.enterDocument = function() {
  dev.developer.ui.RadioGroupItem.base(this, 'enterDocument');

  /** @type {Array.<Element>} */
  var inputElements = this.getInputElements();

  if (inputElements) {
    goog.array.forEach(inputElements, function(inputElement) {
      this.getHandler().listen(inputElement, goog.events.EventType.CHANGE,
        this._onInputSelect);
    }, this);
  }
};

/** @inheritDoc */
dev.developer.ui.RadioGroupItem.prototype.disposeInternal = function() {
  dev.developer.ui.RadioGroupItem.base(this, 'disposeInternal');

  this._options = null;
};

/**
 * @return {number}
 */
dev.developer.ui.RadioGroupItem.prototype.getSelectedIndex = function() {
  return this._selectedIndex;
};

/**
 * @return {string}
 */
dev.developer.ui.RadioGroupItem.prototype.getHeader = function() {
  return this._header;
};

/**
 * @param {number} index
 */
dev.developer.ui.RadioGroupItem.prototype.setSelectedIndex = function(index) {
  index = goog.math.clamp(index, 0, this._options.length - 1);

  if (this._selectedIndex != index) {
    this._selectedIndex = index;
    this.applySelectedIndex(this._selectedIndex);
    this.dispatchEvent(dev.developer.ui.InnerItem.EventType.CHECK);
  }
};

/**
 * @param {number} index
 * @protected
 */
dev.developer.ui.RadioGroupItem.prototype.applySelectedIndex = function(index) {
  this.getRenderer().setSelectedIndex(this, index);
};

/**
 * @return {Array.<Element>}
 */
dev.developer.ui.RadioGroupItem.prototype.getInputElements = function() {
  return this.getRenderer().getInputElements(this.getElement());
};

/**
 * @return {string}
 */
dev.developer.ui.RadioGroupItem.prototype.getOptionName = function() {
  return this._optionName;
};

/**
 * @return {Array.<dev.developer.ui.RadioGroupItem.Option>}
 */
dev.developer.ui.RadioGroupItem.prototype.getOptions = function() {
  return this._options;
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
dev.developer.ui.RadioGroupItem.prototype._onInputSelect = function(evt) {
  var inputElement = /** @type {Element} */ (evt.currentTarget);
  /** @type {Array.<Element>} */
  var inputElements = this.getInputElements();
  /** @type {number} */
  var index = goog.array.indexOf(inputElements, inputElement);

  if (-1 < index) {
    this.setSelectedIndex(index);
  }
};
