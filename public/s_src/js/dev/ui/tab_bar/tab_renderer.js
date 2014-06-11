goog.provide('dev.ui.tabBar.TabRenderer');

goog.require('goog.ui.TabRenderer');


/**
 * @constructor
 * @extends {goog.ui.TabRenderer}
 */
dev.ui.tabBar.TabRenderer = function() {
  dev.ui.tabBar.TabRenderer.base(this, 'constructor');
};
goog.inherits(dev.ui.tabBar.TabRenderer, goog.ui.TabRenderer);
goog.addSingletonGetter(dev.ui.tabBar.TabRenderer);


/**
 * @type {string}
 */
dev.ui.tabBar.TabRenderer.CSS_CLASS = goog.getCssName('devPanel-tab')


/** @inheritDoc */
dev.ui.tabBar.TabRenderer.prototype.getCssClass = function() {
  return dev.ui.tabBar.TabRenderer.CSS_CLASS;
};
