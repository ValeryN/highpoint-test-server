goog.provide('dev.panel.TabSection');
goog.provide('dev.panel.TabSection.EventType');
goog.provide('dev.panel.TabSectionSettingEvent');

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('npf.ui.SimpleComponent');
goog.require('npf.ui.scrollable.Container');
goog.require('dev.api.xhr.ActionSend');
goog.require('dev.dataTypes.Option.Type');
goog.require('dev.panel.InnerSection');
goog.require('dev.panel.Link');
goog.require('dev.panel.Link.EventType');
goog.require('dev.panel.Radio');
goog.require('dev.panel.Radio.EventType');


/**
 * @param {dev.dataTypes.Tab} tab
 * @param {Object} valuesMap
 * @param {npf.ui.scrollable.ContainerRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.scrollable.Container}
 */
dev.panel.TabSection = function(tab, valuesMap, opt_renderer, opt_domHelper) {
  dev.panel.TabSection.base(this, 'constructor', opt_renderer, opt_domHelper);

  /**
   * @private {dev.dataTypes.Tab}
   */
  this._settings = tab;

  /**
   * @type {Object}
   * @private
   */
  this._valuesMap = valuesMap;

  this.addClassName(dev.panel.TabSection.CSS_CLASS);
};
goog.inherits(dev.panel.TabSection, npf.ui.scrollable.Container);


/**
 * @type {string}
 */
dev.panel.TabSection.CSS_CLASS = goog.getCssName('panel-tabSection');

/**
 * @enum {string}
 */
dev.panel.TabSection.EventType = {
  SETTING_UPDATE: goog.events.getUniqueId('settingUpdate')
};

/**
 * @enum {string}
 */
dev.panel.TabSection.CssClass = {
  INNER: goog.getCssName('panel-inner')
};


/** @inheritDoc */
dev.panel.TabSection.prototype.createDom = function() {
  dev.panel.TabSection.base(this, 'createDom');

  var innerContainer =
    new npf.ui.SimpleComponent(dev.panel.TabSection.CssClass.INNER);
  this.addChild(innerContainer, true);

  goog.array.forEach(this._settings.sections, function(section) {
    var innerSection = new dev.panel.InnerSection(section.name);
    innerContainer.addChild(innerSection, true);

    goog.array.forEach(section.options, function(option) {
      /** @type {goog.ui.Component} */
      var optionContainer = null;

      switch (option.type) {
        case dev.dataTypes.Option.Type.ACTION:
          var actionOption =
            /** @type {dev.dataTypes.option.Action} */ (option);
          optionContainer = this._createActionContainer(actionOption);
          break;

        case dev.dataTypes.Option.Type.RADIO:
          var radioOption = /** @type {dev.dataTypes.option.Radio} */ (option);
          var value = this._valuesMap[option.key];
          optionContainer = this._createRadioContainer(radioOption, value);
          break;
      }

      if (optionContainer) {
        innerSection.addChild(optionContainer, true);
      }
    }, this);
  }, this);
};

/** @inheritDoc */
dev.panel.TabSection.prototype.disposeInternal = function() {
  dev.panel.TabSection.base(this, 'disposeInternal');

  this._settings = null;
  this._valuesMap = null;
};

/**
 * @param {dev.dataTypes.option.Action} option
 * @return {dev.panel.Link}
 * @private
 */
dev.panel.TabSection.prototype._createActionContainer = function(option) {
  var container = new dev.panel.Link(option);
  container.listen(dev.panel.Link.EventType.ACTION, function(evt) {
    var loader = new dev.api.xhr.ActionSend(option.value);
    loader.send();
  }, false, this);

  return container;
};

/**
 * @param {dev.dataTypes.option.Radio} option
 * @param {*} value
 * @return {dev.panel.Radio}
 * @private
 */
dev.panel.TabSection.prototype._createRadioContainer = function(option, value) {
  var container = new dev.panel.Radio(option, value);
  container.listen(dev.panel.Radio.EventType.CHECK, function(evt) {
    var value = container.getValue();
    var event = new dev.panel.TabSectionSettingEvent(option.key, value);
    this.dispatchEvent(event);
  }, false, this);

  return container;
};


/**
 * @param {string} type
 * @param {*} value
 * @constructor
 * @extends {goog.events.Event}
 */
dev.panel.TabSectionSettingEvent = function(type, value) {
  dev.panel.TabSectionSettingEvent.base(
    this, 'constructor', dev.panel.TabSection.EventType.SETTING_UPDATE);

  /**
   * @type {string}
   */
  this.settingType = type;

  /**
   * @type {*}
   */
  this.value = value;
};
goog.inherits(dev.panel.TabSectionSettingEvent, goog.events.Event);
