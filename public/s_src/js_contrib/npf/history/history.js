goog.provide('npf.History');
goog.provide('npf.History.EventType');

goog.require('goog.History');
goog.require('goog.Uri');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');
goog.require('goog.history.EventType');
goog.require('goog.history.Html5History');
goog.require('npf.history.TokenTransformer');



/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
npf.History = function() {
  npf.History.base(this, 'constructor');

  /**
   * @private {goog.History}
   */
  this.history_ = null;

  /**
   * @private {goog.history.Html5History}
   */
  this.html5History_ = null;

  /**
   * @private {boolean}
   */
  this.isLinksHandlerEnabled_ = false;

  if (npf.History.isHtml5HistorySupported) {
    this.html5History_ = new goog.history.Html5History(
      null, new npf.history.TokenTransformer());
    this.html5History_.setPathPrefix('');
    this.html5History_.setParentEventTarget(this);
    this.html5History_.setUseFragment(false);
    this.registerDisposable(this.html5History_);
  } else {
    this.history_ = new goog.History();
    this.history_.setParentEventTarget(this);
    this.registerDisposable(this.history_);
  }
};
goog.inherits(npf.History, goog.events.EventTarget);


/**
 * @define {boolean}
 */
goog.define('npf.History.ASSUME_HTML5', false);

/**
 * @enum {string}
 */
npf.History.EventType = {
  NAVIGATE: goog.history.EventType.NAVIGATE
};

/**
 * @type {string}
 */
npf.History.EXTERNAL_CSS_CLASS = goog.getCssName('external');

/**
 * @type {boolean}
 */
npf.History.isHtml5HistorySupported =
  npf.History.ASSUME_HTML5 || goog.history.Html5History.isSupported();


/** @inheritDoc */
npf.History.prototype.disposeInternal = function() {
  this.setLinksHandlerEnabled(false);

  npf.History.base(this, 'disposeInternal');

  this.history_ = null;
  this.html5History_ = null;
};

/**
 * @param {boolean} enable
 */
npf.History.prototype.setEnabled = function(enable) {
  if (this.history_) {
    this.history_.setEnabled(enable);
  } else if (this.html5History_) {
    this.html5History_.setEnabled(enable);
  }

  this.setLinksHandlerEnabled(enable);
};

/**
 * @return {string}
 */
npf.History.prototype.getToken = function() {
  if (this.history_) {
    return this.history_.getToken();
  }  else {
    return this.html5History_.getToken();
  }
};

/**
 * @param {string} token
 * @param {string=} opt_title
 */
npf.History.prototype.setToken = function(token, opt_title) {
  if (this.history_) {
    return this.history_.setToken(token, opt_title);
  } else {
    return this.html5History_.setToken(token, opt_title);
  }
};

/**
 * @param {string} token
 * @param {string=} opt_title
 */
npf.History.prototype.replaceToken = function(token, opt_title) {
  if (this.history_) {
    return this.history_.replaceToken(token, opt_title);
  } else {
    return this.html5History_.replaceToken(token, opt_title);
  }
};

/**
 * @return {boolean}
 */
npf.History.prototype.isHtml5Used = function() {
  return !this.history_;
};

/**
 * @return {boolean}
 */
npf.History.prototype.isLinksHandlerEnabled = function() {
  return this.isLinksHandlerEnabled_;
};

/**
 * @param {boolean} enable
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
npf.History.prototype.setLinksHandlerEnabled = function(enable, opt_domHelper) {
  if (this.isLinksHandlerEnabled_ == enable) {
    return;
  }

  this.isLinksHandlerEnabled_ = enable;

  /** @type {!goog.dom.DomHelper} */
  var domHelper = opt_domHelper || goog.dom.getDomHelper();
  /** @type {Element} */
  var bodyElement = domHelper.getDocument().body;

  if (this.isLinksHandlerEnabled_) {
    goog.events.listen(bodyElement, goog.events.EventType.CLICK,
      this.onClick_, false, this);
  } else {
    goog.events.unlisten(bodyElement, goog.events.EventType.CLICK,
      this.onClick_, false, this);
  }
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
npf.History.prototype.onClick_ = function(evt) {
  /** @type {Node} */
  var targetElement = evt ? evt.target : null;

  if (
    targetElement &&
    !evt.getBrowserEvent().defaultPrevented &&
    !(evt.metaKey || evt.ctrlKey)
  ) {
    var element = /** @type {Element} */ (
      goog.dom.getAncestorByTagNameAndClass(targetElement, goog.dom.TagName.A));

    if (element && this.isInnerHandler(element)) {
      var uri = goog.Uri.parse(element.href);
      /** @type {string} */
      var token = uri.getPath();

      if (uri.hasQuery()) {
        token += '?' + uri.getQuery();
      }

      this.setToken(token);
      evt.preventDefault();
    }
  }
};

/**
 * @param {!Element} linkElement
 * @return {boolean}
 * @protected
 */
npf.History.prototype.isInnerHandler = function(linkElement) {
  return '_blank' != linkElement.getAttribute('target') &&
    !goog.dom.classlist.contains(linkElement, npf.History.EXTERNAL_CSS_CLASS);
};
