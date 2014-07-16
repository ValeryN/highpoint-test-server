goog.provide('napp.analytics.GoogleAnalytics');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.events.EventTarget');


/**
 * @param {string} accountId
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.events.EventTarget}
 */
napp.analytics.GoogleAnalytics = function(accountId, opt_domHelper) {
  napp.analytics.GoogleAnalytics.base(this, 'constructor');

  /**
   * @private {string}
   */
  this.accountId_ = accountId;

  /**
   * @private {goog.dom.DomHelper}
   */
  this.domHelper_ = opt_domHelper || goog.dom.getDomHelper();

  /**
   * @private {boolean}
   */
  this.loaded_ = false;
};
goog.inherits(napp.analytics.GoogleAnalytics, goog.events.EventTarget);


/**
 * @const {string}
 */
napp.analytics.GoogleAnalytics.ID = '_gaq';

/**
 * @enum {string}
 */
napp.analytics.GoogleAnalytics.EventType = {
  LOAD: goog.events.getUniqueId('load')
};


/** @inheritDoc */
napp.analytics.GoogleAnalytics.prototype.disposeInternal = function() {
  napp.analytics.GoogleAnalytics.base(this, 'disposeInternal');

  this.domHelper_ = null;
};

/**
 * @return {boolean}
 */
napp.analytics.GoogleAnalytics.prototype.isLoaded = function() {
  return this.loaded_;
};

napp.analytics.GoogleAnalytics.prototype.init = function() {
  if (!this.loaded_) {
    this.loaded_ = true;
    this.initInternal();
    this.dispatchEvent(napp.analytics.GoogleAnalytics.EventType.LOAD);
  }
};

/**
 * @protected
 */
napp.analytics.GoogleAnalytics.prototype.initInternal = function() {
  /** @type {Object|Array} */
  var ga = this.getGa();
  ga.push(['_setAccount', this.accountId_]);
  ga.push(['_trackPageview']);

  /** @type {string} */
  var src = ('https:' == this.domHelper_.getWindow().location.protocol ?
    'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  /** @type {Element} */
  var gaElement = this.domHelper_.createDom(goog.dom.TagName.SCRIPT, {
    'async': true,
    'src': src
  });
  this.domHelper_.appendChild(this.domHelper_.getDocument().body, gaElement);
};

/**
 * @return {string}
 */
napp.analytics.GoogleAnalytics.prototype.getAccountId = function() {
  return this.accountId_;
};

/**
 * @return {Object|Array}
 */
napp.analytics.GoogleAnalytics.prototype.getGa = function() {
  return this.domHelper_.getWindow()[napp.analytics.GoogleAnalytics.ID] || [];
};

/**
 * @param {string} category
 * @param {string} action
 * @param {string=} opt_label
 * @param {number=} opt_value
 */
napp.analytics.GoogleAnalytics.prototype.addEvent = function(
    category, action, opt_label, opt_value) {
  this.getGa().push(['_trackEvent', category, action, opt_label, opt_value]);
};

/**
 * @param {string} url
 */
napp.analytics.GoogleAnalytics.prototype.addPage = function(url) {
  this.getGa().push(['_trackPageview', url]);
};

/**
 * @param {string} category
 * @param {string} action
 * @param {string} value
 */
napp.analytics.GoogleAnalytics.prototype.addSocial = function(
    category, action, value) {
  this.getGa().push(['_trackSocial', category, action, value]);
};
