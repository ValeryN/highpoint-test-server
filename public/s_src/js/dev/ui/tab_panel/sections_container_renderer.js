goog.provide('dev.ui.tabPanel.SectionsContainerRenderer');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classlist');
goog.require('npf.ui.Renderer');


/**
 * @constructor
 * @extends {npf.ui.Renderer}
 */
dev.ui.tabPanel.SectionsContainerRenderer = function() {
  dev.ui.tabPanel.SectionsContainerRenderer.base(this, 'constructor');
};
goog.inherits(dev.ui.tabPanel.SectionsContainerRenderer, npf.ui.Renderer);
goog.addSingletonGetter(dev.ui.tabPanel.SectionsContainerRenderer);


/**
 * @type {string}
 */
dev.ui.tabPanel.SectionsContainerRenderer.CSS_CLASS =
  goog.getCssName('devPanel-tabPanel-sections');


/** @inheritDoc */
dev.ui.tabPanel.SectionsContainerRenderer.prototype.getCssClass = function() {
  return dev.ui.tabPanel.SectionsContainerRenderer.CSS_CLASS;
};

/** @inheritDoc */
dev.ui.tabPanel.SectionsContainerRenderer.prototype.createDom = function(
    component) {
  /** @type {Element} */
  var element = dev.ui.tabPanel.SectionsContainerRenderer.base(
    this, 'createDom', component);
  /** @type {!Element} */
  var contentElement = component.getDomHelper().createDom(goog.dom.TagName.DIV,
    this.getContentCssClass());
  goog.dom.appendChild(element, contentElement);

  return element;
};

/** @inheritDoc */
dev.ui.tabPanel.SectionsContainerRenderer.prototype.getContentElement = function(
    element) {
  return this.getElementByClass(this.getContentCssClass(), element);
};

/**
 * @param {Element} element
 * @param {boolean} animate
 */
dev.ui.tabPanel.SectionsContainerRenderer.prototype.setAnimated = function(
    element, animate) {
  if (element) {
    goog.dom.classlist.enable(element, this.getAnimatedCssClass(), animate);
  }
};

/**
 * @return {string}
 */
dev.ui.tabPanel.SectionsContainerRenderer.prototype.getContentCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'content');
};

/**
 * @return {string}
 */
dev.ui.tabPanel.SectionsContainerRenderer.prototype.getAnimatedCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'animated');
};
