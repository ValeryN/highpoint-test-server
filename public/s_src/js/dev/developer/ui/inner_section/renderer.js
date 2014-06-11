goog.provide('dev.developer.ui.innerSection.Renderer');

goog.require('ojster');
goog.require('npf.ui.Renderer');
goog.require('dev.developer.ui.innerSection.templates.Base');


/**
 * @constructor
 * @extends {npf.ui.Renderer}
 */
dev.developer.ui.innerSection.Renderer = function() {
  dev.developer.ui.innerSection.Renderer.base(this, 'constructor');
};
goog.inherits(dev.developer.ui.innerSection.Renderer, npf.ui.Renderer);
goog.addSingletonGetter(dev.developer.ui.innerSection.Renderer);


/**
 * @type {string}
 */
dev.developer.ui.innerSection.Renderer.CSS_CLASS =
  goog.getCssName('devPanel-inner-section');


/** @inheritDoc */
dev.developer.ui.innerSection.Renderer.prototype.getCssClass = function() {
  return dev.developer.ui.innerSection.Renderer.CSS_CLASS;
};

/** @inheritDoc */
dev.developer.ui.innerSection.Renderer.prototype.createDom = function(
    component) {
  var template = new dev.developer.ui.innerSection.templates.Base({
    header: component.getHeader()
  });
  template.setBaseCssName(this.getCssClass());
  /** @type {!Element} */
  var element = ojster.createElement(template);
  this.applyClassNames(component, element);

  return element;
};

/** @inheritDoc */
dev.developer.ui.innerSection.Renderer.prototype.getContentElement = function(
    element) {
  return this.getElementByClass(this.getContentCssClass(), element);
};

/**
 * @return {string}
 */
dev.developer.ui.innerSection.Renderer.prototype.getContentCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'content');
};
