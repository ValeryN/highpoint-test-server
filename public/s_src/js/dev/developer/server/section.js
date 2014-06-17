goog.provide('dev.developer.server.Section');
goog.provide('dev.developer.server.SectionSettingEvent');

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.object');
goog.require('npf.net.XhrIo2');
goog.require('dev.developer.ui.Inner');
goog.require('dev.developer.ui.InnerItem');
goog.require('dev.developer.ui.InnerSection');
goog.require('dev.developer.ui.RadioGroupItem');
goog.require('dev.developer.ui.Section');
goog.require('devi');


/**
 * @param {dev.ui.scrollable.ContainerRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {dev.developer.ui.Section}
 */
dev.developer.server.Section = function(opt_renderer, opt_domHelper) {
  dev.developer.server.Section.base(
    this, 'constructor', opt_renderer, opt_domHelper);

  /**
   * @private {dev.developer.ui.Inner}
   */
  this._innerContainer = null;

  /**
   * @private {Array.<dev.dataTypes.ServerSetting>}
   */
  this._settings = null;

  /**
   * @type {Object.<dev.dataTypes.ServerSetting.Type,*>}
   * @private
   */
  this._settingValuesMap = null;
};
goog.inherits(dev.developer.server.Section, dev.developer.ui.Section);


/**
 * @enum {string}
 */
dev.developer.server.Section.EventType = {
  SETTING_UPDATE: goog.events.getUniqueId('settingUpdate')
};


/** @inheritDoc */
dev.developer.server.Section.prototype.createDom = function() {
  dev.developer.server.Section.base(this, 'createDom');

  this._innerContainer = new dev.developer.ui.Inner();
  this.addChild(this._innerContainer, true);

  if (this._settings) {
    this.applySettings(this._settings, this._settingValuesMap);
  }
};

/** @inheritDoc */
dev.developer.server.Section.prototype.disposeInternal = function() {
  dev.developer.server.Section.base(this, 'disposeInternal');

  this._settings = null;
  this._settingValuesMap = null;
  this._innerContainer = null;
};

/**
 * @param {dev.api.webSocket.ServerMessage} action
 * @param {Object=} opt_data
 */
dev.developer.server.Section.prototype.send = function(action, opt_data) {
  var content = new goog.Uri.QueryData();
  content.set('action', action);

  if (opt_data) {
    goog.object.forEach(opt_data, function(value, key) {
      content.set(key, value);
    });
  }

  npf.net.XhrIo2.send(devi.SERVER_PATH + '/developer/send',
    goog.nullFunction, 'POST', content.toString());
};

/**
 * @return {dev.developer.ui.Inner}
 */
dev.developer.server.Section.prototype.getInnerContainer = function() {
  return this._innerContainer;
};

/**
 * @param {Array.<dev.dataTypes.ServerSetting>} settings
 * @param {Object.<dev.dataTypes.ServerSetting.Type,*>} valuesMap
 */
dev.developer.server.Section.prototype.setSettings = function(settings,
    valuesMap) {
  this._settings = settings;

  var map = {};

  goog.array.forEach(this._settings, function(setting) {
    if (goog.isDef(valuesMap[setting.type])) {
      map[setting.type] = valuesMap[setting.type];
    } else {
      map[setting.type] = setting.options[0].value;
    }
  }, this);

  this._settingValuesMap = map;

  this.applySettings(this._settings, this._settingValuesMap);
};

/**
 * @param {Array.<dev.dataTypes.ServerSetting>} settings
 * @param {Object.<dev.dataTypes.ServerSetting.Type,*>} valuesMap
 * @protected
 */
dev.developer.server.Section.prototype.applySettings = function(settings,
    valuesMap) {
  if (this._innerContainer) {
    var innerSection = new dev.developer.ui.InnerSection(
      'Настройки выдачи HTTP запросов');
    this._innerContainer.addChild(innerSection, true);

    goog.array.forEach(settings, function(setting) {
      /** @type {number} */
      var selectedIndex = 0;
      var options = /** @type {Array.<dev.developer.ui.RadioGroupItem.Option>} */ (
        goog.array.map(setting.options, function(option, index) {
          if (option.value === valuesMap[setting.type]) {
            selectedIndex = index;
          }

          return {
            key: option.name,
            value: String(option.value)
          };
        }, this)
      );

      var item = new dev.developer.ui.RadioGroupItem(
        setting.name, options, selectedIndex);
      item.listen(dev.developer.ui.InnerItem.EventType.CHECK, function(evt) {
        this.setOption(
          setting.type, setting.options[item.getSelectedIndex()].value);
      }, false, this);
      innerSection.addChild(item, true);
    }, this);
  }
};

/**
 * @param {dev.dataTypes.ServerSetting.Type} type
 * @param {*} value
 */
dev.developer.server.Section.prototype.setOption = function(type, value) {
  var event = new dev.developer.server.SectionSettingEvent(type, value);
  this.dispatchEvent(event);
};


/**
 * @param {dev.dataTypes.ServerSetting.Type} type
 * @param {*} value
 * @constructor
 * @extends {goog.events.Event}
 */
dev.developer.server.SectionSettingEvent = function(type, value) {
  dev.developer.server.SectionSettingEvent.base(
    this, 'constructor', dev.developer.server.Section.EventType.SETTING_UPDATE);

  /**
   * @type {dev.dataTypes.ServerSetting.Type}
   */
  this.settingType = type;

  /**
   * @type {*}
   */
  this.value = value;
};
goog.inherits(dev.developer.server.SectionSettingEvent, goog.events.Event);
