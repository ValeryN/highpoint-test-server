goog.provide('dev.Developer');

goog.require('goog.Disposable');
goog.require('goog.ui.Component.EventType');
goog.require('dev.developer.Storage');
goog.require('dev.developer.ui.Button');
goog.require('dev.developer.ui.Button.EventType');
goog.require('dev.developer.ui.Container.EventType');
goog.require('dev.developer.server.Container');


/**
 * @constructor
 * @extends {goog.Disposable}
 */
dev.Developer = function() {
  dev.Developer.base(this, 'constructor');

  /**
   * @private {dev.developer.ui.Button}
   */
  this._serverButton = null;

  /**
   * @private {dev.developer.ui.Container}
   */
  this._serverContainer = null;

  /**
   * @private {dev.developer.Storage}
   */
  this._storage = new dev.developer.Storage();
  this.registerDisposable(this._storage);
};
goog.inherits(dev.Developer, goog.Disposable);


/**
 * @enum {string}
 */
dev.Developer.Caption = {
  SERVER_BUTTON: 'S'
};

/**
 * @enum {string}
 */
dev.Developer.CssClass = {
  SERVER_BUTTON: goog.getCssName('developer-server-button'),
  SERVER_CONTAINER: goog.getCssName('developer-server-container')
};


/** @inheritDoc */
dev.Developer.prototype.disposeInternal = function() {
  dev.Developer.base(this, 'disposeInternal');

  this._serverButton = null;
  this._serverContainer = null;
  this._storage = null;
};

dev.Developer.prototype.init = function() {
  this._serverButton = this.createServerButton();
  this.registerDisposable(this._serverButton);
  this._serverButton.addClassName(dev.Developer.CssClass.SERVER_BUTTON);
  this._serverButton.listen(goog.ui.Component.EventType.ACTION,
    this._onServerButtonAction, false, this);
  this._serverButton.listen(dev.developer.ui.Button.EventType.REPOSITION,
    this._onServerButtonReposition, false, this);
  this._serverButton.render();

  this._serverContainer = this.createServerContainer();
  this.registerDisposable(this._serverContainer);
  this._serverContainer.addClassName(dev.Developer.CssClass.SERVER_CONTAINER);
  this._serverContainer.listen(
    dev.developer.ui.Container.EventType.REPOSITION,
    this._onServerContainerReposition, false, this
  );
  this._serverContainer.render();

  this._serverButton.setPosition(this._storage.getServerButtonPosition());
  this._serverContainer.setRect(this._storage.getServerContainerRect());
  this.setServerContainerVisibleInternal(
  this._storage.isServerContainerVisible());
};

/**
 * @return {!dev.developer.ui.Button}
 * @protected
 */
dev.Developer.prototype.createServerButton = function() {
  return new dev.developer.ui.Button(dev.Developer.Caption.SERVER_BUTTON);
};

/**
 * @return {dev.developer.ui.Button}
 */
dev.Developer.prototype.getServerButton = function() {
  return this._serverButton;
};

/**
 * @return {!dev.developer.ui.Container}
 * @protected
 */
dev.Developer.prototype.createServerContainer = function() {
  return new dev.developer.server.Container();
};

/**
 * @return {dev.developer.ui.Container}
 */
dev.Developer.prototype.getServerContainer = function() {
  return this._serverContainer;
};

/**
 * @param {boolean} visible
 */
dev.Developer.prototype.isServerContainerVisible = function(visible) {
  return this._serverContainer ? this._serverContainer.isVisible() : false;
};

/**
 * @param {boolean} visible
 */
dev.Developer.prototype.setServerContainerVisible = function(visible) {
  this.setServerContainerVisibleInternal(visible);
  this._storage.setServerContainerVisible(visible);
};

/**
 * @param {boolean} visible
 * @protected
 */
dev.Developer.prototype.setServerContainerVisibleInternal = function(visible) {
  if (this._serverContainer) {
    this._serverContainer.setVisible(visible);
  }

  if (this._serverButton) {
    this._serverButton.setChecked(visible);
  }
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
dev.Developer.prototype._onServerButtonAction = function(evt) {
  var button = /** @type {dev.developer.ui.Button} */ (evt.target);
  this.setServerContainerVisible(!button.isChecked());
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
dev.Developer.prototype._onServerButtonReposition = function(evt) {
  this._storage.setServerButtonPosition(this._serverButton.getPosition());
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
dev.Developer.prototype._onServerContainerReposition = function(evt) {
  this._storage.setServerContainerRect(this._serverContainer.getRect());
};
