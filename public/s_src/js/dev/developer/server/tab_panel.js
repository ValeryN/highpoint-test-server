goog.provide('dev.developer.server.TabPanel');
goog.provide('dev.developer.server.TabPanel.SectionType');

goog.require('goog.array');
goog.require('goog.object');
goog.require('dev.ui.tabBar.Tab');
goog.require('dev.dataTypes.ServerSetting.Type');
goog.require('dev.developer.server.Profile');
goog.require('dev.developer.server.Section');
goog.require('dev.developer.ui.TabPanel');


/**
 * @param {dev.developer.server.TabPanel.SectionType=} opt_type
 * @param {dev.ui.tabPanel.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {dev.developer.ui.TabPanel}
 */
dev.developer.server.TabPanel = function(opt_type, opt_renderer, opt_domHelper) {
  /** @type {dev.developer.server.TabPanel.SectionType} */
  var type = opt_type || dev.developer.server.TabPanel.sectionTypes[0];

  dev.developer.server.TabPanel.base(
    this, 'constructor', type, opt_renderer, opt_domHelper);

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
goog.inherits(dev.developer.server.TabPanel, dev.developer.ui.TabPanel);


/**
 * @enum {string}
 */
dev.developer.server.TabPanel.SectionType = {
  LOCATIONS: 'locations',
  ME: 'me',
  MESSAGES: 'messages',
  PHOTOS: 'photos',
  SETTINGS: 'settings',
  USERS: 'users'
};

/**
 * @type {!Array.<dev.developer.server.TabPanel.SectionType>}
 */
dev.developer.server.TabPanel.sectionTypes = [
  dev.developer.server.TabPanel.SectionType.ME,
  dev.developer.server.TabPanel.SectionType.MESSAGES,
  dev.developer.server.TabPanel.SectionType.USERS,
  dev.developer.server.TabPanel.SectionType.LOCATIONS,
  dev.developer.server.TabPanel.SectionType.SETTINGS,
  dev.developer.server.TabPanel.SectionType.PHOTOS
];

/**
 * @type {!Object.<dev.dataTypes.ServerSetting.Type,dev.developer.server.TabPanel.SectionType>}
 * @private
 */
dev.developer.server.TabPanel._serverTypeToSectionType = goog.object.create(
  dev.dataTypes.ServerSetting.Type.AVATAR_CROP,   dev.developer.server.TabPanel.SectionType.PHOTOS,
  dev.dataTypes.ServerSetting.Type.AVATAR_UPLOAD, dev.developer.server.TabPanel.SectionType.PHOTOS,

  dev.dataTypes.ServerSetting.Type.LOCATIONS_CITIES,    dev.developer.server.TabPanel.SectionType.LOCATIONS,
  dev.dataTypes.ServerSetting.Type.LOCATIONS_COUNTRIES, dev.developer.server.TabPanel.SectionType.LOCATIONS,
  dev.dataTypes.ServerSetting.Type.LOCATIONS_REGIONS,   dev.developer.server.TabPanel.SectionType.LOCATIONS,

  dev.dataTypes.ServerSetting.Type.ME_USER, dev.developer.server.TabPanel.SectionType.ME,

  dev.dataTypes.ServerSetting.Type.MESSAGES_HISTORY, dev.developer.server.TabPanel.SectionType.MESSAGES,
  dev.dataTypes.ServerSetting.Type.MESSAGES_UNREAD,  dev.developer.server.TabPanel.SectionType.MESSAGES,

  dev.dataTypes.ServerSetting.Type.SETTINGS, dev.developer.server.TabPanel.SectionType.SETTINGS,

  dev.dataTypes.ServerSetting.Type.SIGNIN,         dev.developer.server.TabPanel.SectionType.USERS,
  dev.dataTypes.ServerSetting.Type.SIGNUP,          dev.developer.server.TabPanel.SectionType.USERS,
  dev.dataTypes.ServerSetting.Type.USERS_UPDATE,          dev.developer.server.TabPanel.SectionType.USERS,
  dev.dataTypes.ServerSetting.Type.ME_FILTER_UPDATE,   dev.developer.server.TabPanel.SectionType.USERS,
  dev.dataTypes.ServerSetting.Type.EMAIL_CHANGE,          dev.developer.server.TabPanel.SectionType.USERS,
  dev.dataTypes.ServerSetting.Type.EMAIL_CONFIRM,         dev.developer.server.TabPanel.SectionType.USERS
);

/**
 * @type {!Object.<dev.developer.server.TabPanel.SectionType,string>}
 * @private
 */
dev.developer.server.TabPanel._sectionTypeToCaption = goog.object.create(
  dev.developer.server.TabPanel.SectionType.LOCATIONS,  'Географические локации',
  dev.developer.server.TabPanel.SectionType.ME, 'Текущий пользователь',
  dev.developer.server.TabPanel.SectionType.MESSAGES,   'Сообщения',
  dev.developer.server.TabPanel.SectionType.PHOTOS,     'Фотографии',
  dev.developer.server.TabPanel.SectionType.SETTINGS,   'Настройки приложения',
  dev.developer.server.TabPanel.SectionType.USERS,      'Пользователи'
);

/**
 * @param {string} type
 * @return {number}
 */
dev.developer.server.TabPanel.getIndexBySectionType = (function() {
  var map = {};
  /** @type {!Array.<dev.developer.server.TabPanel.SectionType>} */
  var sectionTypes = dev.developer.server.TabPanel.sectionTypes;

  goog.array.forEach(sectionTypes, function(type, i) {
    map[type] = i;
  });

  return function(type) {
    return goog.isDef(map[type]) ? map[type] : -1;
  }
})();


/** @inheritDoc */
dev.developer.server.TabPanel.prototype.createDom = function() {
  dev.developer.server.TabPanel.base(this, 'createDom');

  if (this._settings) {
    this.applySettings(this._settings, this._settingValuesMap);
  }
};

/** @inheritDoc */
dev.developer.server.TabPanel.prototype.disposeInternal = function() {
  dev.developer.server.TabPanel.base(this, 'disposeInternal');

  this._settings = null;
  this._settingValuesMap = null;
};

/** @inheritDoc */
dev.developer.server.TabPanel.prototype.getSectionTypes = function() {
  return dev.developer.server.TabPanel.sectionTypes;
};

/** @inheritDoc */
dev.developer.server.TabPanel.prototype.createSectionContainer = function(
    type) {
  /** @type {dev.developer.ui.Section} */
  var sectionContainer = null;

  switch (type) {
    case dev.developer.server.TabPanel.SectionType.ME:
      sectionContainer = new dev.developer.server.Profile();
      break;
  }

  if (!sectionContainer) {
    sectionContainer = new dev.developer.server.Section();
  }

  return sectionContainer;
};

/** @inheritDoc */
dev.developer.server.TabPanel.prototype.createTab = function(type) {
  var sectionType = /** @type {dev.developer.server.TabPanel.SectionType} */ (
    type);
  /** @type {string|undefined} */
  var caption = dev.developer.server.TabPanel._sectionTypeToCaption[sectionType];

  if (caption) {
    return new dev.ui.tabBar.Tab(caption);
  }

  return null;
};

/** @inheritDoc */
dev.developer.server.TabPanel.prototype.getIndexBySectionType = function(type) {
  return dev.developer.server.TabPanel.getIndexBySectionType(type);
};

/**
 * @param {Array.<dev.dataTypes.ServerSetting>} settings
 * @param {Object.<dev.dataTypes.ServerSetting.Type,*>} valuesMap
 */
dev.developer.server.TabPanel.prototype.setSettings = function(settings,
    valuesMap) {
  this._settings = settings;
  this._settingValuesMap = valuesMap;
  this.applySettings(this._settings, this._settingValuesMap);
};

/**
 * @param {Array.<dev.dataTypes.ServerSetting>} settings
 * @param {Object.<dev.dataTypes.ServerSetting.Type,*>} valuesMap
 * @protected
 */
dev.developer.server.TabPanel.prototype.applySettings = function(settings,
    valuesMap) {
  if (this.getElement()) {
    var settingsMap = {};

    goog.array.forEach(settings, function(setting) {
      /** @type {dev.developer.server.TabPanel.SectionType|undefined} */
      var sectionType =
        dev.developer.server.TabPanel._serverTypeToSectionType[setting.type];

      if (sectionType) {
        if (!settingsMap[sectionType]) {
          settingsMap[sectionType] = [];
        }

        settingsMap[sectionType].push(setting);
      }
    }, this);

    goog.object.forEach(settingsMap, function(settings, type) {
      var sectionContainer = this.getSectionContainer(type);

      if (sectionContainer) {
        sectionContainer.setSettings(settings, this._settingValuesMap);
      }
    }, this);
  }
};
