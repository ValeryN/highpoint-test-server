goog.provide('npf.ui.form.TextareaRenderer');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.forms');
goog.require('npf.ui.form.FieldRenderer');


/**
 * @constructor
 * @extends {npf.ui.form.FieldRenderer}
 */
npf.ui.form.TextareaRenderer = function() {
  npf.ui.form.TextareaRenderer.base(this, 'constructor');
};
goog.inherits(npf.ui.form.TextareaRenderer, npf.ui.form.FieldRenderer);
goog.addSingletonGetter(npf.ui.form.TextareaRenderer);


/**
 * @type {string}
 */
npf.ui.form.TextareaRenderer.CSS_CLASS = goog.getCssName('npf-form-textarea');


/** @inheritDoc */
npf.ui.form.TextareaRenderer.prototype.appendContent = function(component,
    element) {
  var textareaContainer = /** @type {npf.ui.form.Textarea} */ (component);
  var properties = {
    'class': this.getValueCssClass(),
    'name': textareaContainer.getName()
  };

  /** @type {!Element} */
  var valueElement = component.getDomHelper().createDom(
    goog.dom.TagName.TEXTAREA, properties);
  goog.dom.forms.setValue(valueElement, textareaContainer.getValue());
  goog.dom.appendChild(this.getContentElement(element), valueElement);

  if (textareaContainer.isLabelEnabled()) {
    this.bindLabel(this.getLabelElement(element), valueElement);
  }
};

/**
 * @param {Element} element
 * @param {number} maxLength
 */
npf.ui.form.TextareaRenderer.prototype.setMaxLength = function(element,
    maxLength) {
  if (element) {
    if (0 <= maxLength) {
      element.maxLength = maxLength;
    } else {
      element.removeAttribute('maxLength');
    }
  }
};

/**
 * @return {string}
 */
npf.ui.form.TextareaRenderer.prototype.getFieldCssClass = function() {
  return npf.ui.form.TextareaRenderer.CSS_CLASS;
};
