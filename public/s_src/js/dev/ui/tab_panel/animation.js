goog.provide('dev.ui.tabPanel.Animation');
goog.provide('dev.ui.tabPanel.Animation.Direction');

goog.require('goog.events.EventTarget');
goog.require('goog.fx.Transition');
goog.require('goog.fx.Transition.EventType');
goog.require('goog.style');
goog.require('npf.fx.KeyframeAnimation');
goog.require('npf.fx.css3.easing');
goog.require('dev.style.transform');



/**
 * @param {dev.ui.tabPanel.SectionsContainer} container
 * @param {goog.ui.Component} visibleChild
 * @param {goog.ui.Component} hideChild
 * @param {dev.ui.tabPanel.Animation.Direction} direction
 * @constructor
 * @extends {goog.events.EventTarget}
 * @implements {goog.fx.Transition}
 */
dev.ui.tabPanel.Animation = function(container, visibleChild, hideChild,
    direction) {
  dev.ui.tabPanel.Animation.base(this, 'constructor');

  /**
   * @private {dev.ui.tabPanel.SectionsContainer}
   */
  this._container = container;
  this._container.setAnimated(true);

  /**
   * @private {dev.ui.tabPanel.Animation.Direction}
   */
  this._direction = direction;

  /**
   * @private {goog.ui.Component}
   */
  this._hideChild = hideChild;

  /**
   * @private {goog.fx.TransitionBase}
   */
  this._transition = null;

  /**
   * @private {goog.ui.Component}
   */
  this._visibleChild = visibleChild;

  /**
   * @private {number}
   */
  this._width = goog.style.getBorderBoxSize(this._container.getElement()).width;

  var from = dev.ui.tabPanel.Animation.Direction.PREV == this._direction
    ? -this._width : this._width;

  goog.style.setStyle(this._hideChild.getElement(), {
    'left': -from + 'px'
  });
};
goog.inherits(dev.ui.tabPanel.Animation, goog.events.EventTarget);


/**
 * @const {number}
 */
dev.ui.tabPanel.Animation.DURATION = 400;

/**
 * @enum {number}
 */
dev.ui.tabPanel.Animation.Direction = {
  NEXT: 1,
  PREV: -1
};


/** @inheritDoc */
dev.ui.tabPanel.Animation.prototype.disposeInternal = function() {
  this.stop();

  goog.style.setStyle(this._hideChild.getElement(), 'left', '');
  this._container.setAnimated(false);

  dev.ui.tabPanel.Animation.base(this, 'disposeInternal');

  this._container = null;
  this._visibleChild = null;
  this._hideChild = null;
  this._transition = null;
};

dev.ui.tabPanel.Animation.prototype.play = function() {
  if (this._transition) {
    return;
  }

  /** @type {number} */
  var from = dev.ui.tabPanel.Animation.Direction.PREV == this._direction ?
    -this._width : this._width;

  this._transition = new npf.fx.KeyframeAnimation(
    this._container.getContentElement(), dev.ui.tabPanel.Animation.DURATION,
    npf.fx.css3.easing.EASE_IN_OUT_CUBIC);
  this._transition.listen(
    goog.fx.Transition.EventType.END, this._onEnd, false, this);
  this._transition.fromTo({
    'transform': dev.style.transform.getTransition(from, 0)
  }, {
    'transform': dev.style.transform.getTransition(0, 0)
  });
  this._transition.play();
};

dev.ui.tabPanel.Animation.prototype.stop = function() {
  if (this._transition) {
    this._transition.stop();
  }
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
dev.ui.tabPanel.Animation.prototype._onEnd = function(evt) {
  if (this._transition) {
    this._transition.dispose();
    this._transition = null;

    this.dispatchEvent(goog.fx.Transition.EventType.END);
  }
};
