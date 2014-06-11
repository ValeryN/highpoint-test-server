goog.provide('dev.developer.Storage');

goog.require('goog.Disposable');
goog.require('goog.Timer');
goog.require('goog.math.Rect');
goog.require('goog.storage.Storage');
goog.require('goog.storage.mechanism.HTML5LocalStorage');


/**
 * @constructor
 * @extends {goog.Disposable}
 */
dev.developer.Storage = function() {
  dev.developer.Storage.base(this, 'constructor');

  /**
   * @private {boolean}
   */
  this._changed = false;

  /**
   * @private {number}
   */
  this._clientButtonPosition = 0.25;

  /**
   * @private {goog.math.Rect}
   */
  this._clientContainerRect = new goog.math.Rect(0, 0, 500, 300);

  /**
   * @private {boolean}
   */
  this._clientContainerVisible = false;

  /**
   * @private {number}
   */
  this._serverButtonPosition = 0.7;

  /**
   * @private {goog.math.Rect}
   */
  this._serverContainerRect = new goog.math.Rect(0, 0, 500, 300);

  /**
   * @private {boolean}
   */
  this._serverContainerVisible = false;

  var mechanism = new goog.storage.mechanism.HTML5LocalStorage();

  /**
   * @private {goog.storage.Storage}
   */
  this._storage = new goog.storage.Storage(mechanism);
  this.parseStorageData(this._storage.get(dev.developer.Storage.STORAGE_KEY));

  /**
   * @private {number}
   */
  this._updateTimerId = 0;
};
goog.inherits(dev.developer.Storage, goog.Disposable);


/**
 * @const {string}
 */
dev.developer.Storage.STORAGE_KEY = 'developer';


/** @inheritDoc */
dev.developer.Storage.prototype.disposeInternal = function() {
  this.update();

  dev.developer.Storage.base(this, 'disposeInternal');

  this._clientContainerRect = null;
  this._serverContainerRect = null;
  this._storage = null;
};

/**
 * @return {number}
 */
dev.developer.Storage.prototype.getClientButtonPosition = function() {
  return this._clientButtonPosition;
};

/**
 * @param {number} position
 */
dev.developer.Storage.prototype.setClientButtonPosition = function(position) {
  if (this._clientButtonPosition !== position) {
    this._clientButtonPosition = position;
    this._updateDelay();
  }
};

/**
 * @return {goog.math.Rect}
 */
dev.developer.Storage.prototype.getClientContainerRect = function() {
  return this._clientContainerRect;
};

/**
 * @param {!goog.math.Rect} rect
 */
dev.developer.Storage.prototype.setClientContainerRect = function(rect) {
  if (!goog.math.Rect.equals(this._clientContainerRect, rect)) {
    this._clientContainerRect = rect;
    this._updateDelay();
  }
};

/**
 * @return {boolean}
 */
dev.developer.Storage.prototype.isClientContainerVisible = function() {
  return this._clientContainerVisible;
};

/**
 * @param {boolean} visible
 */
dev.developer.Storage.prototype.setClientContainerVisible = function(visible) {
  if (this._clientContainerVisible !== visible) {
    this._clientContainerVisible = visible;
    this._updateDelay();
  }
};

/**
 * @return {number}
 */
dev.developer.Storage.prototype.getServerButtonPosition = function() {
  return this._serverButtonPosition;
};

/**
 * @param {number} position
 */
dev.developer.Storage.prototype.setServerButtonPosition = function(position) {
  if (this._serverButtonPosition !== position) {
    this._serverButtonPosition = position;
    this._updateDelay();
  }
};

/**
 * @return {goog.math.Rect}
 */
dev.developer.Storage.prototype.getServerContainerRect = function() {
  return this._serverContainerRect;
};

/**
 * @param {!goog.math.Rect} rect
 */
dev.developer.Storage.prototype.setServerContainerRect = function(rect) {
  if (!goog.math.Rect.equals(this._serverContainerRect, rect)) {
    this._serverContainerRect = rect;
    this._updateDelay();
  }
};

/**
 * @return {boolean}
 */
dev.developer.Storage.prototype.isServerContainerVisible = function() {
  return this._serverContainerVisible;
};

/**
 * @param {boolean} visible
 */
dev.developer.Storage.prototype.setServerContainerVisible = function(visible) {
  if (this._serverContainerVisible !== visible) {
    this._serverContainerVisible = visible;
    this._updateDelay();
  }
};

/**
 * @param {*} data
 * @protected
 */
dev.developer.Storage.prototype.parseStorageData = function(data) {
  if (goog.isObject(data)) {
    var client = data['client'];
    var server = data['server'];

    if (goog.isObject(client)) {
      var clientButtonJson = this._getButtonJson(client);
      var clientContainerJson = this._getContainerJson(client);

      if (clientButtonJson) {
        var clientButtonPosition = this._getButtonPosition(clientButtonJson);

        if (goog.isNumber(clientButtonPosition)) {
          this._clientButtonPosition = clientButtonPosition;
        }
      }

      if (clientContainerJson) {
        this._clientContainerRect =
          this._getContainerRect(clientContainerJson) ||
            this._clientContainerRect;
        this._clientContainerVisible =
          this._getContainerVisible(clientContainerJson);
      }
    }

    if (goog.isObject(server)) {
      var serverButtonJson = this._getButtonJson(server);
      var serverContainerJson = this._getContainerJson(server);

      if (serverButtonJson) {
        var serverButtonPosition = this._getButtonPosition(serverButtonJson);

        if (goog.isNumber(serverButtonPosition)) {
          this._serverButtonPosition = serverButtonPosition;
        }
      }

      if (serverContainerJson) {
        this._serverContainerRect =
          this._getContainerRect(serverContainerJson) ||
            this._serverContainerRect;
        this._serverContainerVisible =
          this._getContainerVisible(serverContainerJson);
      }
    }
  }
};

/**
 * @param {Object} json
 * @return {Object}
 * @private
 */
dev.developer.Storage.prototype._getButtonJson = function(json) {
  var jsonButton = json['button'];

  return goog.isObject(jsonButton) ? jsonButton : null;
};

/**
 * @param {Object} jsonButton
 * @return {number?}
 * @private
 */
dev.developer.Storage.prototype._getButtonPosition = function(jsonButton) {
  var position = jsonButton['position'];

  if (goog.isNumber(position)) {
    return position;
  }

  return null;
};

/**
 * @param {Object} json
 * @return {Object}
 * @private
 */
dev.developer.Storage.prototype._getContainerJson = function(json) {
  var jsonContainer = json['container'];

  return goog.isObject(jsonContainer) ? jsonContainer : null;
};

/**
 * @param {Object} container
 * @return {goog.math.Rect}
 * @private
 */
dev.developer.Storage.prototype._getContainerRect = function(container) {
  var left = container['left'];
  var top = container['top'];
  var width = container['width'];
  var height = container['height'];

  if (
    goog.isNumber(left) && 0 <= left &&
    goog.isNumber(top) && 0 <= top &&
    goog.isNumber(width) && 0 < width &&
    goog.isNumber(height) && 0 < height
  ) {
    return new goog.math.Rect(left, top, width, height);
  }

  return null;
};

/**
 * @param {Object} container
 * @return {boolean}
 * @private
 */
dev.developer.Storage.prototype._getContainerVisible = function(container) {
  return !!container['visible'];
};

dev.developer.Storage.prototype.update = function() {
  goog.Timer.clear(this._updateTimerId);

  if (this._changed) {
    this._storage.set(dev.developer.Storage.STORAGE_KEY, this.toJson());
  }
};

/**
 * @return {!Object}
 */
dev.developer.Storage.prototype.toJson = function() {
  return {
    'client': {
      'button': {
        'position': this._clientButtonPosition
      },
      'container': {
        'visible': this._clientContainerVisible,
        'left': this._clientContainerRect.left,
        'top': this._clientContainerRect.top,
        'width': this._clientContainerRect.width,
        'height': this._clientContainerRect.height
      }
    },
    'server': {
      'button': {
        'position': this._serverButtonPosition
      },
      'container': {
        'visible': this._serverContainerVisible,
        'left': this._serverContainerRect.left,
        'top': this._serverContainerRect.top,
        'width': this._serverContainerRect.width,
        'height': this._serverContainerRect.height
      }
    }
  };
};

/**
 * @private
 */
dev.developer.Storage.prototype._updateDelay = function() {
  this._changed = true;

  goog.Timer.clear(this._updateTimerId);
  this._updateTimerId = goog.Timer.callOnce(this.update, 0, this);
};
