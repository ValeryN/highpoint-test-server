goog.provide('dev.api.Xhr');

goog.require('goog.Uri');
goog.require('goog.Uri.QueryData');
goog.require('goog.net.EventType');
goog.require('goog.net.HttpStatus');
goog.require('npf.net.XhrIo2');
goog.require('npf.string');


/**
 * @constructor
 */
dev.api.Xhr = function() {

  /**
   * @private {function(!dev.api.Xhr)?}
   */
  this._callback = null;

  /**
   * @private {boolean}
   */
  this._canceled = false;

  /**
   * @private {boolean}
   */
  this._loaded = false;

  /**
   * Функция, возвращаемая процесс загрузки. Первый аргумент — количество
   * загруженных байт, второй — всего байт.
   * @private {function(number,number)?}
   */
  this._progressCallback = null;

  /**
   * @private {Object}
   */
  this._progressScope = null;

  /**
   * @private {Object}
   */
  this._scope = null;

  /**
   * @private {number}
   */
  this._status = 0;

  /**
   * @private {npf.net.XhrIo2}
   */
  this._xhr = null;
};


/**
 * @param {string} template
 * @param {Object=} opt_params
 * @return {!goog.Uri}
 */
dev.api.Xhr.getUri = function(template, opt_params) {
  return new goog.Uri(npf.string.supplant(template, opt_params));
};


/**
 * @return {boolean}
 */
dev.api.Xhr.prototype.cancel = function() {
  if (this._xhr) {
    this._canceled = true;
    this._callback = null;
    this._scope = null;
    this._progressCallback = null;
    this._progressScope = null;

    this._xhr.dispose();
    this._xhr = null;

    return true;
  }

  return false;
};


/**
 * @return {boolean}
 */
dev.api.Xhr.prototype.isCanceled = function() {
  return this._canceled;
};

/**
 * @return {boolean}
 */
dev.api.Xhr.prototype.isLoaded = function() {
  return this._loaded;
};

/**
 * @return {boolean}
 */
dev.api.Xhr.prototype.isLoading = function() {
  return !!this._xhr;
};

/**
 * @param {function(this:T,!dev.api.Xhr)=} opt_handler
 * @param {T=} opt_scope
 * @template T
 */
dev.api.Xhr.prototype.send = function(opt_handler, opt_scope) {
  if (opt_handler) {
    this._callback = opt_handler;
    this._scope = opt_scope || null;
  }

  this.sendInternal();
};

/**
 * @protected
 */
dev.api.Xhr.prototype.sendInternal = function() {
  this._xhr = new npf.net.XhrIo2();
  this._xhr.setWithCredentials(true);
  this._xhr.listen(goog.net.EventType.COMPLETE, this._onComplete, false, this);
  this._xhr.listen(goog.net.EventType.PROGRESS, this._onProgress, false, this);
  this._xhr.send(this.getUri(), this.getMethod(), this.getContent());
};

/**
 * @return {boolean}
 */
dev.api.Xhr.prototype.isSuccess = function() {
  return goog.net.HttpStatus.isSuccess(this._status);
};

/**
 * @param {Object} obj
 * @return {string}
 */
dev.api.Xhr.prototype.createContentFromMap = function(obj) {
  return obj ? goog.Uri.QueryData.createFromMap(obj).toString() : '';
};

/**
 * @return {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string}
 */
dev.api.Xhr.prototype.getContent = function() {
  return null;
};

/**
 * @return {string}
 */
dev.api.Xhr.prototype.getMethod = function() {
  return 'GET';
};

/**
 * @param {function(this:SCOPE,number,number)} callback
 * @param {SCOPE=} opt_scope
 * @template SCOPE
 */
dev.api.Xhr.prototype.setProgressCallback = function(callback,
    opt_scope) {
  this._progressCallback = callback;
  this._progressScope = opt_scope || null;
};

/**
 * @return {number}
 */
dev.api.Xhr.prototype.getStatus = function() {
  return this._status;
};

/**
 * @param {string} template
 * @param {Object=} opt_params
 * @param {boolean=} opt_noApiPath
 * @return {!goog.Uri}
 * @protected
 */
dev.api.Xhr.prototype.generateUri = function(template, opt_params,
    opt_noApiPath) {
  return dev.api.Xhr.getUri(template, opt_params);
};

/**
 * @return {!goog.Uri}
 */
dev.api.Xhr.prototype.getUri = goog.abstractMethod;

/**
 * @param {goog.events.Event} evt
 * @private
 */
dev.api.Xhr.prototype._onComplete = function(evt) {
  /** @type {number} */
  var status = this._xhr.getStatus();
  var self = this;
  this.onComplete(this._xhr, function() {
    self.finalizeRequest(status);
  });
};

/**
 * @param {number} status
 * @protected
 */
dev.api.Xhr.prototype.finalizeRequest = function(status) {
  goog.dispose(this._xhr);
  this._xhr = null;

  this._status = status;
  this._loaded = true;

  if (this._callback) {
    this._callback.call(this._scope, this);
  }
};

/**
 * @param {npf.net.XhrIo2} xhr
 * @param {function()} resolve
 * @protected
 */
dev.api.Xhr.prototype.onComplete = function(xhr, resolve) {
  resolve();
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
dev.api.Xhr.prototype._onProgress = function(evt) {
  /** @type {Event} */
  var nativeEvent = evt.getBrowserEvent();
  var loaded = /** @type {number} */ (nativeEvent['loaded'] || 0);
  var total = /** @type {number} */ (nativeEvent['total'] || 0);

  if (this._progressCallback) {
    this._progressCallback.call(this._progressScope, loaded, total);
  }
};
