goog.provide('dev.developer.ui.linkItem.Renderer');

goog.require('ojster');
goog.require('dev.developer.ui.innerItem.Renderer');
goog.require('dev.developer.ui.linkItem.templates.Base');


/**
 * @constructor
 * @extends {dev.developer.ui.innerItem.Renderer}
 */
dev.developer.ui.linkItem.Renderer = function() {
  dev.developer.ui.linkItem.Renderer.base(this, 'constructor');
};
goog.inherits(dev.developer.ui.linkItem.Renderer,
  dev.developer.ui.innerItem.Renderer);
goog.addSingletonGetter(dev.developer.ui.linkItem.Renderer);


/** @inheritDoc */
dev.developer.ui.linkItem.Renderer.prototype.createDom = function(component) {
  var template = new dev.developer.ui.linkItem.templates.Base({
    linkContent: component.getLinkContent(),
    inputEnabled: component.isInputEnabled(),
    defaultInputValue: component.getDefaultInputValue(),
    inputSuffix: component.getInputSuffix(),
    inputPrefix: component.getInputPrefix()
  });
  template.setBaseCssName(this.getCssClass());
  /** @type {!Element} */
  var element = ojster.createElement(template);
  this.applyClassNames(component, element);

  return element;
};

/**
 * @param {Element} element
 * @return {Element}
 */
dev.developer.ui.linkItem.Renderer.prototype.getLinkElement = function(
    element) {
  return this.getElementByClass(this.getLinkCssClass(), element);
};

/**
 * @param {Element} element
 * @return {Element}
 */
dev.developer.ui.linkItem.Renderer.prototype.getInputElement = function(
    element) {
  return this.getElementByClass(this.getInputCssClass(), element);
};

/**
 * @return {string}
 */
dev.developer.ui.linkItem.Renderer.prototype.getLinkCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'link');
};

/**
 * @return {string}
 */
dev.developer.ui.linkItem.Renderer.prototype.getInputCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'input');
};
