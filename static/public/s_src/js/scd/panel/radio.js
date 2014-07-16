goog.provide('dev.panel.Radio');
goog.provide('dev.panel.Radio.EventType');
goog.provide('dev.panel.Radio.Option');

goog.require('goog.array');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.math');
goog.require('npf.ui.Component');
goog.require('ojster');
goog.require('dev.panel.templates.Radio');


/**
 * @param {dev.dataTypes.option.Radio} option
 * @param {*} value
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.Component}
 */
dev.panel.Radio = function(option, value, opt_domHelper) {
  dev.panel.Radio.base(this, 'constructor', opt_domHelper);

  /**
   * @private {dev.dataTypes.option.Radio}
   */
  this._option = option;

  /**
   * @private {string}
   */
  this._optionName = dev.panel.Radio.getOptionName();

  /**
   * @private {number}
   */
  this._selectedIndex = goog.array.findIndex(option.items, function(item) {
    return item.value === value;
  }, this);
};
goog.inherits(dev.panel.Radio, npf.ui.Component);


/**
 * @type {string}
 */
dev.panel.Radio.CSS_CLASS = goog.getCssName('panel-radio');

/**
 * @enum {string}
 */
dev.panel.Radio.CssClass = {
  INPUT: goog.getCssName('panel-radio-input')
};

/**
 * @enum {string}
 */
dev.panel.Radio.EventType = {
  CHECK: goog.events.getUniqueId('check')
};

/**
 * @typedef {{
 *  key: string,
 *  value: string
 * }}
 */
dev.panel.Radio.Option;

/**
 * @return {string}
 */
dev.panel.Radio.getOptionName = (function() {
  var counter = 0;

  return function() {
    return dev.panel.Radio.CSS_CLASS + (++counter);
  };
})();


/** @inheritDoc */
dev.panel.Radio.prototype.createDom = function() {
  var template = new dev.panel.templates.Radio({
    name: this._optionName,
    option: this._option
  });
  template.setBaseCssName(dev.panel.Radio.CSS_CLASS);
  /** @type {!Element} */
  var element = ojster.createElement(template);
  this.setElementInternal(element);

  this._applySelectedIndex(this._selectedIndex);
};

/** @inheritDoc */
dev.panel.Radio.prototype.enterDocument = function() {
  dev.panel.Radio.base(this, 'enterDocument');

  var inputElements = this.getInputElements();

  if (inputElements) {
    goog.array.forEach(inputElements, function(inputElement) {
      this.getHandler().
        listen(inputElement, goog.events.EventType.CHANGE,
          this._onInputSelect);
    }, this);
  }
};

/** @inheritDoc */
dev.panel.Radio.prototype.disposeInternal = function() {
  dev.panel.Radio.base(this, 'disposeInternal');

  this._option = null;
};

/**
 * @return {dev.dataTypes.option.Radio}
 */
dev.panel.Radio.prototype.getOption = function() {
  return this._option;
};

/**
 * @return {*}
 */
dev.panel.Radio.prototype.getValue = function() {
  return -1 < this._selectedIndex ?
    this._option.items[this._selectedIndex].value : undefined;
};

/**
 * @return {{length: number}?}
 */
dev.panel.Radio.prototype.getInputElements = function() {
  return this.getElementsByClass(
    dev.panel.Radio.CssClass.INPUT);
};

/**
 * @param {number} index
 * @private
 */
dev.panel.Radio.prototype._applySelectedIndex = function(index) {
  /** @type {{length: number}?} */
  var inputElements = this.getInputElements();

  if (inputElements && inputElements[index]) {
    goog.dom.forms.setValue(inputElements[index], true);
  }
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
dev.panel.Radio.prototype._onInputSelect = function(evt) {
  var inputElement = /** @type {Element} */ (evt.currentTarget);
  /** @type {{length: number}?} */
  var inputElements = this.getInputElements();
  /** @type {number} */
  var index = goog.array.indexOf(inputElements, inputElement);

  if (-1 < index) {
    index = goog.math.clamp(index, 0, this._option.items.length - 1);

    if (this._selectedIndex != index) {
      this._selectedIndex = index;
      this._applySelectedIndex(this._selectedIndex);
      this.dispatchEvent(dev.panel.Radio.EventType.CHECK);
    }
  }
};
