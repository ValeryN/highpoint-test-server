goog.provide('dev.developer.ui.radioGroupItem.Renderer');

goog.require('ojster');
goog.require('goog.dom.forms');
goog.require('dev.developer.ui.innerItem.Renderer');
goog.require('dev.developer.ui.radioGroupItem.templates.Base');


/**
 * @constructor
 * @extends {dev.developer.ui.innerItem.Renderer}
 */
dev.developer.ui.radioGroupItem.Renderer = function() {
  dev.developer.ui.radioGroupItem.Renderer.base(this, 'constructor');
};
goog.inherits(dev.developer.ui.radioGroupItem.Renderer,
  dev.developer.ui.innerItem.Renderer);
goog.addSingletonGetter(dev.developer.ui.radioGroupItem.Renderer);


/** @inheritDoc */
dev.developer.ui.radioGroupItem.Renderer.prototype.createDom = function(
    component) {
  var template = new dev.developer.ui.radioGroupItem.templates.Base({
    header: component.getHeader(),
    name: component.getOptionName(),
    options: component.getOptions()
  });
  template.setBaseCssName(this.getCssClass());
  /** @type {!Element} */
  var element = ojster.createElement(template);
  this.applyClassNames(component, element);

  return element;
};

/**
 * @param {dev.developer.ui.RadioGroupItem} component
 * @param {number} index
 */
dev.developer.ui.radioGroupItem.Renderer.prototype.setSelectedIndex = function(
    component, index) {
  /** @type {Array.<Element>} */
  var inputElements = component.getInputElements();

  if (inputElements && inputElements[index]) {
    goog.dom.forms.setValue(inputElements[index], true);
  }
};

/**
 * @param {Element} element
 * @return {Array.<Element>}
 */
dev.developer.ui.radioGroupItem.Renderer.prototype.getInputElements = function(
    element) {
  return /** @type {Array.<Element>} */ (
    this.getElementsByClass(this.getInputCssClass(), element));
};

/**
 * @return {string}
 */
dev.developer.ui.radioGroupItem.Renderer.prototype.getInputCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'input');
};
