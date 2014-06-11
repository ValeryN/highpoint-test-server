goog.provide('npf.ui.scrollable.scrollBar.Renderer');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.style');
goog.require('npf.ui.StatedRenderer');


/**
 * @constructor
 * @extends {npf.ui.StatedRenderer}
 */
npf.ui.scrollable.scrollBar.Renderer = function() {
  npf.ui.scrollable.scrollBar.Renderer.base(this, 'constructor');
};
goog.inherits(npf.ui.scrollable.scrollBar.Renderer, npf.ui.StatedRenderer);
goog.addSingletonGetter(npf.ui.scrollable.scrollBar.Renderer);


/**
 * @type {string}
 */
npf.ui.scrollable.scrollBar.Renderer.CSS_CLASS =
  goog.getCssName('npf-scrollable-scrollBar');


/** @inheritDoc */
npf.ui.scrollable.scrollBar.Renderer.prototype.getCssClass = function() {
  return npf.ui.scrollable.scrollBar.Renderer.CSS_CLASS;
};

/** @inheritDoc */
npf.ui.scrollable.scrollBar.Renderer.prototype.createDom = function(scroller) {
  /** @type {Element} */
  var element = npf.ui.scrollable.scrollBar.Renderer.base(
    this, 'createDom', scroller);
  /** @type {!Element} */
  var backgroundElement = scroller.getDomHelper().createDom(
    goog.dom.TagName.DIV, this.getBackgroundCssClass());
  /** @type {!Element} */
  var runnerElement = scroller.getDomHelper().createDom(goog.dom.TagName.DIV,
    this.getRunnerCssClass());

  goog.dom.appendChild(element, backgroundElement);
  goog.dom.appendChild(element, runnerElement);

  return element;
};

/**
 * @param {Element} element
 * @param {number} position
 */
npf.ui.scrollable.scrollBar.Renderer.prototype.setPosition =
  goog.abstractMethod;

/**
 * @param {Element} element
 * @param {number} size
 */
npf.ui.scrollable.scrollBar.Renderer.prototype.setSize = goog.abstractMethod;

/**
 * @param {Element} element
 * @param {boolean} unselectable
 */
npf.ui.scrollable.scrollBar.Renderer.prototype.setUnselectable = function(
    element, unselectable) {
  if (element) {
    goog.style.setUnselectable(element, unselectable, true);
  }
};

/**
 * @param {Element} element
 * @return {Element}
 */
npf.ui.scrollable.scrollBar.Renderer.prototype.getBackgroundElement = function(
    element) {
  return this.getElementByClass(this.getBackgroundCssClass(), element);
};

/**
 * @param {Element} element
 * @return {Element}
 */
npf.ui.scrollable.scrollBar.Renderer.prototype.getRunnerElement = function(
    element) {
  return this.getElementByClass(this.getRunnerCssClass(), element);
};

/**
 * @return {string}
 */
npf.ui.scrollable.scrollBar.Renderer.prototype.getBackgroundCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'background');
};

/**
 * @return {string}
 */
npf.ui.scrollable.scrollBar.Renderer.prototype.getRunnerCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'runner');
};
