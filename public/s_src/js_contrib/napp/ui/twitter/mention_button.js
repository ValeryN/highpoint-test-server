goog.provide('napp.ui.twitter.MentionButton');

goog.require('goog.Uri');
goog.require('napp.ui.twitter.Button');


/**
 * @param {string} screenName
 * @param {goog.dom.DomHelper} opt_domHelper
 * @constructor
 * @extends {napp.ui.twitter.Button}
 */
napp.ui.twitter.MentionButton = function(screenName, opt_domHelper) {
  napp.ui.twitter.MentionButton.base(this, 'constructor', opt_domHelper);

  var uri = new goog.Uri(napp.ui.twitter.MentionButton.SHARE_URL);
  uri.getQueryData().set('screen_name', screenName);

  this.cssClass = napp.ui.twitter.MentionButton.CSS_CLASS;
  this.screenName = screenName;
  this.shareUrl = uri.toString();
};
goog.inherits(napp.ui.twitter.MentionButton, napp.ui.twitter.Button);


/**
 * @const {string}
 */
napp.ui.twitter.MentionButton.CSS_CLASS = 'twitter-mention-button';

/**
 * @const {string}
 */
napp.ui.twitter.MentionButton.SHARE_URL = 'https://twitter.com/intent/tweet';
