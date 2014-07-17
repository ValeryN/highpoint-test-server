// Content below is autogenerated by ojster template engine
// usually there is no reason to edit it manually
goog.provide('dev.panel.templates.Radio');

goog.require('ojster.Template');
goog.require('goog.array');
goog.require('goog.ui.IdGenerator');

/**
 * @param {Object=} opt_data
 * @param {Object=} opt_ctx
 * @param {ojster.StringWriter=} opt_writer
 * @constructor
 * @extends {ojster.Template}
 */
dev.panel.templates.Radio = function (opt_data, opt_ctx, opt_writer) {
  dev.panel.templates.Radio.base(this, 'constructor', opt_data, opt_ctx, opt_writer);
};
goog.inherits(dev.panel.templates.Radio, ojster.Template);


dev.panel.templates.Radio.prototype.renderBlockMain = function () { // @9:1
  var self = this;
  var d = this.data, vars = this.vars;
  self.writer.write(
    '<div class="',
    self.baseCssName, // @10:13
    '"><div class="',
    goog.getCssName(/** @type {string} */ (self.baseCssName), 'header'), // @11:15
    '">',
    self.escape(d.option.name), // @11:35
    '</div>'
  ); // @12:3

  goog.array.forEach(d.option.items, function(item, i) {


  var id = goog.ui.IdGenerator.getInstance().getNextUniqueId();

  self.writer.write(
    '<div class="',
    goog.getCssName(/** @type {string} */ (self.baseCssName), 'option'), // @14:17
    '"><input id="',
    id, // @15:18
    '" name="',
    d.name, // @15:33
    '" type="radio" value="',
    (i + 1), // @15:66
    '" class="',
    goog.getCssName(/** @type {string} */ (self.baseCssName), 'input'), // @15:87
    '"><label for="',
    id, // @16:19
    '" class="',
    goog.getCssName(/** @type {string} */ (self.baseCssName), 'label'), // @16:35
    '">',
    self.escape(item.name), // @17:9
    '</label></div>'
  ); // @20:3

  }, this);

  self.writer.write(
    '</div>'
  );
}; // @22:1