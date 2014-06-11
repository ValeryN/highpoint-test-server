goog.provide('dev.developer.ui.container.Renderer');

goog.require('ojster');
goog.require('goog.math');
goog.require('goog.style');
goog.require('npf.ui.StatedRenderer');
goog.require('dev.developer.ui.container.templates.Container');


/**
 * @constructor
 * @extends {npf.ui.StatedRenderer}
 */
dev.developer.ui.container.Renderer = function() {
  dev.developer.ui.container.Renderer.base(this, 'constructor');
};
goog.inherits(dev.developer.ui.container.Renderer, npf.ui.StatedRenderer);
goog.addSingletonGetter(dev.developer.ui.container.Renderer);


/**
 * @type {string}
 */
dev.developer.ui.container.Renderer.CSS_CLASS =
  goog.getCssName('devPanel-container');


/** @inheritDoc */
dev.developer.ui.container.Renderer.prototype.getCssClass = function() {
  return dev.developer.ui.container.Renderer.CSS_CLASS;
};

/** @inheritDoc */
dev.developer.ui.container.Renderer.prototype.createDom = function(component) {
  var template = new dev.developer.ui.container.templates.Container();
  template.setBaseCssName(this.getCssClass());
  /** @type {!Element} */
  var element = ojster.createElement(template);
  this.setAriaStates(
    /** @type {!dev.developer.ui.Container} */ (component), element);
  this.applyClassNames(component, element);

  return element;
};

/** @inheritDoc */
dev.developer.ui.container.Renderer.prototype.getContentElement = function(
    element) {
  return this.getElementByClass(this.getContentCssClass(), element);
};

/**
 * @param {dev.developer.ui.Container} container
 * @param {goog.math.Rect} rect
 * @param {goog.math.Size} viewportSize
 * @return {!goog.math.Rect}
 */
dev.developer.ui.container.Renderer.prototype.getRectByViewport = function(
    container, rect, viewportSize) {
  /** @type {goog.math.Rect} */
  var rightRect = rect.clone();
  /** @type {goog.math.Size} */
  var minSize = container.getMinSize();

  if (0 > rect.left) {
    rightRect.width = goog.math.clamp(
      rightRect.width + rightRect.left, minSize.width, viewportSize.width);
    rightRect.left = 0;
  } else {
    rightRect.width = goog.math.clamp(
      rightRect.width, minSize.width, viewportSize.width);
    rightRect.left = goog.math.clamp(
      rightRect.left, 0, viewportSize.width - rightRect.width);
  }

  if (0 > rect.top) {
    rightRect.height = goog.math.clamp(
      rightRect.height + rightRect.top, minSize.height, viewportSize.height);
    rightRect.top = 0;
  } else {
    rightRect.height = goog.math.clamp(
      rightRect.height, minSize.height, viewportSize.height);
    rightRect.top = goog.math.clamp(
      rightRect.top, 0, viewportSize.height - rightRect.height);
  }

  return rightRect;
};

/**
 * @param {Element} element
 * @param {goog.math.Rect} rect
 */
dev.developer.ui.container.Renderer.prototype.setRect = function(element, rect) {
  if (element) {
    goog.style.setSize(element, rect.getSize());
    goog.style.setPosition(element, rect.left, rect.top);
  }
};

/**
 * @param {dev.developer.ui.Container} container
 * @return {!goog.math.Size}
 */
dev.developer.ui.container.Renderer.prototype.getViewportSize = function(
    container) {
  return container.getDomHelper().getViewportSize();
};

/**
 * @param {Element} element
 * @return {Element}
 */
dev.developer.ui.container.Renderer.prototype.getResizeElement = function(
    element) {
  return this.getElementByClass(this.getResizeCssClass(), element);
};

/**
 * @return {string}
 */
dev.developer.ui.container.Renderer.prototype.getDragCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'drag');
};

/**
 * @return {string}
 */
dev.developer.ui.container.Renderer.prototype.getContentCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'content');
};

/**
 * @return {string}
 */
dev.developer.ui.container.Renderer.prototype.getResizeCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'resize');
};
