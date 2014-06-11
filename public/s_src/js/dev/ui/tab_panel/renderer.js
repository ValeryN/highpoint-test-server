goog.provide('dev.ui.tabPanel.Renderer');

goog.require('npf.ui.Renderer');


/**
 * @constructor
 * @extends {npf.ui.Renderer}
 */
dev.ui.tabPanel.Renderer = function() {
  dev.ui.tabPanel.Renderer.base(this, 'constructor');
};
goog.inherits(dev.ui.tabPanel.Renderer, npf.ui.Renderer);
goog.addSingletonGetter(dev.ui.tabPanel.Renderer);


/**
 * @type {string}
 */
dev.ui.tabPanel.Renderer.CSS_CLASS = goog.getCssName('devPanel-tabPanel');


/** @inheritDoc */
dev.ui.tabPanel.Renderer.prototype.getCssClass = function() {
  return dev.ui.tabPanel.Renderer.CSS_CLASS;
};

/** @inheritDoc */
dev.ui.tabPanel.Renderer.prototype.canDecorate = function(element) {
  return false;
};
