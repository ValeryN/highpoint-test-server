goog.provide('dev.developer.ui.InnerSection');

goog.require('npf.ui.RenderedComponent');
goog.require('dev.developer.ui.innerSection.Renderer');


/**
 * @param {string} header
 * @param {dev.developer.ui.innerSection.Renderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.RenderedComponent}
 */
dev.developer.ui.InnerSection = function(header, opt_renderer, opt_domHelper) {
  dev.developer.ui.InnerSection.base(
    this,
    'constructor',
    opt_renderer || dev.developer.ui.innerSection.Renderer.getInstance(),
    opt_domHelper);

  /**
   * @private {string}
   */
  this._header = header;
};
goog.inherits(dev.developer.ui.InnerSection, npf.ui.RenderedComponent);


/**
 * @return {string}
 */
dev.developer.ui.InnerSection.prototype.getHeader = function() {
  return this._header;
};
