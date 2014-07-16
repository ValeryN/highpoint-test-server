goog.provide('dev.panel.InnerSection');

goog.require('npf.ui.Component');
goog.require('ojster');
goog.require('dev.panel.templates.InnerSection');


/**
 * @param {string} header
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.Component}
 */
dev.panel.InnerSection = function(header, opt_domHelper) {
  dev.panel.InnerSection.base(this, 'constructor', opt_domHelper);

  /**
   * @private {string}
   */
  this._header = header;
};
goog.inherits(dev.panel.InnerSection, npf.ui.Component);


/**
 * @type {string}
 */
dev.panel.InnerSection.CSS_CLASS = goog.getCssName('panel-innerSection');

/**
 * @type {string}
 */
dev.panel.InnerSection.CONTENT_CSS_CLASS =
  goog.getCssName('panel-innerSection-content');


/** @inheritDoc */
dev.panel.InnerSection.prototype.createDom = function() {
  var template = new dev.panel.templates.InnerSection({
    header: this._header
  });
  template.setBaseCssName(dev.panel.InnerSection.CSS_CLASS);
  /** @type {!Element} */
  var element = ojster.createElement(template);
  this.setElementInternal(element);
};

/** @inheritDoc */
dev.panel.InnerSection.prototype.getContentElement = function() {
  return this.getElementByClass(dev.panel.InnerSection.CONTENT_CSS_CLASS);
};
