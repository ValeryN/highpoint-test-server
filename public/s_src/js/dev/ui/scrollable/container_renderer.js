goog.provide('dev.ui.scrollable.ContainerRenderer');

goog.require('npf.ui.scrollable.ContainerRenderer');


/**
 * @constructor
 * @extends {npf.ui.scrollable.ContainerRenderer}
 */
dev.ui.scrollable.ContainerRenderer = function() {
  dev.ui.scrollable.ContainerRenderer.base(this, 'constructor');
};
goog.inherits(
  dev.ui.scrollable.ContainerRenderer, npf.ui.scrollable.ContainerRenderer);
goog.addSingletonGetter(dev.ui.scrollable.ContainerRenderer);


/**
 * @type {string}
 */
dev.ui.scrollable.ContainerRenderer.CSS_CLASS =
  goog.getCssName('devPanel-scrollable-container');


/** @inheritDoc */
dev.ui.scrollable.ContainerRenderer.prototype.getCssClass = function() {
  return dev.ui.scrollable.ContainerRenderer.CSS_CLASS;
};
