goog.provide('dev.ui.scrollable.VerticalScrollBarRenderer');

goog.require('npf.ui.scrollable.scrollBar.VerticalRenderer');


/**
 * @constructor
 * @extends {npf.ui.scrollable.scrollBar.VerticalRenderer}
 */
dev.ui.scrollable.VerticalScrollBarRenderer = function() {
  dev.ui.scrollable.VerticalScrollBarRenderer.base(this, 'constructor');
};
goog.inherits(dev.ui.scrollable.VerticalScrollBarRenderer,
  npf.ui.scrollable.scrollBar.VerticalRenderer);
goog.addSingletonGetter(dev.ui.scrollable.VerticalScrollBarRenderer);


/**
 * @type {string}
 */
dev.ui.scrollable.VerticalScrollBarRenderer.CSS_CLASS =
  goog.getCssName('devPanel-scrollable-scrollBar');


/** @inheritDoc */
dev.ui.scrollable.VerticalScrollBarRenderer.prototype.getCssClass = function() {
  return dev.ui.scrollable.VerticalScrollBarRenderer.CSS_CLASS;
};
