goog.provide('napp.social.Vk');

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
napp.social.Vk = function(appId, opt_domHelper) {
  napp.social.Vk.base(this, 'constructor');

  /**
   * @private {number}
   */
  this.appId_ = appId;

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

  /**
   * @type {boolean}
   */
  this.onlyWidgets = false;

};
goog.inherits(napp.social.Vk, goog.events.EventTarget);


/**
 * @const {string}
 */
napp.social.Vk.API_URL = '//vk.com/js/api/openapi.js';

/**
 * @const {string}
 */
napp.social.Vk.INIT_FUNCTION = 'vkAsyncInit';

/**
 * @enum {string}
 */
napp.social.Vk.EventType = {
  LOAD: goog.events.getUniqueId('load')
};


/** @inheritDoc */
napp.social.Vk.prototype.disposeInternal = function() {
  napp.social.Vk.base(this, 'disposeInternal');

  this.domHelper_ = null;
};

/**
 * @return {number}
 */
napp.social.Vk.prototype.getAppId = function() {
  return this.appId_;
};

/**
 * @param {boolean=} opt_noAppend
 */
napp.social.Vk.prototype.init = function(opt_noAppend) {
  if (!this.loading_ && !this.loaded_) {
    this.loading_ = true;
    this.initInternal(opt_noAppend);
  }
};

/**
 * @param {boolean=} opt_noAppend
 * @protected
 */
napp.social.Vk.prototype.initInternal = function(opt_noAppend) {
  if (opt_noAppend) {
    this.loading_ = false;
    this.loaded_ = true;
    this.init_();
  } else {
    this.domHelper_.getWindow()[napp.social.Vk.INIT_FUNCTION] =
      goog.bind(this.onLoad_, this);

    /** @type {Element} */
    var bodyElement = this.domHelper_.getDocument().body;
    /** @type {!Element} */
    var scriptElement = this.domHelper_.createDom(goog.dom.TagName.SCRIPT, {
      'src': napp.social.Vk.API_URL
    });
    this.domHelper_.appendChild(bodyElement, scriptElement);
  }
};

/**
 * @private
 */
napp.social.Vk.prototype.onLoad_ = function() {
  if (!this.isDisposed()) {
    goog.object.remove(
      this.domHelper_.getWindow(), napp.social.Vk.INIT_FUNCTION);

    this.loading_ = false;
    this.loaded_ = true;

    this.init_();
  }
};

/**
 * @private
 */
napp.social.Vk.prototype.init_ = function() {
  this.domHelper_.getWindow()['VK']['init']({
    'apiId': this.appId_,
    'onlyWidgets': this.onlyWidgets
  });

  this.dispatchEvent(napp.social.Vk.EventType.LOAD);
};

/**
 * @return {boolean}
 */
napp.social.Vk.prototype.isLoaded = function() {
  return this.loaded_;
};

napp.social.Vk.prototype.setLoaded = function() {
  this.loaded_ = true;
};
