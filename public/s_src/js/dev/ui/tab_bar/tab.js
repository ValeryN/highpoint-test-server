goog.provide('dev.ui.tabBar.Tab');

goog.require('goog.ui.Tab');
goog.require('dev.ui.tabBar.TabRenderer');


/**
 * @param {goog.ui.ControlContent} content
 * @param {dev.ui.tabBar.TabRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Tab}
 */
dev.ui.tabBar.Tab = function(content, opt_renderer, opt_domHelper) {
  dev.ui.tabBar.Tab.base(this, 'constructor', content, opt_renderer ||
    dev.ui.tabBar.TabRenderer.getInstance(), opt_domHelper);
};
goog.inherits(dev.ui.tabBar.Tab, goog.ui.Tab);
