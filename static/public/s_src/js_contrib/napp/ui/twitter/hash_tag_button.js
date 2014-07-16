goog.provide('napp.ui.twitter.HashTagButton');

goog.require('goog.Uri');
goog.require('napp.ui.twitter.Button');


/**
 * @param {string} buttonHashTag
 * @param {goog.dom.DomHelper} opt_domHelper
 * @constructor
 * @extends {napp.ui.twitter.Button}
 */
napp.ui.twitter.HashTagButton = function(buttonHashTag, opt_domHelper) {
  napp.ui.twitter.HashTagButton.base(this, 'constructor', opt_domHelper);

  var uri = new goog.Uri(napp.ui.twitter.HashTagButton.SHARE_URL);
  uri.getQueryData().set('button_hashtag', buttonHashTag);

  this.cssClass = napp.ui.twitter.HashTagButton.CSS_CLASS;
  this.shareUrl = uri.toString();
};
goog.inherits(napp.ui.twitter.HashTagButton, napp.ui.twitter.Button);


/**
 * @const {string}
 */
napp.ui.twitter.HashTagButton.CSS_CLASS = 'twitter-hashtag-button';

/**
 * @const {string}
 */
napp.ui.twitter.HashTagButton.SHARE_URL = 'https://twitter.com/intent/tweet';
