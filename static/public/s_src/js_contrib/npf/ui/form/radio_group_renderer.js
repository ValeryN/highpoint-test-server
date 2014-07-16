goog.provide('npf.ui.form.RadioGroupRenderer');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classlist');
goog.require('goog.dom.forms');
goog.require('npf.ui.form.FieldRenderer');


/**
 * @constructor
 * @extends {npf.ui.form.FieldRenderer}
 */
npf.ui.form.RadioGroupRenderer = function() {
  npf.ui.form.RadioGroupRenderer.base(this, 'constructor');
};
goog.inherits(npf.ui.form.RadioGroupRenderer, npf.ui.form.FieldRenderer);
goog.addSingletonGetter(npf.ui.form.RadioGroupRenderer);


/**
 * @type {string}
 */
npf.ui.form.RadioGroupRenderer.CSS_CLASS =
  goog.getCssName('npf-form-radioGroup');


/** @inheritDoc */
npf.ui.form.RadioGroupRenderer.prototype.setValue = function(field, value) {
  /** @type {Element} */
  var element = field.getContentElement();

  if (element) {
    var valueElements = this.getElementsByClass(
      this.getValueCssClass(), element);

    goog.array.forEach(valueElements, function(valueElement) {
      /** @type {Element} */
      var inputElement = this.getElementByClass(
        this.getValueInputCssClass(), valueElement);
      /** @type {boolean} */
      var checked = value == inputElement.value;

      goog.dom.forms.setValue(inputElement, checked);
      goog.dom.classlist.enable(
        valueElement, this.getValueCheckedCssClass(), checked);
    }, this);
  }
};

/**
 * @param {npf.ui.form.RadioGroup} field
 * @param {Array.<npf.ui.form.RadioGroup.Item>} items
 */
npf.ui.form.RadioGroupRenderer.prototype.setItems = function(field, items) {
  /** @type {Element} */
  var element = field.getContentElement();

  if (element) {
    var valueElements = this.getElementsByClass(
      this.getValueCssClass(), element);

    goog.array.forEach(valueElements, function(valueElement) {
      goog.dom.removeNode(valueElement);
    });

    goog.array.forEach(items, function(item) {
      /** @type {!Element} */
      var valueElement = this.createValueElement(field, item);
      goog.dom.appendChild(element, valueElement);
    }, this);
  }
};

/**
 * @param {npf.ui.form.RadioGroup} field
 * @param {npf.ui.form.RadioGroup.Item} item
 * @return {!Element}
 * @protected
 */
npf.ui.form.RadioGroupRenderer.prototype.createValueElement = function(field,
    item) {
  /** @type {!Element} */
  var valueElement = field.getDomHelper().createDom(
    goog.dom.TagName.DIV, this.getValueCssClass());
  /** @type {string} */
  var id = goog.ui.IdGenerator.getInstance().getNextUniqueId();
  /** @type {!Element} */
  var inputElement = field.getDomHelper().createDom(goog.dom.TagName.INPUT, {
    'class': this.getValueInputCssClass(),
    'id': id,
    'name': field.getName(),
    'type': 'radio',
    'value': item.value
  });
  /** @type {!Element} */
  var labelElement = field.getDomHelper().createDom(goog.dom.TagName.LABEL, {
    'class': this.getValueLabelCssClass(),
    'for': id,
    'name': field.getName()
  }, item.label);

  if (field.getValue() == item.value) {
    goog.dom.forms.setValue(inputElement, true);
    goog.dom.classlist.add(valueElement, this.getValueCheckedCssClass());
  }

  goog.dom.appendChild(valueElement, inputElement);
  goog.dom.appendChild(valueElement, labelElement);

  return valueElement;
};

/**
 * @return {string}
 */
npf.ui.form.RadioGroupRenderer.prototype.getFieldCssClass = function() {
  return npf.ui.form.RadioGroupRenderer.CSS_CLASS;
};

/**
 * @return {string}
 */
npf.ui.form.RadioGroupRenderer.prototype.getValueCheckedCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'value-checked');
};

/**
 * @return {string}
 */
npf.ui.form.RadioGroupRenderer.prototype.getValueInputCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'value-input');
};

/**
 * @return {string}
 */
npf.ui.form.RadioGroupRenderer.prototype.getValueLabelCssClass = function() {
  return goog.getCssName(this.getStructuralCssClass(), 'value-label');
};
