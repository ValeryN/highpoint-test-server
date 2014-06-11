goog.provide('dev.developer.ui.Container');
goog.provide('dev.developer.ui.Container.EventType');

goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.fx.Dragger');
goog.require('goog.fx.Dragger.EventType');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');
goog.require('goog.math.Size');
goog.require('npf.ui.StatedComponent');
goog.require('dev.developer.ui.container.Renderer');


/**
 * @param {dev.developer.ui.container.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.StatedComponent}
 */
dev.developer.ui.Container = function(opt_renderer, opt_domHelper) {
  dev.developer.ui.Container.base(
    this,
    'constructor',
    opt_renderer || dev.developer.ui.container.Renderer.getInstance(),
    opt_domHelper);

  /**
   * @private {goog.math.Rect}
   */
  this._dragRect = null;

  /**
   * @private {number}
   */
  this._height = dev.developer.ui.Container.HEIGHT;

  /**
   * @private {number}
   */
  this._left = 0;

  /**
   * @private {number}
   */
  this._minHeight = dev.developer.ui.Container.MIN_HEIGHT;

  /**
   * @private {number}
   */
  this._minWidth = dev.developer.ui.Container.MIN_WIDTH;

  /**
   * @private {goog.fx.Dragger}
   */
  this._moveDragger = null;

  /**
   * @private {Element}
   */
  this._moveElement = null;

  /**
   * @private {goog.fx.Dragger}
   */
  this._resizeDragger = null;

  /**
   * @private {dev.developer.ui.TabPanel}
   */
  this._tabPanel = null;

  /**
   * @private {number}
   */
  this._top = 0;

  /**
   * @private {goog.math.Size}
   */
  this._viewportSize = this.getRenderer().getViewportSize(this);

  /**
   * @private {number}
   */
  this._width = dev.developer.ui.Container.WIDTH;
};
goog.inherits(dev.developer.ui.Container, npf.ui.StatedComponent);


/**
 * @enum {string}
 */
dev.developer.ui.Container.EventType = {
  REPOSITION: goog.events.getUniqueId('reposition')
};

/**
 * @const {number}
 */
dev.developer.ui.Container.WIDTH = 500;

/**
 * @const {number}
 */
dev.developer.ui.Container.HEIGHT = 300;

/**
 * @const {number}
 */
dev.developer.ui.Container.MIN_WIDTH = 100;

/**
 * @const {number}
 */
dev.developer.ui.Container.MIN_HEIGHT = 100;


/** @inheritDoc */
dev.developer.ui.Container.prototype.createDom = function() {
  dev.developer.ui.Container.base(this, 'createDom');

  this.applyRect(this.getRect());

  this._tabPanel = this.createTabPanel();
  this.addChild(this._tabPanel, true);

  this.setMoveElement(this._tabPanel.getMoveElement());
};

/** @inheritDoc */
dev.developer.ui.Container.prototype.enterDocument = function() {
  dev.developer.ui.Container.base(this, 'enterDocument');

  /** @type {Element} */
  var element = this.getElement();
  /** @type {Element} */
  var resizeElement = this.getResizeElement();
  /** @type {!Window} */
  var win = this.getDomHelper().getWindow();

  this.resize();

  if (this._moveElement) {
    this._moveDragger = new goog.fx.Dragger(element, this._moveElement);
    this._moveDragger.setHysteresis(5);
    this._moveDragger.defaultAction = goog.nullFunction;

    this.getHandler()
      .listen(this._moveDragger, goog.fx.Dragger.EventType.START,
        this._onDragStart)
      .listen(this._moveDragger, goog.fx.Dragger.EventType.DRAG,
        this._onMoveDrag)
      .listen(this._moveDragger, goog.fx.Dragger.EventType.END,
        this._onDragEnd);
  }

  if (resizeElement) {
    this._resizeDragger = new goog.fx.Dragger(element, resizeElement);
    this._resizeDragger.defaultAction = goog.nullFunction;

    this.getHandler()
      .listen(this._resizeDragger, goog.fx.Dragger.EventType.START,
        this._onDragStart)
      .listen(this._resizeDragger, goog.fx.Dragger.EventType.DRAG,
        this._onResizeDrag)
      .listen(this._resizeDragger, goog.fx.Dragger.EventType.END,
        this._onDragEnd);
  }

  this.getHandler()
    .listen(win, goog.events.EventType.RESIZE, this._onResize);
};

/** @inheritDoc */
dev.developer.ui.Container.prototype.exitDocument = function() {
  goog.dispose(this._moveDragger);
  this._moveDragger = null;

  goog.dispose(this._resizeDragger);
  this._resizeDragger = null;

  this._dragRect = null;

  dev.developer.ui.Container.base(this, 'exitDocument');
};

/** @inheritDoc */
dev.developer.ui.Container.prototype.disposeInternal = function() {
  dev.developer.ui.Container.base(this, 'disposeInternal');

  this._moveElement = null;
  this._tabPanel = null;
  this._viewportSize = null;
};

/**
 * @return {!dev.developer.ui.TabPanel}
 * @protected
 */
dev.developer.ui.Container.prototype.createTabPanel = goog.abstractMethod;

/**
 * @return {dev.developer.ui.TabPanel}
 */
dev.developer.ui.Container.prototype.getTabPanel = function() {
  return this._tabPanel;
};

/**
 * @return {!goog.math.Size}
 */
dev.developer.ui.Container.prototype.getMinSize = function() {
  return new goog.math.Size(this._minWidth, this._minHeight);
};

/**
 * @param {number|goog.math.Size} w
 * @param {number=} opt_h
 */
dev.developer.ui.Container.prototype.setMinSize = function(w, opt_h) {
  var width = /** @type {number} */ (goog.isNumber(w) ? w : w.width);
  var height = /** @type {number} */ (goog.isNumber(w) ? opt_h : w.height);

  if (!(this._minWidth == width && this._minHeight == height)) {
    this._minWidth = width;
    this._minHeight = height;
    this.setRect(this.getRect());
  }
};

/**
 * @return {!goog.math.Coordinate}
 */
dev.developer.ui.Container.prototype.getPosition = function() {
  return new goog.math.Coordinate(this._left, this._top);
};

/**
 * @param {goog.math.Coordinate|number} x
 * @param {number=} opt_y
 */
dev.developer.ui.Container.prototype.setPosition = function(x, opt_y) {
  /** @type {number} */
  var left = goog.isNumber(x) ? x : /** @type {number} */ (x.x);
  var top = /** @type {number} */ (goog.isNumber(x) ? opt_y : x.y);
  this.setRect(left, top, this._width, this._height);
};

/**
 * @return {!goog.math.Size}
 */
dev.developer.ui.Container.prototype.getSize = function() {
  return new goog.math.Size(this._width, this._height);
};

/**
 * @param {goog.math.Size|number} w
 * @param {number=} opt_h
 */
dev.developer.ui.Container.prototype.setSize = function(w, opt_h) {
  /** @type {number} */
  var width = goog.isNumber(w) ? w : /** @type {number} */ (w.width);
  var height = /** @type {number} */ (goog.isNumber(w) ? opt_h : w.height);
  this.setRect(this._left, this._top, width, height);
};

/**
 * @return {!goog.math.Rect}
 */
dev.developer.ui.Container.prototype.getRect = function() {
  return new goog.math.Rect(this._left, this._top, this._width, this._height);
};

/**
 * @param {number|goog.math.Rect} x
 * @param {number=} opt_y
 * @param {number=} opt_w
 * @param {number=} opt_h
 */
dev.developer.ui.Container.prototype.setRect = function(x, opt_y, opt_w,
    opt_h) {
  /** @type {goog.math.Rect} */
  var rect;

  if (goog.isNumber(x)) {
    rect = new goog.math.Rect(x, opt_y || 0, opt_w || 0, opt_h || 0);
  } else {
    rect = x;
  }

  rect = this.getRenderer().getRectByViewport(this, rect, this._viewportSize);

  if (!goog.math.Rect.equals(rect, this.getRect())) {
    this._left = rect.left;
    this._top = rect.top;
    this._width = rect.width;
    this._height = rect.height;

    this.applyRect(rect);
    this.onReposition();
  }
};

/**
 * @param {goog.math.Rect} rect
 */
dev.developer.ui.Container.prototype.applyRect = function(rect) {
  this.getRenderer().setRect(this.getElement(), rect);
};

/**
 * @protected
 */
dev.developer.ui.Container.prototype.onReposition = function() {
  if (this._tabPanel) {
    this._tabPanel.getSelectedContainer().update();
    this._tabPanel.getTabScrollContainer().update();
  }

  this.dispatchEvent(dev.developer.ui.Container.EventType.REPOSITION);
};

dev.developer.ui.Container.prototype.resize = function() {
  this._viewportSize = this.getRenderer().getViewportSize(this);
  this.setRect(this._left, this._top, this._width, this._height);
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
dev.developer.ui.Container.prototype._onResize = function(evt) {
  this.resize();
};

/**
 * @param {goog.fx.DragEvent} evt
 * @private
 */
dev.developer.ui.Container.prototype._onDragStart = function(evt) {
  this._dragRect = this.getRect();
  this.addClassName(this.getRenderer().getDragCssClass());
};

/**
 * @param {goog.fx.DragEvent} evt
 * @private
 */
dev.developer.ui.Container.prototype._onMoveDrag = function(evt) {
  /** @type {number} */
  var left = evt.left;
  /** @type {number} */
  var top = evt.top;
  this.setRect(left, top, this._dragRect.width, this._dragRect.height);
};

/**
 * @param {goog.fx.DragEvent} evt
 * @private
 */
dev.developer.ui.Container.prototype._onResizeDrag = function(evt) {
  /** @type {number} */
  var left = evt.left;
  /** @type {number} */
  var top = evt.top;
  this.setRect(
    this._dragRect.left,
    this._dragRect.top,
    this._dragRect.width - this._dragRect.left + left,
    this._dragRect.height - this._dragRect.top + top
  );
};

/**
 * @param {goog.fx.DragEvent} evt
 * @private
 */
dev.developer.ui.Container.prototype._onDragEnd = function(evt) {
  this.removeClassName(this.getRenderer().getDragCssClass());
};

/**
 * @return {Element}
 */
dev.developer.ui.Container.prototype.getMoveElement = function() {
  return this._moveElement;
};

/**
 * @param {Element} element
 */
dev.developer.ui.Container.prototype.setMoveElement = function(element) {
  this._moveElement = element;
};

/**
 * @return {Element}
 */
dev.developer.ui.Container.prototype.getResizeElement = function() {
  return this.getRenderer().getResizeElement(this.getElement());
};
