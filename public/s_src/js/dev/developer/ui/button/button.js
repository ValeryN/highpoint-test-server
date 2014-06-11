goog.provide('dev.developer.ui.Button');
goog.provide('dev.developer.ui.Button.EventType');

goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.fx.Dragger');
goog.require('goog.math.Rect');
goog.require('goog.math.Size');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Component.State');
goog.require('npf.ui.StatedComponent');
goog.require('dev.developer.ui.button.Renderer');


/**
 * @param {string=} opt_content
 * @param {dev.developer.ui.button.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.StatedComponent}
 */
dev.developer.ui.Button = function(opt_content, opt_renderer, opt_domHelper) {
  dev.developer.ui.Button.base(
    this,
    'constructor',
    opt_renderer || dev.developer.ui.button.Renderer.getInstance(),
    opt_domHelper);

  /**
   * @private {string}
   */
  this._content = opt_content || '';

  /**
   * @private {goog.fx.Dragger}
   */
  this._dragger = null;

  /**
   * @private {number}
   */
  this._position = dev.developer.ui.Button.POSITION;

  /**
   * @private {goog.math.Size}
   */
  this._size = null;

  /**
   * @private {goog.math.Size}
   */
  this._viewportSize = null;

  this.setSupportedState(goog.ui.Component.State.CHECKED, true);
  this.setAutoStates(goog.ui.Component.State.CHECKED, false);
};
goog.inherits(dev.developer.ui.Button, npf.ui.StatedComponent);


/**
 * @enum {string}
 */
dev.developer.ui.Button.EventType = {
  REPOSITION: goog.events.getUniqueId('reposition')
};

/**
 * @const {number}
 */
dev.developer.ui.Button.POSITION = 0.7;


/** @inheritDoc */
dev.developer.ui.Button.prototype.createDom = function() {
  dev.developer.ui.Button.base(this, 'createDom');

  this.applyPosition(this._position);
};

/** @inheritDoc */
dev.developer.ui.Button.prototype.enterDocument = function() {
  dev.developer.ui.Button.base(this, 'enterDocument');

  /** @type {!Window} */
  var win = this.getDomHelper().getWindow();
  /** @type {Element} */
  var element = this.getElement();

  this._dragger = new goog.fx.Dragger(element);
  this._dragger.defaultAction = goog.bind(this._draggerAction, this);

  this.resize();

  this.getHandler()
    .listen(element, goog.events.EventType.CLICK, this._onClick)
    .listen(win, goog.events.EventType.RESIZE, this._onResize);
};

/** @inheritDoc */
dev.developer.ui.Button.prototype.exitDocument = function() {
  this._dragger.dispose();
  this._dragger = null;

  dev.developer.ui.Button.base(this, 'exitDocument');
};

/** @inheritDoc */
dev.developer.ui.Button.prototype.disposeInternal = function() {
  dev.developer.ui.Button.base(this, 'disposeInternal');

  this._viewportSize = null;
  this._size = null;
};

/**
 * @return {string}
 */
dev.developer.ui.Button.prototype.getContent = function() {
  return this._content;
};

/**
 * @param {string} content
 */
dev.developer.ui.Button.prototype.setContent = function(content) {
  if (this._content != content) {
    this._content = content;
    this.applyContent(this._content);
  }
};

/**
 * @param {string} content
 * @protected
 */
dev.developer.ui.Button.prototype.applyContent = function(content) {
  this.getRenderer().setContent(this, content);
};

/**
 * @param {number} x
 * @param {number} y
 * @private
 */
dev.developer.ui.Button.prototype._draggerAction = function(x, y) {
  /** @type {number} */
  var position = this.getRenderer().getPosition(
    this,
    Math.round(x + this._size.width / 2),
    Math.round(y + this._size.height / 2),
    this._viewportSize
  );
  this.setPosition(position);
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
dev.developer.ui.Button.prototype._onClick = function(evt) {
  this.dispatchEvent(goog.ui.Component.EventType.ACTION);
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
dev.developer.ui.Button.prototype._onResize = function(evt) {
  this.resize();
};

/**
 * @private
 */
dev.developer.ui.Button.prototype.resize = function() {
  if (this.isInDocument()) {
    this._size = this.getRenderer().getSize(this.getElement());
    this._viewportSize = this.getRenderer().getViewportSize(this);

    /** @type {goog.math.Rect} */
    var limits = new goog.math.Rect(
      0, 0,
      this._viewportSize.width - this._size.width,
      this._viewportSize.height - this._size.height
    );
    this._dragger.setLimits(limits);
  }
};

/**
 * @return {number}
 */
dev.developer.ui.Button.prototype.getPosition = function() {
  return this._position;
};

/**
 * @param {number} position
 */
dev.developer.ui.Button.prototype.setPosition = function(position) {
  if (0.001 <= Math.abs(position - this._position)) {
    this._position = position;
    this.applyPosition(this._position);
    this.dispatchEvent(dev.developer.ui.Button.EventType.REPOSITION);
  }
};

/**
 * @param {number} position
 * @protected
 */
dev.developer.ui.Button.prototype.applyPosition = function(position) {
  this.getRenderer().setPosition(this, position);
};
