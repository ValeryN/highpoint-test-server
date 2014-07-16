goog.provide('npf.ui.Form');

goog.require('goog.events.EventType');
goog.require('goog.object');
goog.require('goog.ui.Control');
goog.require('npf.ui.StatedComponent');
goog.require('npf.ui.form.EventType');
goog.require('npf.ui.form.Field');
goog.require('npf.ui.form.Renderer');
goog.require('npf.ui.form.SubmitButton');


/**
 * @param {npf.ui.form.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.StatedComponent}
 */
npf.ui.Form = function(opt_renderer, opt_domHelper) {
  npf.ui.Form.base(this, 'constructor', opt_renderer ||
    npf.ui.form.Renderer.getInstance(), opt_domHelper);

  /**
   * @private {Object.<npf.ui.form.Field>}
   */
  this.fieldsMap_ = {};

  /**
   * @private {boolean}
   */
  this.prevented_ = true;

  /**
   * @type {goog.ui.Control|npf.ui.StatedComponent|npf.ui.form.SubmitButton}
   * @private
   */
  this.submitButton_ = null;

  this.setAllowTextSelection(true);
};
goog.inherits(npf.ui.Form, npf.ui.StatedComponent);


/** @inheritDoc */
npf.ui.Form.prototype.enterDocument = function() {
  npf.ui.Form.base(this, 'enterDocument');

  this.getHandler().
    listen(this.getElement(), goog.events.EventType.SUBMIT, this.onSubmit_);
};

/** @inheritDoc */
npf.ui.Form.prototype.disposeInternal = function() {
  this.setSubmitButton(null);

  npf.ui.Form.base(this, 'disposeInternal');

  this.fieldsMap_ = null;
};

/** @inheritDoc */
npf.ui.Form.prototype.addChildAt = function(child, index, opt_render) {
  npf.ui.Form.base(this, 'addChildAt', child, index, opt_render);

  if (child instanceof npf.ui.form.Field) {
    this.fieldsMap_[child.getName()] = child;
  }
};

/** @inheritDoc */
npf.ui.Form.prototype.removeChild = function(child, opt_unrender) {
  if (child) {
    var id = goog.isString(child) ? child : child.getId();
    child = this.getChild(id);

    if (child && child instanceof npf.ui.form.Field) {
      goog.object.remove(this.fieldsMap_, child.getName());
    }
  }

  return npf.ui.Form.base(this, 'removeChild', child, opt_unrender);
};

/**
 * @return {boolean}
 */
npf.ui.Form.prototype.hasErrors = function() {
  return !goog.object.every(this.fieldsMap_, function(field) {
    return !field.isError();
  }, this);
};

/**
 * @param {string} name
 * @return {npf.ui.form.Field}
 */
npf.ui.Form.prototype.getField = function(name) {
  return this.fieldsMap_[name] || null;
};

/**
 * @return {boolean}
 */
npf.ui.Form.prototype.isPrevented = function() {
  return this.prevented_;
};

/**
 * @param {boolean} prevent
 */
npf.ui.Form.prototype.setPrevented = function(prevent) {
  this.prevented_ = prevent;
};

/**
 * @return {!Object}
 */
npf.ui.Form.prototype.getRequestData = function() {
  /** @type {!Object} */
  var result = {};

  goog.object.forEach(this.fieldsMap_, function(field) {
    result[field.getName()] = field.getRequestValue();
  }, this);

  return result;
};

/**
 * @param {string} name
 * @return {*}
 */
npf.ui.Form.prototype.getRequestValue = function(name) {
  /** @type {npf.ui.form.Field|undefined} */
  var field = this.fieldsMap_[name];

  return field ? field.getRequestValue() : undefined;
};

/**
 * @return {boolean}
 */
npf.ui.Form.prototype.isSubmitEnabled = function() {
  return !!this.submitButton_ && this.submitButton_.isEnabled();
};

/**
 * @return {goog.ui.Control|npf.ui.StatedComponent|npf.ui.form.SubmitButton}
 */
npf.ui.Form.prototype.getSubmitButton = function() {
  return this.submitButton_;
};

/**
 * @param {goog.ui.Control|npf.ui.StatedComponent|npf.ui.form.SubmitButton}
 *                                                                  submitButton
 */
npf.ui.Form.prototype.setSubmitButton = function(submitButton) {
  this.submitButton_ = submitButton;
};

/**
 * @param {boolean} enable
 */
npf.ui.Form.prototype.setSubmitButtonEnabled = function(enable) {
  if (this.submitButton_) {
    this.submitButton_.setEnabled(enable);
  }
};

/**
 * @return {boolean}
 */
npf.ui.Form.prototype.isValid = function() {
  return goog.object.every(this.fieldsMap_, function(field) {
    return field.isValid();
  }, this);
};

/**
 * @param {string} name
 * @return {*}
 */
npf.ui.Form.prototype.getValue = function(name) {
  /** @type {npf.ui.form.Field|undefined} */
  var field = this.fieldsMap_[name];

  return field ? field.getValue() : undefined;
};

/**
 * @param {function(this:T,npf.ui.form.Field,number):?} f
 * @param {T=} opt_obj
 * @template T
 */
npf.ui.Form.prototype.forEachField = function(f, opt_obj) {
  /** @type {number} */
  var index = 0;
  /** @type {function(this:npf.ui.Form,goog.ui.Component)} */
  var iterateFields = function(child) {
    if (child instanceof npf.ui.form.Field) {
      f.call(opt_obj, child, index++);
    }
  };
  this.forEachChild(iterateFields, this);
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
npf.ui.Form.prototype.onSubmit_ = function(evt) {
  if (this.prevented_ && evt) {
    evt.preventDefault();
  }

  this.onSubmit();
};

/**
 * @protected
 */
npf.ui.Form.prototype.onSubmit = function() {
  this.dispatchEvent(npf.ui.form.EventType.SUBMIT);
};
