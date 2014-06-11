goog.provide('dev.ui.TabPanel');

goog.require('goog.array');
goog.require('goog.fx.Transition.EventType');
goog.require('goog.ui.Component.EventType');
goog.require('dev.ui.TabBar');
goog.require('npf.ui.RenderedComponent');
goog.require('dev.ui.scrollable.Container');
goog.require('npf.ui.scrollable.ScrollBar');
goog.require('dev.ui.tabPanel.Animation');
goog.require('dev.ui.tabPanel.Animation.Direction');
goog.require('dev.ui.tabPanel.SectionsContainer');
goog.require('dev.ui.tabPanel.Renderer');


/**
 * @param {string} type
 * @param {dev.ui.tabPanel.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.RenderedComponent}
 */
dev.ui.TabPanel = function(type, opt_renderer, opt_domHelper) {
  dev.ui.TabPanel.base(this, 'constructor', opt_renderer ||
    dev.ui.tabPanel.Renderer.getInstance(), opt_domHelper);

  /**
   * @private {string?}
   */
  this._awaitingSectionType = null;

  /**
   * @private {dev.ui.tabPanel.Animation}
   */
  this._sectionAnimation = null;

  /**
   * @private {Array.<goog.ui.Component>}
   */
  this._sectionContainers = [];

  /**
   * @private {string}
   */
  this._sectionType = type;

  /**
   * @private {dev.ui.tabPanel.SectionsContainer}
   */
  this._sectionsContainer = null;

  /**
   * @private {dev.ui.TabBar}
   */
  this._tabBar = null;

  /**
   * @private {npf.ui.scrollable.ScrollBar}
   */
  this._tabScrollBar = null;

  /**
   * @private {dev.ui.scrollable.Container}
   */
  this._tabScrollContainer = null;

  /**
   * @private {string?}
   */
  this._visibleSectionType = null;
};
goog.inherits(dev.ui.TabPanel, npf.ui.RenderedComponent);


/** @inheritDoc */
dev.ui.TabPanel.prototype.createDom = function() {
  dev.ui.TabPanel.base(this, 'createDom');

  /** @type {Array.<string>} */
  var types = this.getSectionTypes();

  this._sectionsContainer = this.createSectionsContainer();
  this._tabScrollContainer = this.createTabScrollContainer();
  this._tabScrollBar = this.createTabScrollBar();

  if (1 < types.length) {
    this._tabBar = this.createTabBar();
  }

  this.addChild(this._sectionsContainer, true);

  if (this._tabScrollContainer) {
    this.addChild(this._tabScrollContainer, true);

    if (this._tabBar) {
      this._tabScrollContainer.addChild(this._tabBar, true);
    }

    if (this._tabScrollBar) {
      this._tabScrollContainer.setScrollBar(this._tabScrollBar);
      this.addChild(this._tabScrollBar, true);
    }
  } else if (this._tabBar) {
    this.addChild(this._tabBar, true);
  }

  goog.array.forEach(types, function(type) {
    /** @type {goog.ui.Component} */
    var sectionContainer = this.createSectionContainer(type);

    this.registerDisposable(sectionContainer);
    this._sectionContainers.push(sectionContainer);

    if (this._tabBar) {
      /** @type {dev.ui.tabBar.Tab} */
      var tab = this.createTab(type);
      this._tabBar.addChild(tab, true);
    }
  }, this);

  this.applySelected(this._sectionType);
};

/** @inheritDoc */
dev.ui.TabPanel.prototype.enterDocument = function() {
  dev.ui.TabPanel.base(this, 'enterDocument');

  if (this._tabBar) {
    this.getHandler().listen(
      this._tabBar,
      goog.ui.Component.EventType.SELECT,
      this._onTabSelect);
  }
};

/** @inheritDoc */
dev.ui.TabPanel.prototype.exitDocument = function() {
  dev.ui.TabPanel.base(this, 'exitDocument');

  goog.dispose(this._sectionAnimation);
  this._sectionAnimation = null;
};

/** @inheritDoc */
dev.ui.TabPanel.prototype.disposeInternal = function() {
  dev.ui.TabPanel.base(this, 'disposeInternal');

  this._sectionAnimation = null;
  this._sectionContainers = null;
  this._sectionsContainer = null;
  this._tabBar = null;
  this._tabScrollBar = null;
  this._tabScrollContainer = null;
};

/**
 * @return {Array.<string>}
 */
dev.ui.TabPanel.prototype.getSectionTypes = goog.abstractMethod;

/**
 * @return {!dev.ui.tabPanel.SectionsContainer}
 * @protected
 */
dev.ui.TabPanel.prototype.createSectionsContainer = function() {
  return new dev.ui.tabPanel.SectionsContainer();
};

/**
 * @return {dev.ui.scrollable.Container}
 * @protected
 */
dev.ui.TabPanel.prototype.createTabScrollContainer = function() {
  return null;
};

/**
 * @return {npf.ui.scrollable.ScrollBar}
 * @protected
 */
dev.ui.TabPanel.prototype.createTabScrollBar = function() {
  return null;
};

/**
 * @return {!dev.ui.TabBar}
 * @protected
 */
dev.ui.TabPanel.prototype.createTabBar = function() {
  return new dev.ui.TabBar();
};

/**
 * @param {string} type
 * @return {goog.ui.Component}
 * @protected
 */
dev.ui.TabPanel.prototype.createSectionContainer = goog.abstractMethod;

/**
 * @param {string} type
 * @return {dev.ui.tabBar.Tab}
 * @protected
 */
dev.ui.TabPanel.prototype.createTab = goog.abstractMethod;

/**
 * @param {string} tabCaption
 */
dev.ui.TabPanel.prototype.appendTab = function(tabCaption) {
  /** @type {dev.ui.tabBar.Tab} */
  var tab = this.createTab(tabCaption);

  if (tab) {
    this._tabBar.addChild(tab, true);
  }
};

/**
 * @return {dev.ui.tabPanel.SectionsContainer}
 */
dev.ui.TabPanel.prototype.getSectionsContainer = function() {
  return this._sectionsContainer;
};

/**
 * @param {string} type
 * @return {number}
 */
dev.ui.TabPanel.prototype.getIndexBySectionType = goog.abstractMethod;

/**
 * @return {dev.ui.TabBar}
 */
dev.ui.TabPanel.prototype.getTabBar = function() {
  return this._tabBar;
};

/**
 * @return {dev.ui.scrollable.Container}
 */
dev.ui.TabPanel.prototype.getTabScrollContainer = function() {
  return this._tabScrollContainer;
};

/**
 * @return {npf.ui.scrollable.ScrollBar}
 */
dev.ui.TabPanel.prototype.getTabScrollBar = function() {
  return this._tabScrollBar;
};

/**
 * @return {goog.ui.Component}
 */
dev.ui.TabPanel.prototype.getSelectedContainer = function() {
  return this.getSectionContainer(this._sectionType);
};

/**
 * @param {string} type
 * @return {goog.ui.Component}
 */
dev.ui.TabPanel.prototype.getSectionContainer = function(type) {
  /** @type {number} */
  var index = this.getIndexBySectionType(type);

  return -1 < index ? this._sectionContainers[index] : null;
};

/**
 * @return {string}
 */
dev.ui.TabPanel.prototype.getSelectedSectionType = function() {
  return this._sectionType;
};

/**
 * @param {string} type
 * @param {boolean=} opt_force
 */
dev.ui.TabPanel.prototype.setSelected = function(type, opt_force) {
  if (this._sectionType != type) {
    this._sectionType = type;
    this.applySelected(this._sectionType, opt_force);
    this.onSelect();
  }
};

/**
 * @param {string} type
 * @param {boolean=} opt_force
 * @protected
 */
dev.ui.TabPanel.prototype.applySelected = function(type, opt_force) {
  if (this.getElement()) {
    /** @type {number} */
    var index = this.getIndexBySectionType(type);

    if (-1 < index && this._tabBar) {
      this._tabBar.setSelectedTabIndex(index);
    }

    if (opt_force || !this._sectionsContainer.hasChildren()) {
      goog.dispose(this._sectionAnimation);
      this._sectionAnimation = null;

      this._awaitingSectionType = null;
      this._visibleSectionType = type;

      this._sectionsContainer.removeChildren(true);

      /** @type {goog.ui.Component} */
      var visibleContainer = this.getSectionContainer(type);
      this._sectionsContainer.addChild(visibleContainer, true);
    }
    else {
      if (this._sectionAnimation) {
        this._awaitingSectionType = type;
      } else {
        this._animate(type);
      }
    }
  }
};

/**
 * @protected
 */
dev.ui.TabPanel.prototype.onSelect = goog.nullFunction;

/**
 * @param {string} type
 * @private
 */
dev.ui.TabPanel.prototype._animate = function(type) {
  /** @type {goog.ui.Component} */
  var hideContainer = this._visibleSectionType ?
    this.getSectionContainer(this._visibleSectionType) : null;
  /** @type {goog.ui.Component} */
  var visibleContainer = this.getSectionContainer(type);
  /** @type {number} */
  var hideIndex = this._visibleSectionType ?
    this.getIndexBySectionType(this._visibleSectionType) : -1;
  /** @type {number} */
  var showIndex = this.getIndexBySectionType(type);

  this._visibleSectionType = type;

  /** @type {function(goog.events.Event)} */
  var onEnd = function(evt) {
    this._sectionsContainer.removeChild(hideContainer, true);

    goog.dispose(this._sectionAnimation);
    this._sectionAnimation = null;

    /** @type {string?} */
    var awaitingSectionType = this._awaitingSectionType;

    if (awaitingSectionType) {
      this._awaitingSectionType = null;

      if (this.isInDocument()) {
        this._animate(awaitingSectionType);
      } else {
        this._visibleSectionType = awaitingSectionType;
        /** @type {goog.ui.Component} */
        var sectionContainer = this.getSectionContainer(awaitingSectionType);
        this._sectionsContainer.addChild(sectionContainer, true);
      }
    }
  };

  this._sectionsContainer.addChild(visibleContainer, true);

  /** @type {dev.ui.tabPanel.Animation.Direction} */
  var direction = hideIndex > showIndex
    ? dev.ui.tabPanel.Animation.Direction.PREV
    : dev.ui.tabPanel.Animation.Direction.NEXT;

  this._sectionAnimation = new dev.ui.tabPanel.Animation(
    this._sectionsContainer, visibleContainer, hideContainer, direction);
  this._sectionAnimation.listen(
    goog.fx.Transition.EventType.END, onEnd, false, this);
  this._sectionAnimation.play();
};

/**
 * @param {dev.ui.tabBar.Tab} tab
 * @return {number}
 */
dev.ui.TabPanel.prototype.getTabIndex = function(tab) {
  return this._tabBar ? this._tabBar.indexOfChild(tab) : -1;
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
dev.ui.TabPanel.prototype._onTabSelect = function(evt) {
  var tab = /** @type {dev.ui.tabBar.Tab} */ (evt.target);
  /** @type {number} */
  var tabIndex = this.getTabIndex(tab);
  /** @type {string|undefined} */
  var type = this.getSectionTypes()[tabIndex];

  if (type) {
    this.setSelected(type);
  }
};
