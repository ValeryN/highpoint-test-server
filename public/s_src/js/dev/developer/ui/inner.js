goog.provide('dev.developer.ui.Inner');

goog.require('npf.ui.SimpleComponent');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.SimpleComponent}
 */
dev.developer.ui.Inner = function(opt_domHelper) {
  dev.developer.ui.Inner.base(
    this,
    'constructor',
    dev.developer.ui.Inner.CSS_CLASS,
    null,
    opt_domHelper);
};
goog.inherits(dev.developer.ui.Inner, npf.ui.SimpleComponent);


/**
 * @type {string}
 */
dev.developer.ui.Inner.CSS_CLASS = goog.getCssName('devPanel-inner');
