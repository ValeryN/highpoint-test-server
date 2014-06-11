goog.provide('dev.developer.ui.innerItem.Renderer');

goog.require('npf.ui.Renderer');


/**
 * @constructor
 * @extends {npf.ui.Renderer}
 */
dev.developer.ui.innerItem.Renderer = function() {
  dev.developer.ui.innerItem.Renderer.base(this, 'constructor');
};
goog.inherits(dev.developer.ui.innerItem.Renderer, npf.ui.Renderer);
goog.addSingletonGetter(dev.developer.ui.innerItem.Renderer);


/**
 * @type {string}
 */
dev.developer.ui.innerItem.Renderer.CSS_CLASS =
  goog.getCssName('devPanel-inner-item');


/** @inheritDoc */
dev.developer.ui.innerItem.Renderer.prototype.getCssClass = function() {
  return dev.developer.ui.innerItem.Renderer.CSS_CLASS;
};
