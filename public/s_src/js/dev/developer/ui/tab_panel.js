goog.provide('dev.developer.ui.TabPanel');

goog.require('goog.ui.TabBar.Location');
goog.require('dev.ui.scrollable.Container');
goog.require('dev.ui.scrollable.VerticalScrollBar');
goog.require('dev.developer.ui.Section');
goog.require('dev.ui.TabPanel');


/**
 * @param {string} type
 * @param {dev.ui.tabPanel.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {dev.ui.TabPanel}
 */
dev.developer.ui.TabPanel = function(type, opt_renderer, opt_domHelper) {
  dev.developer.ui.TabPanel.base(
    this, 'constructor', type, opt_renderer, opt_domHelper);

  /**
   * @private {dev.ui.scrollable.VerticalScrollBar}
   */
  this._sectionScrollBar = null;
};
goog.inherits(dev.developer.ui.TabPanel, dev.ui.TabPanel);


/**
 * @enum {string}
 */
dev.developer.ui.TabPanel.CssClass = {
  TAB_SCROLL_CONTAINER: goog.getCssName('devPanel-tabScrollContainer'),
  TAB_SCROLL_BAR: goog.getCssName('devPanel-tabScrollBar')
};


/** @inheritDoc */
dev.developer.ui.TabPanel.prototype.createDom = function() {
  dev.developer.ui.TabPanel.base(this, 'createDom');

  this._sectionScrollBar = new dev.ui.scrollable.VerticalScrollBar();
  this.addChild(this._sectionScrollBar, true);

  this._updateSectionScrollBar();
};

/** @inheritDoc */
dev.developer.ui.TabPanel.prototype.disposeInternal = function() {
  dev.developer.ui.TabPanel.base(this, 'disposeInternal');

  this._sectionScrollBar = null;
};

/** @inheritDoc */
dev.developer.ui.TabPanel.prototype.createSectionContainer = function(type) {
  return new dev.developer.ui.Section();
};

/** @inheritDoc */
dev.developer.ui.TabPanel.prototype.createTabBar = function() {
  /** @type {!dev.ui.TabBar} */
  var tabBar = dev.developer.ui.TabPanel.base(this, 'createTabBar');
  tabBar.setLocation(goog.ui.TabBar.Location.START);

  return tabBar;
};

/** @inheritDoc */
dev.developer.ui.TabPanel.prototype.createTabScrollBar = function() {
  var scrollBar = new dev.ui.scrollable.VerticalScrollBar();
  scrollBar.addClassName(dev.developer.ui.TabPanel.CssClass.TAB_SCROLL_BAR);

  return scrollBar;
};

/** @inheritDoc */
dev.developer.ui.TabPanel.prototype.createTabScrollContainer = function() {
  var container = new dev.ui.scrollable.Container();
  container.addClassName(
    dev.developer.ui.TabPanel.CssClass.TAB_SCROLL_CONTAINER);

  return container;
};

/**
 * @return {Element}
 */
dev.developer.ui.TabPanel.prototype.getMoveElement = function() {
  /** @type {dev.ui.scrollable.Container} */
  var tabScrollContainer = this.getTabScrollContainer();

  if (tabScrollContainer) {
    return tabScrollContainer.getElement();
  } else {
    return this.getTabBar().getElement();
  }
};

/** @inheritDoc */
dev.developer.ui.TabPanel.prototype.onSelect = function() {
  dev.developer.ui.TabPanel.base(this, 'onSelect');

  this._updateSectionScrollBar();
};

/**
 * @private
 */
dev.developer.ui.TabPanel.prototype._updateSectionScrollBar = function() {
  var container = /** @type {dev.ui.scrollable.Container} */ (
    this.getSelectedContainer());

  if (container && this._sectionScrollBar) {
    this._sectionScrollBar.setContainer(container);
  }
};
