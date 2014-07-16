goog.provide('napp.social.Facebook');
goog.provide('napp.social.Facebook.EventType');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.object');


/**
 * @param {number} appId
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.events.EventTarget}
 */
napp.social.Facebook = function(appId, opt_domHelper) {
  napp.social.Facebook.base(this, 'constructor');

  /**
   * @private {number}
   */
  this.appId_ = appId;

  /**
   * @private {boolean}
   */
  this.autoGrow_ = false;

  /**
   * @private {goog.dom.DomHelper}
   */
  this.domHelper_ = opt_domHelper || goog.dom.getDomHelper();

  /**
   * @private {boolean}
   */
  this.loaded_ = false;

  /**
   * @private {boolean}
   */
  this.loading_ = false;
};
goog.inherits(napp.social.Facebook, goog.events.EventTarget);


/**
 * @const {string}
 */
napp.social.Facebook.API_URL = '//connect.facebook.net/en_US/all.js';

/**
 * @const {string}
 */
napp.social.Facebook.ID = 'fb-root';

/**
 * @const {string}
 */
napp.social.Facebook.INIT_FUNCTION = 'fbAsyncInit';

/**
 * @const {string}
 */
napp.social.Facebook.SCRIPT_ID = 'facebook-jssdk';

/**
 * @enum {string}
 */
napp.social.Facebook.EventType = {
  LOAD: goog.events.getUniqueId('load'),
  LOAD_ERROR: goog.events.getUniqueId('loadError')
};


/** @inheritDoc */
napp.social.Facebook.prototype.disposeInternal = function() {
  napp.social.Facebook.base(this, 'disposeInternal');

  this.domHelper_ = null;
};

/**
 * @return {boolean}
 */
napp.social.Facebook.prototype.isLoaded = function() {
  return this.loaded_;
};

napp.social.Facebook.prototype.load = function() {
  if (!this.loading_ && !this.loaded_) {
    this.loading_ = true;
    this.loadInternal();
  }
};

/**
 * @protected
 */
napp.social.Facebook.prototype.loadInternal = function() {
  this.domHelper_.getWindow()[napp.social.Facebook.INIT_FUNCTION] =
    goog.bind(this.onLoad_, this);

  /** @type {!Element} */
  var fbElement = this.domHelper_.createDom(goog.dom.TagName.DIV, {
    'id': napp.social.Facebook.ID
  });
  /** @type {Element} */
  var scriptElement = this.domHelper_.createDom(goog.dom.TagName.SCRIPT, {
    'async': true,
    'id': napp.social.Facebook.SCRIPT_ID,
    'src': napp.social.Facebook.API_URL
  });
  /** @type {Element} */
  var bodyElement = this.domHelper_.getDocument().body;

  this.domHelper_.appendChild(bodyElement, fbElement);
  this.domHelper_.appendChild(bodyElement, scriptElement);
};

/**
 * @return {Object}
 */
napp.social.Facebook.prototype.getApplication = function() {
  return this.domHelper_.getWindow()['FB'];
};

/**
 * @return {number}
 */
napp.social.Facebook.prototype.getApplicationId = function() {
  return this.appId_;
};

/**
 * @return {boolean}
 */
napp.social.Facebook.prototype.isAutoGrow = function() {
  return this.autoGrow_;
};

/**
 * @param {boolean} isAutoGrow
 */
napp.social.Facebook.prototype.setAutoGrow = function(isAutoGrow) {
  if (this.autoGrow_ != isAutoGrow) {
    this.autoGrow_ = isAutoGrow;

    /** @type {Object} */
    var application = this.getApplication();

    if (application) {
      application['Canvas']['setAutoGrow'](this.autoGrow_);
    }
  }
};

/**
 * @return {!Object}
 * @protected
 */
napp.social.Facebook.prototype.getInitParams = function() {
  return {
    'appId': this.appId_,
    'cookie': true,
    'status': true,
    'xfbml': true
  };
};

/**
 * @private
 */
napp.social.Facebook.prototype.onLoad_ = function() {
  if (!this.isDisposed()) {
    goog.object.remove(
      this.domHelper_.getWindow(), napp.social.Facebook.INIT_FUNCTION);

    this.loading_ = false;
    this.loaded_ = true;

    /** @type {Object} */
    var application = this.getApplication();

    if (application) {
      if (this.autoGrow_) {
        application['Canvas']['setAutoGrow']();
      }

      /** @type {!Object} */
      var params = this.getInitParams();
      application['init'](params);

      this.dispatchEvent(napp.social.Facebook.EventType.LOAD);
    } else {
      this.dispatchEvent(napp.social.Facebook.EventType.LOAD_ERROR);
    }
  }
};
