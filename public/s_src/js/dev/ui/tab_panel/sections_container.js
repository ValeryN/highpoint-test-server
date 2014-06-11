goog.provide('dev.ui.tabPanel.SectionsContainer');

goog.require('npf.ui.RenderedComponent');
goog.require('dev.ui.tabPanel.SectionsContainerRenderer');


/**
 * @param {dev.ui.tabPanel.SectionsContainerRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.RenderedComponent}
 */
dev.ui.tabPanel.SectionsContainer = function(opt_renderer, opt_domHelper) {
  dev.ui.tabPanel.SectionsContainer.base(
    this,
    'constructor',
    opt_renderer || dev.ui.tabPanel.SectionsContainerRenderer.getInstance(),
    opt_domHelper);

  /**
   * @private {boolean}
   */
  this._animated = false;
};
goog.inherits(dev.ui.tabPanel.SectionsContainer, npf.ui.RenderedComponent);


/** @inheritDoc */
dev.ui.tabPanel.SectionsContainer.prototype.createDom = function() {
  dev.ui.tabPanel.SectionsContainer.base(this, 'createDom');

  this.applyAnimated(this._animated);
};

/**
 * @param {boolean} animate
 */
dev.ui.tabPanel.SectionsContainer.prototype.setAnimated = function(animate) {
  if (this._animated != animate) {
    this._animated = animate;
    this.applyAnimated(this._animated);
  }
};

/**
 * @param {boolean} animate
 * @protected
 */
dev.ui.tabPanel.SectionsContainer.prototype.applyAnimated = function(
    animate) {
  this.getRenderer().setAnimated(this.getElement(), animate);
};
