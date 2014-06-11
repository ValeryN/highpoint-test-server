// Content below is autogenerated by ojster template engine
// usually there is no reason to edit it manually
"use strict";
var inherits = require('util').inherits;
var Template = require('../core/template');

var Layout = function (opt_data, opt_ctx, opt_writer) {
  Template.call(this, opt_data, opt_ctx, opt_writer);
};
inherits(Layout, Template);


Layout.prototype.renderBlockMain = function () { // @7:1
  var self = this;
  var d = this.data, vars = this.vars;
  self.writer.write(
    '<!DOCTYPE html><html><head><meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\'><meta http-equiv=\'X-UA-Compatible\' content=\'IE=edge\'>'
  ); // @13:5

  "<meta name='viewport' content='user-scalable=no, maximum-scale=1.7'>"

  self.writer.write(
    '<meta name=\'apple-mobile-web-app-capable\' content=\'yes\'><title>HighPoint Test Server</title><link rel=\'icon\' href=\'/favicon.ico\' type=\'image/x-icon\'><link rel=\'icon\' href=\'/logo.png\' type=\'image_src\'>'
  ); // @18:5
  self.renderBlockCss(); // @18:5
  self.renderBlockJs(); // @19:5
  self.writer.write(
    '</head><body>'
  ); // @22:5
  self.renderBlockContent(); // @22:5
  self.writer.write(
    '</body></html>'
  );
}; // @25:1


Layout.prototype.renderBlockCss = function () { // @28:1
  var self = this;
  var d = this.data, vars = this.vars;
}; // @29:1


Layout.prototype.renderBlockJs = function () { // @32:1
  var self = this;
  var d = this.data, vars = this.vars;
}; // @33:1


Layout.prototype.renderBlockContent = function () { // @36:1
  var self = this;
  var d = this.data, vars = this.vars;
}; // @37:1

module.exports = Layout;
