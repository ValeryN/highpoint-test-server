goog.provide('npf.ui.stickyHead.HeadRenderer');

goog.require('goog.dom.classlist');
goog.require('goog.style');
goog.require('npf.ui.Renderer');


/**
 * @constructor
 * @extends {npf.ui.Renderer}
 */
npf.ui.stickyHead.HeadRenderer = function() {
	npf.ui.stickyHead.HeadRenderer.base(this, 'constructor');
};
goog.inherits(npf.ui.stickyHead.HeadRenderer, npf.ui.Renderer);
goog.addSingletonGetter(npf.ui.stickyHead.HeadRenderer);


/**
 * @type {string}
 */
npf.ui.stickyHead.HeadRenderer.CSS_CLASS = goog.getCssName('stickyHead-head');


/** @inheritDoc */
npf.ui.stickyHead.HeadRenderer.prototype.getCssClass = function() {
	return npf.ui.stickyHead.HeadRenderer.CSS_CLASS;
};

/** @inheritDoc */
npf.ui.stickyHead.HeadRenderer.prototype.createDom = function(component) {
	/** @type {Element} */
	var element = npf.ui.stickyHead.HeadRenderer.base(
		this, 'createDom', component);

	if (component.isSticky()) {
		goog.dom.classlist.add(element, this.getStickyCssClass());
	}

	return element;
};

/**
 * @param {!npf.ui.stickyHead.Head} component
 * @param {boolean} visible
 */
npf.ui.stickyHead.HeadRenderer.prototype.setVisible = function(component,
		visible) {
	/** @type {Element} */
	var element = component.getElement();

	if (element) {
		goog.style.setElementShown(element, visible);
	}
};

/**
 * @return {string}
 */
npf.ui.stickyHead.HeadRenderer.prototype.getStickyCssClass = function() {
	return goog.getCssName(this.getStructuralCssClass(), 'stickyHead');
};
