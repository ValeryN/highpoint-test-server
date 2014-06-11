goog.provide('dev.ui.tabBar.Renderer');

goog.require('goog.ui.TabBarRenderer');


/**
 * @constructor
 * @extends {goog.ui.TabBarRenderer}
 */
dev.ui.tabBar.Renderer = function() {
  dev.ui.tabBar.Renderer.base(this, 'constructor');
};
goog.inherits(dev.ui.tabBar.Renderer, goog.ui.TabBarRenderer);
goog.addSingletonGetter(dev.ui.tabBar.Renderer);


/**
 * @type {string}
 */
dev.ui.tabBar.Renderer.CSS_CLASS = goog.getCssName('devPanel-tabBar');


/** @inheritDoc */
dev.ui.tabBar.Renderer.prototype.getCssClass = function() {
  return dev.ui.tabBar.Renderer.CSS_CLASS;
};
