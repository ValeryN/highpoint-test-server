goog.provide('npf.ui.StickyHead');

goog.require('goog.events.EventType');
goog.require('goog.style');
goog.require('npf.ui.RenderedComponent');
goog.require('npf.ui.stickyHead.Body');
goog.require('npf.ui.stickyHead.Head');
goog.require('npf.ui.stickyHead.Renderer');


/**
 * @param {npf.ui.stickyHead.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.RenderedComponent}
 * @deprecated
 */
npf.ui.StickyHead = function(opt_renderer, opt_domHelper) {
	npf.ui.StickyHead.base(
		this,
		'constructor',
		opt_renderer || npf.ui.stickyHead.Renderer.getInstance(),
		opt_domHelper);

	/**
	 * @private {npf.ui.stickyHead.Body}
	 */
	this.body_ = null;

	/**
	 * @private {npf.ui.stickyHead.Head}
	 */
	this.head_ = null;

	/**
	 * @private {npf.ui.stickyHead.Head}
	 */
	this.stickyHead_ = null;

	/**
	 * @private {Element}
	 */
	this.viewportElement_ = null;
};
goog.inherits(npf.ui.StickyHead, npf.ui.RenderedComponent);


/** @inheritDoc */
npf.ui.StickyHead.prototype.createDom = function() {
	npf.ui.StickyHead.base(this, 'createDom');

	this.stickyHead_ = this.createStickyHead();
	this.registerDisposable(this.stickyHead_);
	this.stickyHead_.setVisible(false);
	this.stickyHead_.render(
		this.viewportElement_ || this.getDomHelper().getDocument().body);

	this.body_ = this.createBody();
	this.head_ = this.createHead();

	this.addChild(this.head_, true);
	this.addChild(this.body_, true);
};

/** @inheritDoc */
npf.ui.StickyHead.prototype.enterDocument = function() {
	npf.ui.StickyHead.base(this, 'enterDocument');

	this.update();

	/** @type {Element|Window} */
	var scrollElement = this.viewportElement_ ?
		this.viewportElement_ : this.getDomHelper().getWindow();
	this.getHandler().listen(
		scrollElement, goog.events.EventType.SCROLL, this.onScroll_);
};

/** @inheritDoc */
npf.ui.StickyHead.prototype.exitDocument = function() {
	this.setStickyVisible(false);

	npf.ui.StickyHead.base(this, 'exitDocument');
};

/** @inheritDoc */
npf.ui.StickyHead.prototype.disposeInternal = function() {
	npf.ui.StickyHead.base(this, 'disposeInternal');

	this.body_ = null;
	this.head_ = null;
	this.stickyHead_ = null;
	this.viewportElement_ = null;
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
npf.ui.StickyHead.prototype.onScroll_ = function(evt) {
	this.update();
};

/**
 * @return {npf.ui.stickyHead.Body}
 * @protected
 */
npf.ui.StickyHead.prototype.createBody = function() {
	return new npf.ui.stickyHead.Body();
};

/**
 * @return {npf.ui.stickyHead.Head}
 * @protected
 */
npf.ui.StickyHead.prototype.createHead = function() {
	return new npf.ui.stickyHead.Head(false);
};

/**
 * @return {npf.ui.stickyHead.Head}
 * @protected
 */
npf.ui.StickyHead.prototype.createStickyHead = function() {
	return new npf.ui.stickyHead.Head(true);
};

/**
 * @return {npf.ui.stickyHead.Body}
 */
npf.ui.StickyHead.prototype.getBody = function() {
	return this.body_;
};

/**
 * @return {npf.ui.stickyHead.Head}
 */
npf.ui.StickyHead.prototype.getHead = function() {
	return this.head_;
};

/**
 * @return {npf.ui.stickyHead.Head}
 */
npf.ui.StickyHead.prototype.getStickyHead = function() {
	return this.stickyHead_;
};

/**
 * @return {boolean}
 */
npf.ui.StickyHead.prototype.isStickyVisible = function() {
	return this.stickyHead_.isVisible();
};

/**
 * @param {boolean} visible
 */
npf.ui.StickyHead.prototype.setStickyVisible = function(visible) {
	this.stickyHead_.setVisible(visible);
};

/**
 * @return {Element}
 */
npf.ui.StickyHead.prototype.getViewportElement = function() {
	return this.viewportElement_;
};

/**
 * @param {Element} viewportElement
 */
npf.ui.StickyHead.prototype.setViewportElement = function(viewportElement) {
	this.viewportElement_ = viewportElement;
};

npf.ui.StickyHead.prototype.update = function() {
	if (this.isInDocument()) {
		/** @type {Element} */
		var headElement = this.head_.getElement();
		/** @type {Element} */
		var bodyElement = this.body_.getElement();
		/** @type {number} */
		var headTop;
		/** @type {number} */
		var bodyTop;
		/** @type {number} */
		var bodyHeight = goog.style.getBorderBoxSize(bodyElement).height;

		if (this.viewportElement_) {
			headTop = goog.style.getRelativePosition(
				headElement, this.viewportElement_).y;
			bodyTop = goog.style.getRelativePosition(
				bodyElement, this.viewportElement_).y;
		} else {
			headTop = goog.style.getClientPosition(headElement).y;
			bodyTop = goog.style.getClientPosition(bodyElement).y;
		}

		/** @type {boolean} */
		var visible = 0 > headTop && 0 < bodyTop + bodyHeight;

		this.setStickyVisible(visible);
	}
};
