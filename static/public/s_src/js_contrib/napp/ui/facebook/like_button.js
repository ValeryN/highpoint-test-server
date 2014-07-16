goog.provide('napp.ui.facebook.LikeButton');
goog.provide('napp.ui.facebook.LikeButton.Action');
goog.provide('napp.ui.facebook.LikeButton.ColorScheme');
goog.provide('napp.ui.facebook.LikeButton.FontFamily');
goog.provide('napp.ui.facebook.LikeButton.Layout');

goog.require('goog.dom.TagName');
goog.require('npf.ui.Component');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.Component}
 */
napp.ui.facebook.LikeButton = function(opt_domHelper) {
  napp.ui.facebook.LikeButton.base(this, 'constructor', opt_domHelper);

  /**
   * The verb to display on the button
   * @type {napp.ui.facebook.LikeButton.Action}
   */
  this.action = napp.ui.facebook.LikeButton.Action.LIKE;

  /**
   * The verb to display on the button
   * @type {napp.ui.facebook.LikeButton.ColorScheme}
   */
  this.colorScheme = napp.ui.facebook.LikeButton.ColorScheme.LIGHT;

  /**
   * The verb to display on the button
   * @type {string}
   */
  this.fontFamily = '';

  /**
   * @type {napp.ui.facebook.LikeButton.Layout}
   */
  this.layout = napp.ui.facebook.LikeButton.Layout.STANDARD;

  /**
   * The URL to like. Defaults to the current page
   * @type {string}
   */
  this.pageUrl = '';

  /**
   * Specifies whether to include a Send button with the Like button
   * @type {boolean}
   */
  this.send = false;

  /**
   * Specifies whether to display profile photos below the button
   * @type {boolean}
   */
  this.showFaces = false;

  /**
   * The width of the Like button
   * @type {number}
   */
  this.width = 450;
};
goog.inherits(napp.ui.facebook.LikeButton, npf.ui.Component);


/**
 * @const {string}
 */
napp.ui.facebook.LikeButton.CSS_CLASS = 'fb-like';

/**
 * @enum {string}
 */
napp.ui.facebook.LikeButton.Action = {
  LIKE: 'like',
  RECOMMEND: 'recommend'
};

/**
 * @enum {string}
 */
napp.ui.facebook.LikeButton.ColorScheme = {
  DARK: 'dark',
  LIGHT: 'light'
};

/**
 * @enum {string}
 */
napp.ui.facebook.LikeButton.FontFamily = {
  ARIAL: 'arial',
  LUCIDA_GRANDE: 'lucida grande',
  SEGOE_UI: 'segoe ui',
  TAHOMA: 'tahoma',
  TREBUCHET_MS: 'trebuchet ms',
  VERDANA: 'verdana'
};

/**
 * @enum {string}
 */
napp.ui.facebook.LikeButton.Layout = {
  BOX_COUNT: 'box_count',       // Displays the total number of likes above
                                // the button. Minimum width: 55 pixels.
                                // Default width: 55 pixels. Height: 65 pixels.
  BUTTON_COUNT: 'button_count', // Displays the total number of likes to the
                                // right of the button. Minimum width: 90 pixels.
                                // Default width: 90 pixels. Height: 20 pixels.
  STANDARD: 'standard' // Displays social text to the right of the button and
                       // friends' profile photos below.
                       // Minimum width: 225 pixels. Minimum increases by 40px
                       // if action is 'recommend' by and increases by 60px
                       // if send is 'true'. Default width: 450 pixels.
                       // Height: 35 pixels (without photos) or
                       // 80 pixels (with photos).
};


/** @inheritDoc */
napp.ui.facebook.LikeButton.prototype.createDom = function() {
  /** @type {!Element} */
  var element = this.getDomHelper().createDom(
    goog.dom.TagName.DIV, this.getAttrs());
  this.setElementInternal(element);
};

/**
 * @return {!Object}
 * @protected
 */
napp.ui.facebook.LikeButton.prototype.getAttrs = function() {
  /** @type {!Object} */
  var attrs = {
    'class': napp.ui.facebook.LikeButton.CSS_CLASS,
    'data-action': this.action,
    'data-colorscheme': this.colorScheme,
    'data-layout': this.layout,
    'data-width': this.width
  };

  if (this.pageUrl) {
    attrs['data-href'] = this.pageUrl;
  }

  if (this.send) {
    attrs['data-send'] = 'true';
  }

  if (this.showFaces) {
    attrs['data-show-faces'] = 'true';
  }

  if (this.fontFamily) {
    attrs['data-font'] = this.fontFamily;
  }

  return attrs;
};
