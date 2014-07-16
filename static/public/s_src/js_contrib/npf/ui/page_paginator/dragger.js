goog.provide('npf.ui.pagePaginator.Dragger');

goog.require('goog.events.EventType');
goog.require('goog.fx.Dragger');


/**
 * @param {Element} target The element that will be dragged.
 * @param {Element=} opt_handle An optional handle to control the drag, if null
 *     the target is used.
 * @param {goog.math.Rect=} opt_limits Object containing left, top, width,
 *     and height.
 * @constructor
 * @extends {goog.fx.Dragger}
 */
npf.ui.pagePaginator.Dragger = function(target, opt_handle, opt_limits) {
  npf.ui.pagePaginator.Dragger.base(
    this, 'constructor', target, opt_handle, opt_limits);

  /**
   * @private {boolean}
   */
  this.isLeftLimit_ = false;

  /**
   * @private {boolean}
   */
  this.isRightLimit_ = false;
};
goog.inherits(npf.ui.pagePaginator.Dragger, goog.fx.Dragger);


/** @inheritDoc */
npf.ui.pagePaginator.Dragger.prototype.startDrag = function(e) {
  npf.ui.pagePaginator.Dragger.base(this, 'startDrag', e);

  if (goog.events.EventType.TOUCHSTART == e.type) {
    e.stopPropagation();
  }
};

/** @inheritDoc */
npf.ui.pagePaginator.Dragger.prototype.doDrag = function(e, x, y,
    dragFromScroll) {
  npf.ui.pagePaginator.Dragger.base(this, 'doDrag', e, x, y, dragFromScroll);

  if (goog.events.EventType.TOUCHMOVE == e.type) {
    e.stopPropagation();
  }
};

/** @inheritDoc */
npf.ui.pagePaginator.Dragger.prototype.endDrag = function(e, opt_dragCanceled) {
  npf.ui.pagePaginator.Dragger.base(this, 'endDrag', e, opt_dragCanceled);

  if (
    goog.events.EventType.TOUCHEND == e.type &&
    goog.events.EventType.TOUCHCANCEL == e.type
  ) {
    e.stopPropagation();
  }
};

/** @inheritDoc */
npf.ui.pagePaginator.Dragger.prototype.defaultAction = function(x, y) {
  /** @type {number} */
  var left;

  if (
    (this.isLeftLimit_ && 0 < x) ||
    (this.isRightLimit_ && 0 > x)
  ) {
    left = x / 2;
  } else {
    left = x;
  }

  this.target.style.left = left + 'px';
};

/**
 * @return {boolean}
 */
npf.ui.pagePaginator.Dragger.prototype.isLeftLimit = function() {
  return this.isLeftLimit_;
};

/**
 * @param {boolean} limit
 */
npf.ui.pagePaginator.Dragger.prototype.setLeftLimit = function(limit) {
  this.isLeftLimit_ = limit;
};

/**
 * @return {boolean}
 */
npf.ui.pagePaginator.Dragger.prototype.isRightLimit = function() {
  return this.isRightLimit_;
};

/**
 * @param {boolean} limit
 */
npf.ui.pagePaginator.Dragger.prototype.setRightLimit = function(limit) {
  this.isRightLimit_ = limit;
};
