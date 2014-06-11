goog.provide('dev.developer.ui.Section');

goog.require('dev.ui.scrollable.Container');
goog.require('dev.developer.ui.InnerItem');
goog.require('dev.developer.ui.LinkItem');


/**
 * @param {dev.ui.scrollable.ContainerRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {dev.ui.scrollable.Container}
 */
dev.developer.ui.Section = function(opt_renderer, opt_domHelper) {
  dev.developer.ui.Section.base(
    this, 'constructor', opt_renderer, opt_domHelper);

  this.addClassName(dev.developer.ui.Section.CSS_CLASS);
};
goog.inherits(dev.developer.ui.Section, dev.ui.scrollable.Container);


/**
 * @type {string}
 */
dev.developer.ui.Section.CSS_CLASS = goog.getCssName('devPanel-section');


/**
 * @param {string} caption
 * @param {function(this:dev.developer.ui.Section,goog.events.BrowserEvent)}
 *    handler
 * @protected
 */
dev.developer.ui.Section.prototype.createLinkItem = function(caption,
    handler) {
  var linkItem = new dev.developer.ui.LinkItem(caption);
  linkItem.listen(
    dev.developer.ui.InnerItem.EventType.ACTION, handler, false, this);

  return linkItem;
};
