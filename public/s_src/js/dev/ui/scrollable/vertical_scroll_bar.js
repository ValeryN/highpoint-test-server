goog.provide('dev.ui.scrollable.VerticalScrollBar');

goog.require('npf.ui.scrollable.scrollBar.Vertical');
goog.require('dev.ui.scrollable.VerticalScrollBarRenderer');


/**
 * @param {dev.ui.scrollable.VerticalScrollBarRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.scrollable.scrollBar.Vertical}
 */
dev.ui.scrollable.VerticalScrollBar = function(opt_renderer, opt_domHelper) {
  dev.ui.scrollable.VerticalScrollBar.base(this, 'constructor', opt_renderer ||
    dev.ui.scrollable.VerticalScrollBarRenderer.getInstance(), opt_domHelper);
};
goog.inherits(dev.ui.scrollable.VerticalScrollBar,
  npf.ui.scrollable.scrollBar.Vertical);
