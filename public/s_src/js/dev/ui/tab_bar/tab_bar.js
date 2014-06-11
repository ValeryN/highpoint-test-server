goog.provide('dev.ui.TabBar');

goog.require('goog.ui.TabBar');
goog.require('dev.ui.tabBar.Renderer');


/**
 * @param {goog.ui.TabBar.Location=} opt_location
 * @param {dev.ui.tabBar.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.TabBar}
 */
dev.ui.TabBar = function(opt_location, opt_renderer, opt_domHelper) {
  dev.ui.TabBar.base(this, 'constructor', opt_location, opt_renderer ||
    dev.ui.tabBar.Renderer.getInstance(), opt_domHelper);
};
goog.inherits(dev.ui.TabBar, goog.ui.TabBar);
