goog.provide('npf.net.FileInput');
goog.provide('npf.net.FileInput.EventType');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.events.BrowserEvent');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');
goog.require('goog.style');


/**
 * @param {Element} buttonElement
 * @param {Element=} opt_parentElement
 * @constructor
 * @extends {goog.events.EventTarget}
 */
npf.net.FileInput = function(buttonElement, opt_parentElement) {
  npf.net.FileInput.base(this, 'constructor');

  /**
   * @private {Element}
   */
  this.buttonElement_ = buttonElement;

  /**
   * @private {Element}
   */
  this.parentElement_ = opt_parentElement || this.buttonElement_;

  /**
   * @private {goog.dom.DomHelper}
   */
  this.domHelper_ = goog.dom.getDomHelper(this.parentElement_);

  /**
   * If disabled clicking on button won't do anything
   * @private {boolean}
   */
  this.enabled_ = false;

  /**
   * @private {boolean}
   */
  this.hover_ = false;

  /**
   * @private {string}
   */
  this.ext_ = '';

  /**
   * @private {string}
   */
  this.fileName_ = '';

  /**
   * @private {Element}
   */
  this.element_ = this.createElement_();

  /**
   * @private {HTMLInputElement}
   */
  this.inputElement_ = this.createInputElement_();
  goog.dom.appendChild(this.element_, this.inputElement_);
  goog.dom.appendChild(this.parentElement_, this.element_);

  /**
   * @private {goog.events.EventHandler.<!npf.net.FileInput>}
   */
  this.handler_ = new goog.events.EventHandler(this);
  this.registerDisposable(this.handler_);

  /**
   * @private {number}
   */
  this.left_ = NaN;

  /**
   * @private {number}
   */
  this.top_ = NaN;

  /**
   * @private {number}
   */
  this.width_ = NaN;

  /**
   * @private {number}
   */
  this.height_ = NaN;
};
goog.inherits(npf.net.FileInput, goog.events.EventTarget);


/**
 * @type {string}
 */
npf.net.FileInput.CSS_CLASS = goog.getCssName('npf-fileInput');

/**
 * @enum {string}
 */
npf.net.FileInput.EventType = {
  CLICK: goog.events.getUniqueId('click'),
  CHANGE: goog.events.getUniqueId('change'),
  ENTER: goog.events.getUniqueId('enter'),
  LEAVE: goog.events.getUniqueId('leave')
};

/**
 * Get file name from path.
 * @param {string} file path to file
 * @return {string}
 */
npf.net.FileInput.fileFromPath = function(file) {
  return file.replace(/.*(\/|\\)/, "");
};

/**
 * Get file extension lowercase.
 * @param {string} file name
 * @return file extenstion
 */
npf.net.FileInput.getExt = function(file) {
  return (-1 !== file.indexOf('.')) ? file.replace(/.*[.]/, '') : '';
};


/** @inheritDoc */
npf.net.FileInput.prototype.disposeInternal = function() {
  this.setEnabled(false);
  goog.dom.removeNode(this.element_);

  npf.net.FileInput.base(this, 'disposeInternal');

  this.buttonElement_ = null;
  this.domHelper_ = null;
  this.element_ = null;
  this.handler_ = null;
  this.inputElement_ = null;
  this.parentElement_ = null;
};

/**
 * @return {Element}
 */
npf.net.FileInput.prototype.getElement = function() {
  return this.element_;
};

/**
 * @return {boolean}
 */
npf.net.FileInput.prototype.isEnabled = function() {
  return this.enabled_;
};

/**
 * @param {boolean} enable
 */
npf.net.FileInput.prototype.setEnabled = function(enable) {
  if (this.enabled_ != enable) {
    this.enabled_ = enable;

    // We use visibility instead of display to fix problem with Safari 4
    // The problem is that the value of input doesn't change if it
    // has display none when user selects a file
    this.inputElement_.style.visibility = this.enabled_ ? '' : 'hidden';

    if (this.enabled_) {
      this.handler_.
        listen(this.buttonElement_, goog.events.EventType.MOUSEOVER,
          this.onMouseOver_).
        listen(this.element_, goog.events.EventType.CLICK, this.onClick_).
        listen(this.inputElement_, goog.events.EventType.CHANGE,
          this.onChange_).
        listen(this.inputElement_, goog.events.EventType.MOUSEOUT,
          this.onMouseOut_);
    } else {
      this.handler_.removeAll();
    }
  }
};

/**
 * @return {string}
 */
npf.net.FileInput.prototype.getExt = function() {
  return this.ext_;
};

/**
 * @return {string}
 */
npf.net.FileInput.prototype.getFileName = function() {
  return this.fileName_;
};

/**
 * @return {HTMLInputElement}
 */
npf.net.FileInput.prototype.getInputElement = function() {
  return this.inputElement_;
};

/**
 * @return {!HTMLInputElement}
 * @private
 */
npf.net.FileInput.prototype.createInputElement_ = function() {
  return /** @type {!HTMLInputElement} */ (
    this.domHelper_.createDom(goog.dom.TagName.INPUT, {
      'class': goog.getCssName(npf.net.FileInput.CSS_CLASS, 'input'),
      'type': 'file'
    })
  );
};

/**
 * @return {!Element}
 * @private
 */
npf.net.FileInput.prototype.createElement_ = function() {
  return this.domHelper_.createDom(
    goog.dom.TagName.DIV, npf.net.FileInput.CSS_CLASS);
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
npf.net.FileInput.prototype.onChange_ = function(evt) {
  var value = /** @type {string} */ (
    goog.dom.forms.getValue(this.inputElement_));

  // Get filename from input, required as some browsers have path instead of it.

  /** @type {string} */
  this.fileName_ = npf.net.FileInput.fileFromPath(value);
  this.ext_ = npf.net.FileInput.getExt(this.fileName_);

  var event = new goog.events.BrowserEvent(evt.getBrowserEvent());
  event.type = npf.net.FileInput.EventType.CHANGE;
  this.dispatchEvent(event);
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
npf.net.FileInput.prototype.onClick_ = function(evt) {
  goog.dom.forms.setValue(this.inputElement_, '');

  var event = new goog.events.BrowserEvent(evt.getBrowserEvent());
  event.type = npf.net.FileInput.EventType.CLICK;
  this.dispatchEvent(event);
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
npf.net.FileInput.prototype.onMouseOut_ = function(evt) {
  if (this.hover_) {
    this.hover_ = false;

    // We use visibility instead of display to fix problem with Safari 4
    // The problem is that the value of input doesn't change if it
    // has display none when user selects a file
    goog.style.setStyle(this.element_, 'visibility', 'hidden');
    this.dispatchEvent(npf.net.FileInput.EventType.LEAVE);
  }
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
npf.net.FileInput.prototype.onMouseOver_ = function(evt) {
  if (!this.hover_) {
    this.hover_ = true;
    goog.style.setStyle(this.element_, 'visibility', 'visible');
    this.dispatchEvent(npf.net.FileInput.EventType.ENTER);
  }

  /** @type {!goog.math.Coordinate} */
  var offset = goog.style.getRelativePosition(
    this.buttonElement_, this.parentElement_);
  /** @type {number} */
  var width = this.buttonElement_.offsetWidth;
  /** @type {number} */
  var height = this.buttonElement_.offsetHeight;

  if (offset.x != this.left_ || offset.y != this.top_) {
    this.left_ = offset.x;
    this.top_ = offset.y;
    goog.style.setPosition(this.element_, this.left_, this.top_);
  }

  if (width != this.width_ || height != this.height_) {
    this.width_ = width;
    this.height_ = height;
    goog.style.setSize(this.element_, this.width_, this.height_);
  }
};

/**
 * Checks if a mouse event (mouseover or mouseout) occured below an element.
 * @param {goog.events.BrowserEvent} evt Mouse event (should be mouseover or
 *     mouseout).
 * @param {Element} element The ancestor element.
 * @return {boolean} Whether the event has a relatedTarget (the element the
 *     mouse is coming from) and it's a descendent of element.
 * @private
 */
npf.net.FileInput.prototype.isMouseEventWithinElement_ = function(evt,
    element) {
  // If relatedTarget is null, it means there was no previous element (e.g.
  // the mouse moved out of the window).  Assume this means that the mouse
  // event was not within the element.
  return !!evt.relatedTarget && goog.dom.contains(element, evt.relatedTarget);
};
