goog.provide('npf.ui.stickyHead.Body');

goog.require('npf.ui.RenderedComponent');
goog.require('npf.ui.stickyHead.BodyRenderer');


/**
 * @param {npf.ui.stickyHead.BodyRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.RenderedComponent}
 */
npf.ui.stickyHead.Body = function(opt_renderer, opt_domHelper) {
	npf.ui.stickyHead.Body.base(
    this,
    'constructor',
    opt_renderer || npf.ui.stickyHead.BodyRenderer.getInstance(),
    opt_domHelper);
};
goog.inherits(npf.ui.stickyHead.Body, npf.ui.RenderedComponent);
