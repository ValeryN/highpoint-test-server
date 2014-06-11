goog.provide('dev.developer.ui.InnerItem');

goog.require('goog.events');
goog.require('npf.ui.RenderedComponent');
goog.require('dev.developer.ui.innerItem.Renderer');


/**
 * @param {dev.developer.ui.innerItem.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.RenderedComponent}
 */
dev.developer.ui.InnerItem = function(opt_renderer, opt_domHelper) {
  dev.developer.ui.InnerItem.base(
    this,
    'constructor',
    opt_renderer || dev.developer.ui.innerItem.Renderer.getInstance(),
    opt_domHelper);
};
goog.inherits(dev.developer.ui.InnerItem, npf.ui.RenderedComponent);


/**
 * @enum {string}
 */
dev.developer.ui.InnerItem.EventType = {
  ACTION: goog.events.getUniqueId('action'),
  CHECK: goog.events.getUniqueId('check')
};
