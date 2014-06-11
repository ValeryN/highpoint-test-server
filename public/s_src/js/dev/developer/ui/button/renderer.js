goog.provide('dev.developer.ui.button.Renderer');

goog.require('goog.math.Coordinate');
goog.require('goog.math.Size');
goog.require('goog.style');
goog.require('npf.ui.StatedRenderer');


/**
 * @constructor
 * @extends {npf.ui.StatedRenderer}
 */
dev.developer.ui.button.Renderer = function() {
  dev.developer.ui.button.Renderer.base(this, 'constructor');
};
goog.inherits(dev.developer.ui.button.Renderer, npf.ui.StatedRenderer);
goog.addSingletonGetter(dev.developer.ui.button.Renderer);


/**
 * @type {string}
 */
dev.developer.ui.button.Renderer.CSS_CLASS =
  goog.getCssName('devPanel-button');


/** @inheritDoc */
dev.developer.ui.button.Renderer.prototype.getCssClass = function() {
  return dev.developer.ui.button.Renderer.CSS_CLASS;
};

/** @inheritDoc */
dev.developer.ui.button.Renderer.prototype.createDom = function(component) {
  /** @type {Element} */
  var element = dev.developer.ui.button.Renderer.base(
    this, 'createDom', component);
  /** @type {Element} */
  var contentElement = this.getContentElement(element);

  if (contentElement) {
    contentElement.innerHTML = component.getContent();
  }

  return element;
};

/**
 * @param {dev.developer.ui.Button} button
 * @param {string} content
 */
dev.developer.ui.button.Renderer.prototype.setContent = function(button,
    content) {
  /** @type {Element} */
  var contentElement = button.getContentElement();

  if (contentElement) {
    contentElement.innerHTML = content;
  }
};

/**
 * @param {dev.developer.ui.Button} button
 * @param {number} x
 * @param {number} y
 * @param {goog.math.Rect} viewportSize
 * @return {number}
 */
dev.developer.ui.button.Renderer.prototype.getPosition = function(button, x, y,
    viewportSize) {
  var dot = new goog.math.Coordinate(x, y);
  /** @type {number} */
  var dot1X;
  /** @type {number} */
  var dot2X;
  /** @type {number} */
  var dot2Y;

  if (viewportSize.width > viewportSize.height) {
    dot1X = Math.round(viewportSize.height / 2);
    dot2X = Math.round(viewportSize.width - dot1X);
    dot2Y = dot1X;
  } else {
    dot1X = Math.round(viewportSize.width / 2);
    dot2X = dot1X;
    dot2Y = Math.round(viewportSize.height - dot1X);
  }

  var ltDot = new goog.math.Coordinate(0, 0);
  var rtDot = new goog.math.Coordinate(viewportSize.width, 0);
  var rbDot = new goog.math.Coordinate(viewportSize.width, viewportSize.height);
  var lbDot = new goog.math.Coordinate(0, viewportSize.height);
  var lcDot = new goog.math.Coordinate(dot1X, dot1X);
  var rcDot = new goog.math.Coordinate(dot2X, dot2Y);
  var position;

  if (this._into(dot, [ltDot, rtDot, rcDot, lcDot])) {
    // top
    position = dot.x / viewportSize.width;
  } else if (this._into(dot, [rtDot, rbDot, rcDot])) {
    // right
    position = 1 + dot.y / viewportSize.height;
  } else if (this._into(dot, [rbDot, lbDot, lcDot, rcDot])) {
    // bottom
    position = 2 + (1 - dot.x / viewportSize.width);
  } else {
    // left
    position = 3 + (1 - dot.y / viewportSize.height);
  }

  return position;
};

/**
 * @param {goog.math.Coordinate} dot
 * @param {Array.<goog.math.Coordinate>} dots
 */
dev.developer.ui.button.Renderer.prototype._into = function(dot, dots) {
  /** @type {number} */
  var counter = 0;

  for (var i = 0; i < dots.length; i++) {
    /** @type {goog.math.Coordinate} */
    var curDot = dots[i];
    /** @type {goog.math.Coordinate} */
    var nextDot = dots[(i + 1) % dots.length];
    /** @type {number} */
    var toY = Math.max(curDot.y, nextDot.y);
    /** @type {number} */
    var fromY = Math.min(curDot.y, nextDot.y);
    /** @type {number} */
    var wrkx = curDot.x;

    if (nextDot.y - curDot.y) {
      wrkx +=
        (nextDot.x - curDot.x) * (dot.y - curDot.y) / (nextDot.y - curDot.y);
    }

    if (toY >= dot.y && fromY < dot.y) {
      if (0.00001 > Math.abs(dot.x - wrkx)) {
        return true;
      }

      if (dot.x > wrkx) {
        counter++;
      }
    }

    if (
      0.00001 > Math.abs(dot.y - fromY) &&
      0.00001 > Math.abs(toY - fromY) &&
      0.00001 > Math.abs(
        Math.abs(wrkx - curDot.x) + Math.abs(wrkx - nextDot.x) -
        Math.abs(curDot.x - nextDot.x)
      )
    ) {
      return true;
    }
  }

  return !!(counter % 2);
};

/**
 * @param {dev.developer.ui.Button} button
 * @param {number} position
 */
dev.developer.ui.button.Renderer.prototype.setPosition = function(button,
    position) {
  /** @type {Element} */
  var element = button.getElement();

  if (element) {
    /** @type {string} */
    var bottom = '';
    /** @type {string} */
    var left = '';
    /** @type {string} */
    var right = '';
    /** @type {string} */
    var top = '';

    if (1 >= position) {
      // top
      left = (position * 100).toFixed(3) + '%';
      top = '0px';
    } else if (2 >= position) {
      // right
      right = '0px';
      top = ((position - 1) * 100).toFixed(3) + '%';
    } else if (3 >= position) {
      // bottom
      bottom = '0px';
      left = ((3 - position) * 100).toFixed(3) + '%';
    } else {
      // left
      left = '0px';
      top = ((4 - position) * 100).toFixed(3) + '%';
    }

    goog.style.setStyle(element, {
      'bottom': bottom,
      'left': left,
      'right': right,
      'top': top
    });
  }
};

/**
 * @param {Element} element
 * @return {!goog.math.Size}
 */
dev.developer.ui.button.Renderer.prototype.getSize = function(element) {
  if (element) {
    return goog.style.getBorderBoxSize(element);
  }

  return new goog.math.Size(0, 0);
};

/**
 * @param {dev.developer.ui.Button} button
 * @return {!goog.math.Size}
 */
dev.developer.ui.button.Renderer.prototype.getViewportSize = function(button) {
  return button.getDomHelper().getViewportSize();
};
