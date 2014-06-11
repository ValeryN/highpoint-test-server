goog.provide('dev.ui.scrollable.Container');

goog.require('npf.ui.scrollable.Container');
goog.require('dev.ui.scrollable.ContainerRenderer');


/**
 * @param {dev.ui.scrollable.ContainerRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.scrollable.Container}
 */
dev.ui.scrollable.Container = function(opt_renderer, opt_domHelper) {
  dev.ui.scrollable.Container.base(this, 'constructor', opt_renderer ||
    dev.ui.scrollable.ContainerRenderer.getInstance(), opt_domHelper);
};
goog.inherits(dev.ui.scrollable.Container, npf.ui.scrollable.Container);
