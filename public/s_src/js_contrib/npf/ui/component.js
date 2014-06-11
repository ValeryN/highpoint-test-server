goog.provide('npf.ui.Component');

goog.require('goog.array');
goog.require('goog.ui.Component');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
npf.ui.Component = function(opt_domHelper) {
  npf.ui.Component.base(this, 'constructor', opt_domHelper);

  /**
   * @private {Array.<goog.Disposable>}
   */
  this.disposeOnExitDocument_ = null;
};
goog.inherits(npf.ui.Component, goog.ui.Component);


/** @inheritDoc */
npf.ui.Component.prototype.exitDocument = function() {
  npf.ui.Component.base(this, 'exitDocument');

  if (this.disposeOnExitDocument_) {
    goog.array.forEach(this.disposeOnExitDocument_, function(obj) {
      obj.dispose();
    }, this);
  }

  this.disposeOnExitDocument_ = null;
};

/** @inheritDoc */
npf.ui.Component.prototype.disposeInternal = function() {
  npf.ui.Component.base(this, 'disposeInternal');

  this.disposeOnExitDocument_ = null;
};

/**
 * @param {goog.Disposable} obj
 * @protected
 */
npf.ui.Component.prototype.disposeOnExitDocument = function(obj) {
  if (!this.disposeOnExitDocument_) {
    this.disposeOnExitDocument_ = [];
  }

  this.disposeOnExitDocument_.push(obj);
};
