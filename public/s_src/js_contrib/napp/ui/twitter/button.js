goog.provide('napp.ui.twitter.Button');
goog.provide('napp.ui.twitter.Button.Position');
goog.provide('napp.ui.twitter.Button.Size');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('npf.ui.Component');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.Component}
 */
napp.ui.twitter.Button = function(opt_domHelper) {
  napp.ui.twitter.Button.base(this, 'constructor', opt_domHelper);

  /**
   * @protected {string}
   */
  this.cssClass = napp.ui.twitter.Button.CSS_CLASS;

  /**
   * @type {string}
   */
  this.content = napp.ui.twitter.Button.CONTENT;

  /**
   * Count box position
   * @type {napp.ui.twitter.Button.Position}
   */
  this.countPosition = napp.ui.twitter.Button.Position.HORIZONTAL;

  /**
   * URL to which your shared URL resolves
   * Default is the url being shared
   * @type {string}
   */
  this.countUrl = '';

  /**
   * @type {boolean}
   */
  this.dnt = false;

  /**
   * Hashtags appended to tweet text
   * @type {Array.<string>}
   */
  this.hashTags = [];

  /**
   * The language for the Tweet Button
   * @type {string}
   */
  this.lang = 'en';

  /**
   * URL of the page to share
   * Default is HTTP Referrer
   * @type {string}
   */
  this.pageUrl = '';

  /**
   * Related accounts
   * @type {Array.<string>}
   */
  this.related = [];

  /**
   * @protected {string}
   */
  this.shareUrl = napp.ui.twitter.Button.SHARE_URL;

  /**
   * The size of the rendered button
   * @type {napp.ui.twitter.Button.Size}
   */
  this.size = napp.ui.twitter.Button.Size.MEDIUM;

  /**
   * Default Tweet text
   * Default is content of the <title> tag
   * @type {string}
   */
  this.text = '';

  /**
   * Screen name of the user to attribute the Tweet to
   * @type {string}
   */
  this.via = '';
};
goog.inherits(napp.ui.twitter.Button, npf.ui.Component);


/**
 * @const {string}
 */
napp.ui.twitter.Button.CSS_CLASS = 'twitter-share-button';

/**
 * @const {string}
 */
napp.ui.twitter.Button.CONTENT = 'Tweet';

/**
 * @const {string}
 */
napp.ui.twitter.Button.SHARE_URL = 'https://twitter.com/share';

/**
 * @const {string}
 */
napp.ui.twitter.Button.WIDGETS_SRC = 'https://platform.twitter.com/widgets.js';

/**
 * @enum {string}
 */
napp.ui.twitter.Button.Position = {
  HORIZONTAL: 'horizontal',
  NONE: 'none',
  VERTICAL: 'vertical'
};

/**
 * @enum {string}
 */
napp.ui.twitter.Button.Size = {
  LARGE: 'large',
  MEDIUM: 'medium'
};


/** @inheritDoc */
napp.ui.twitter.Button.prototype.createDom = function() {
  /** @type {!Element} */
  var element = this.getDomHelper().createDom(
    goog.dom.TagName.A, this.getAttrs(), this.content);
  this.setElementInternal(element);
};

/** @inheritDoc */
napp.ui.twitter.Button.prototype.enterDocument = function() {
  napp.ui.twitter.Button.base(this, 'enterDocument');

  /** @type {!Element} */
  var scriptElement = this.getDomHelper().createDom(goog.dom.TagName.SCRIPT, {
    'src': napp.ui.twitter.Button.WIDGETS_SRC
  });
  goog.dom.appendChild(this.getDomHelper().getDocument().body, scriptElement);
};

/** @inheritDoc */
napp.ui.twitter.Button.prototype.disposeInternal = function() {
  napp.ui.twitter.Button.base(this, 'disposeInternal');

  this.hashTags = null;
  this.related = null;
};

/**
 * @return {!Object.<string,string>}
 * @protected
 */
napp.ui.twitter.Button.prototype.getAttrs = function() {
  /** @type {!Object.<string,string>} */
  var attrs = {
    'href': this.shareUrl,
    'class': this.cssClass,
    'data-count': this.countPosition,
    'data-lang': this.lang,
    'data-size': this.size
  };

  if (this.pageUrl) {
    attrs['data-url'] = this.pageUrl;
  }

  if (this.via) {
    attrs['data-via'] = this.via;
  }

  if (this.text) {
    attrs['data-text'] = this.text;
  }

  if (this.related.length) {
    attrs['data-related'] = this.related.join(',');
  }

  if (this.countUrl) {
    attrs['data-counturl'] = this.countUrl;
  }

  if (this.hashTags.length) {
    attrs['data-hashtags'] = this.hashTags.join(',');
  }

  if (this.dnt) {
    attrs['data-dnt'] = 'true';
  }

  return attrs;
};
