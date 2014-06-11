goog.provide('dev.developer.server.Profile');

goog.require('goog.array');
goog.require('dev.developer.ui.InnerSection');
goog.require('dev.developer.server.Section');
goog.require('dev.api.webSocket.ServerMessage');


/**
 * @param {dev.ui.scrollable.ContainerRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {dev.developer.server.Section}
 */
dev.developer.server.Profile = function(opt_renderer, opt_domHelper) {
  dev.developer.server.Profile.base(
    this, 'constructor', opt_renderer, opt_domHelper);
};
goog.inherits(dev.developer.server.Profile, dev.developer.server.Section);


/** @inheritDoc */
dev.developer.server.Profile.prototype.createDom = function() {
  dev.developer.server.Profile.base(this, 'createDom');

  /** @type {dev.developer.ui.Inner} */
  var innerContainer = this.getInnerContainer();
  var innerSection = new dev.developer.ui.InnerSection('Web Sockets');
  innerContainer.addChild(innerSection, true);

  /** @type {!Array.<goog.ui.Component>} */
  var innerItems = [
    this.createLinkItem('Обновить данные пользователя', this._onUserUpdate)
  ];

  goog.array.forEach(innerItems, function(innerItem) {
    innerSection.addChild(innerItem, true);
  });
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
dev.developer.server.Profile.prototype._onUserUpdate = function(evt) {
  this.send(dev.api.webSocket.ServerMessage.ME_UPDATE);
};
