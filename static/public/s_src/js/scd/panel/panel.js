goog.provide('dev.Panel');
goog.provide('dev.Panel.SectionType');

goog.require('goog.array');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Tab');
goog.require('goog.ui.TabBar');
goog.require('goog.ui.TabBar.Location');
goog.require('npf.ui.SimpleComponent');
goog.require('npf.ui.scrollable.ScrollBar');
goog.require('npf.ui.scrollable.scrollBar.Vertical');
goog.require('dev.panel.TabSection');
goog.require('npf.ui.scrollable.Container');


/**
 * @param {Array.<dev.dataTypes.Tab>} settings
 * @param {Object} valuesMap
 * @param {number=} opt_index
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.SimpleComponent}
 */
dev.Panel = function(settings, valuesMap, opt_index, opt_domHelper) {
  dev.Panel.base(this, 'constructor', dev.Panel.CSS_CLASS, null, opt_domHelper);

  /**
   * @private {Array.<goog.ui.Component>}
   */
  this._sectionContainers = [];

  /**
   * @private {npf.ui.scrollable.scrollBar.Vertical}
   */
  this._sectionScrollBar = null;

  /**
   * @private {number}
   */
  this._sectionIndex = opt_index || 0;

  /**
   * @private {npf.ui.Component}
   */
  this._sectionsContainer = null;

  /**
   * @type {Object}
   * @private
   */
  this._settingValuesMap = valuesMap;

  /**
   * @private {Array.<dev.dataTypes.Tab>}
   */
  this._settings = settings;

  /**
   * @private {goog.ui.TabBar}
   */
  this._tabBar = null;

  /**
   * @private {npf.ui.scrollable.ScrollBar}
   */
  this._tabScrollBar = null;

  /**
   * @private {npf.ui.scrollable.Container}
   */
  this._tabScrollContainer = null;
};
goog.inherits(dev.Panel, npf.ui.SimpleComponent);


/**
 * @type {string}
 */
dev.Panel.CSS_CLASS = goog.getCssName('panel');

/**
 * @enum {string}
 */
dev.Panel.CssClass = {
  SECTIONS: goog.getCssName('panel-sections'),
  TAB_SCROLL_CONTAINER: goog.getCssName('panel-tabScrollContainer'),
  TAB_SCROLL_BAR: goog.getCssName('panel-tabScrollBar')
};


/** @inheritDoc */
dev.Panel.prototype.createDom = function() {
  dev.Panel.base(this, 'createDom');

  this._sectionsContainer =
    new npf.ui.SimpleComponent(dev.Panel.CssClass.SECTIONS);
  this.addChild(this._sectionsContainer, true);

  this._tabScrollContainer = new npf.ui.scrollable.Container();
  this._tabScrollContainer.addClassName(
    dev.Panel.CssClass.TAB_SCROLL_CONTAINER);
  this.addChild(this._tabScrollContainer, true);

  this._tabBar = new goog.ui.TabBar(goog.ui.TabBar.Location.START);
  this._tabScrollContainer.addChild(this._tabBar, true);

  this._tabScrollBar = new npf.ui.scrollable.scrollBar.Vertical();
  this._tabScrollBar.addClassName(dev.Panel.CssClass.TAB_SCROLL_BAR);
  this._tabScrollContainer.setScrollBar(this._tabScrollBar);
  this.addChild(this._tabScrollBar, true);

  goog.array.forEach(this._settings, function(tab) {
    /** @type {goog.ui.Component} */
    var sectionContainer =
      new dev.panel.TabSection(tab, this._settingValuesMap);
    this.registerDisposable(sectionContainer);
    this._sectionContainers.push(sectionContainer);

    /** @type {goog.ui.Tab} */
    var tabContainer = new goog.ui.Tab(tab.name);
    this._tabBar.addChild(tabContainer, true);
  }, this);

  this.applySelected(this._sectionIndex);

  this._sectionScrollBar = new npf.ui.scrollable.scrollBar.Vertical();
  this.addChild(this._sectionScrollBar, true);

  this._updateSectionScrollBar();
};

/** @inheritDoc */
dev.Panel.prototype.enterDocument = function() {
  dev.Panel.base(this, 'enterDocument');

  this.getHandler().
    listen(this._tabBar, goog.ui.Component.EventType.SELECT, this._onTabSelect);
};

/** @inheritDoc */
dev.Panel.prototype.disposeInternal = function() {
  dev.Panel.base(this, 'disposeInternal');

  this._sectionContainers = null;
  this._sectionScrollBar = null;
  this._sectionsContainer = null;
  this._settingValuesMap = null;
  this._settings = null;
  this._tabBar = null;
  this._tabScrollBar = null;
  this._tabScrollContainer = null;
};

/**
 * @param {number} index
 */
dev.Panel.prototype.setSelected = function(index) {
  if (this._sectionIndex != index) {
    this._sectionIndex = index;
    this.applySelected(this._sectionIndex);
    this._updateSectionScrollBar();
  }
};

/**
 * @param {number} index
 * @protected
 */
dev.Panel.prototype.applySelected = function(index) {
  if (this.getElement()) {
    this._tabBar.setSelectedTabIndex(index);
    this._sectionsContainer.removeChildren(true);

    /** @type {goog.ui.Component} */
    var visibleContainer = this.getSectionContainer(index);
    this._sectionsContainer.addChild(visibleContainer, true);
  }
};

/**
 * @param {number} index
 * @return {goog.ui.Component}
 */
dev.Panel.prototype.getSectionContainer = function(index) {
  return this._sectionContainers[index] || null;
};

/**
 * @return {number}
 */
dev.Panel.prototype.getSelectedIndex = function() {
  return this._sectionIndex;
};

/**
 * @private
 */
dev.Panel.prototype._updateSectionScrollBar = function() {
  var container = /** @type {npf.ui.scrollable.Container} */ (
    this.getSectionContainer(this._sectionIndex));

  if (container && this._sectionScrollBar) {
    this._sectionScrollBar.setContainer(container);
  }
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
dev.Panel.prototype._onTabSelect = function(evt) {
  var tab = /** @type {goog.ui.Tab} */ (evt.target);
  /** @type {number} */
  var tabIndex = this._tabBar.indexOfChild(tab);

  if (-1 < tabIndex) {
    this.setSelected(tabIndex);
  }
};
