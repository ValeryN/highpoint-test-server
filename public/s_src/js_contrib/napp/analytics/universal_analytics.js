goog.provide('napp.analytics.UniversalAnalytics');
goog.provide('napp.analytics.UniversalAnalytics.EventType');

goog.require('goog.Uri');
goog.require('goog.dom.DomHelper');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.object');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.events.EventTarget}
 */
napp.analytics.UniversalAnalytics = function(opt_domHelper) {
  napp.analytics.UniversalAnalytics.base(this, 'constructor');

  /**
   * @private {goog.dom.DomHelper}
   */
  this.domHelper_ = opt_domHelper || new goog.dom.DomHelper();

  /**
   * @private {boolean}
   */
  this.loaded_ = false;

  /**
   * @private {boolean}
   */
  this.loading_ = false;

  /**
   * @private {string}
   */
  this.vendorId_ = napp.analytics.UniversalAnalytics.VENDOR_ID;

  /**
   * @private {string}
   */
  this.vendorUrl_ = napp.analytics.UniversalAnalytics.VENDOR_URL;
};
goog.inherits(napp.analytics.UniversalAnalytics, goog.events.EventTarget);


/**
 * @const {string}
 */
napp.analytics.UniversalAnalytics.VENDOR_ID = 'ga';

/**
 * @const {string}
 */
napp.analytics.UniversalAnalytics.VENDOR_URL =
  '//www.google-analytics.com/analytics.js';

/**
 * @enum {string}
 */
napp.analytics.UniversalAnalytics.EventType = {
  LOAD: goog.events.getUniqueId('load')
};

/**
 * @param {string|goog.Uri} url
 * @param {string} utmSource Идентификатор поисковой системы или другого
 *                           источника. Примеры: google, citysearch,
 *                           newsletter4.
 * @param {string} utmMedium Идентификатор канала. Примеры: banner, email,
 *                           cost-per-click.
 * @param {string} utmCampaign Идентификатор определенного товара или
 *                          стратегической кампании. Пример: весення_распродажа.
 * @param {string=} opt_utmContent Применяется для экспериментов А/Б
 *                  и объявлений с таргетингом на контекстно-медийную сеть.
 *                  С помощью него можно различать объявления или ссылки,
 *                  ведущие на один и тот же URL. Примеры: logolink, textlink.
 * @param {string=} opt_utmTerm Ключевые слова для объявления.
 *                              Пример: бег+обувь.
 * @return {!goog.Uri}
 */
napp.analytics.UniversalAnalytics.createCampaignUri = function(url, utmSource,
    utmMedium, utmCampaign, opt_utmContent, opt_utmTerm) {
  var uri = new goog.Uri(url);
  /** @type {goog.Uri.QueryData} */
  var queryData = uri.getQueryData();
  queryData.set('utm_source', utmSource);
  queryData.set('utm_medium', utmMedium);
  queryData.set('utm_campaign', utmCampaign);

  if (opt_utmContent) {
    queryData.set('utm_content', opt_utmContent);
  }

  if (opt_utmTerm) {
    queryData.set('utm_term', opt_utmTerm);
  }

  return uri;
};


/** @inheritDoc */
napp.analytics.UniversalAnalytics.prototype.disposeInternal = function() {
  napp.analytics.UniversalAnalytics.base(this, 'disposeInternal');

  this.domHelper_ = null;
};

/**
 * @return {boolean}
 */
napp.analytics.UniversalAnalytics.prototype.isLoaded = function() {
  return this.loaded_;
};

napp.analytics.UniversalAnalytics.prototype.load = function() {
  if (!this.loaded_ && !this.loading_) {
    this.loadInternal();
  }
};

/**
 * @protected
 */
napp.analytics.UniversalAnalytics.prototype.loadInternal = function() {
  this.loading_ = true;

  /** @type {!Window} */
  var win = this.domHelper_.getWindow();
  /** @type {string} */
  var vendorId = napp.analytics.UniversalAnalytics.VENDOR_ID;

  win['GoogleAnalyticsObject'] = vendorId;

  if (!win[vendorId]) {
    win[vendorId] = function() {
      if (!win[vendorId]['q']) {
        win[vendorId]['q'] = [];
      }

      win[vendorId]['q'].push(arguments);
    };
  }

  win[vendorId]['l'] = goog.now();

  /** @type {!Element} */
  var scriptElement = this.domHelper_.createDom(goog.dom.TagName.SCRIPT, {
    'async': 1,
    'src': this.vendorUrl_
  });
  var firstScriptElement = /** @type {!Element} */ (
    this.domHelper_.getElementsByTagNameAndClass(goog.dom.TagName.SCRIPT)[0]);
  this.domHelper_.insertSiblingBefore(scriptElement, firstScriptElement);

  win[vendorId](goog.bind(this.onLoad_, this));
};

/**
 * @private
 */
napp.analytics.UniversalAnalytics.prototype.onLoad_ = function() {
  this.loading_ = false;
  this.loaded_ = true;
  this.dispatchEvent(napp.analytics.UniversalAnalytics.EventType.LOAD);
};

/**
 * @return {goog.dom.DomHelper}
 */
napp.analytics.UniversalAnalytics.prototype.getDomHelper = function() {
  return this.domHelper_;
};

/**
 * @return {Function}
 */
napp.analytics.UniversalAnalytics.prototype.getGa = function() {
  /** @type {string} */
  var vendorId = this.vendorId_;

  return this.domHelper_.getWindow()[vendorId] || null;
};

/**
 * @return {string}
 */
napp.analytics.UniversalAnalytics.prototype.getVendorId = function() {
  return this.vendorId_;
};

/**
 * @param {string} id
 */
napp.analytics.UniversalAnalytics.prototype.setVendorId = function(id) {
  this.vendorId_ = id;
};

/**
 * @return {string}
 */
napp.analytics.UniversalAnalytics.prototype.getVendorUrl = function() {
  return this.vendorUrl_;
};

/**
 * @param {string} url
 */
napp.analytics.UniversalAnalytics.prototype.setVendorUrl = function(url) {
  this.vendorUrl_ = url;
};

/**
 * @param {string} accountId
 * @param {string|Object=} opt_options
 */
napp.analytics.UniversalAnalytics.prototype.createTracker = function(
    accountId, opt_options) {
  /** @type {Function} */
  var ga = this.getGa();

  if (ga) {
    ga('create', accountId, opt_options);
  }
};

/**
 * @param {string} category   Typically the object that was interacted with
 *                            (e.g. button)
 * @param {string} action     The type of interaction (e.g. click)
 * @param {string=} opt_label Useful for categorizing events (e.g. nav buttons)
 * @param {number=} opt_value Values must be non-negative. Useful to pass counts
 *                            (e.g. 4 times)
 * @param {string=} opt_trackerName
 */
napp.analytics.UniversalAnalytics.prototype.sendEvent = function(category,
    action, opt_label, opt_value, opt_trackerName) {
  var options = {
    'hitType': 'event',
    'eventCategory': category,
    'eventAction': action
  };

  if (opt_label) {
    options['eventLabel'] = opt_label;
  }

  if (opt_value) {
    options['eventValue'] = opt_value;
  }

  this.send(options, opt_trackerName);
};

/**
 * @param {string|Object=} opt_options Url or object ('page', 'title').
 * @param {string=} opt_trackerName
 */
napp.analytics.UniversalAnalytics.prototype.sendPage = function(opt_options,
    opt_trackerName) {
  var options = {
    'hitType': 'pageview'
  };

  if (opt_options) {
    if (goog.isString(opt_options)) {
      options['page'] = opt_options;
    } else {
      goog.object.extend(options, opt_options);
    }
  }

  this.send(options, opt_trackerName);
};

/**
 * @param {Object} options
 * @param {string=} opt_trackerName
 */
napp.analytics.UniversalAnalytics.prototype.send = function(options,
    opt_trackerName) {
  /** @type {Function} */
  var ga = this.getGa();

  if (ga) {
    /** @type {string} */
    var action = 'send';

    if (opt_trackerName) {
      action = opt_trackerName + '.' + action;
    }

    ga(action, options);
  }
};

/**
 * @param {string} content
 */
napp.analytics.UniversalAnalytics.prototype.setCampaignContent = function(
    content) {
  this.setVariable('campaignContent', content);
};

/**
 * @param {string} id
 */
napp.analytics.UniversalAnalytics.prototype.setCampaignId = function(id) {
  this.setVariable('campaignId', id);
};

/**
 * @param {string} keyword
 */
napp.analytics.UniversalAnalytics.prototype.setCampaignKeyword = function(
    keyword) {
  this.setVariable('campaignKeyword', keyword);
};

/**
 * @param {string} name
 */
napp.analytics.UniversalAnalytics.prototype.setCampaignName = function(name) {
  this.setVariable('campaignName', name);
};

/**
 * @param {string} channel
 */
napp.analytics.UniversalAnalytics.prototype.setCampaignMedium = function(
    channel) {
  this.setVariable('campaignMedium', channel);
};

/**
 * @param {string} source
 */
napp.analytics.UniversalAnalytics.prototype.setCampaignSource = function(
    source) {
  this.setVariable('campaignSource', source);
};

/**
 * @param {string} url
 */
napp.analytics.UniversalAnalytics.prototype.setReferrer = function(url) {
  this.setVariable('referrer', url);
};

/**
 * @param {string} key
 * @param {string} value
 */
napp.analytics.UniversalAnalytics.prototype.setVariable = function(key, value) {
  /** @type {Function} */
  var ga = this.getGa();

  if (ga) {
    ga('set', key, value);
  }
};
