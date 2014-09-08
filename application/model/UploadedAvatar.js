var async = require('async');
var imagemagick = require('imagemagick');
var mkdirp = require('mkdirp');
var ncp = require('ncp').ncp;
var fs = require('fs');
var path = require('path');

var config = require('../config');


var UploadedAvatar = module.exports = function() {

  /**
   * @type {{crop:Object,src:string,width:number,height:number}?}
   */
  this.avatar = null;

  /**
   * @type {string}
   */
  this.avatarFilePath = '';

  /**
   * @type {{src:string,width:number,height:number}?}
   */
  this.image = null;

  /**
   * @type {string}
   */
  this.imageFilePath = '';
};

/**
 * @param {Object} file
 * @param {function(Error,Object)} callback
 */
UploadedAvatar.prototype.upload = function(file, callback) {
  var basename = path.basename(file.path);
  var newPath  = config.tempFilesPath    + '/' + basename;
  var webPath  = config.webTempFilesPath + '/' + basename;
  var self = this;

  var mkdir = function(file, callback) {
    mkdirp(config.tempFilesPath, 0755, function(err) {
      callback(err, file);
    });
  };
  var copyfile = function(file, callback) {
    ncp(file.path, newPath, function(err) {
      callback(err, file);
    });
  };
  var identify = function(file, callback) {
    imagemagick.identify(['-format', '%wx%h', newPath], callback);
  };
  var getInfo = function(raw, callback) {
    var sizeStrings = raw.trim().split('x');
    var width = parseInt(sizeStrings[0], 10);
    var height = parseInt(sizeStrings[1], 10);

    if (width && height) {
      self.image = {
        height: height,
        src: webPath,
        width: width,
      };
      self.imageFilePath = newPath;
      callback(null, self.image);
    } else {
      callback(new Error('Empty width or height.'), null);
    }
  };

  async.compose(
    getInfo,
    identify,
    copyfile,
    mkdir
  )(file, callback);
};

/**
 * @param {{left:number,top:number,width:number,height:number}} cropRect
 * @param {function(Error,Object,Object)} callback
 */
UploadedAvatar.prototype.crop = function(cropRect, callback) {
  if (this.image) {
    var width = cropRect.width;
    var height = cropRect.height;
    var left = cropRect.left;
    var top = cropRect.top;
    var basename = path.basename(this.imageFilePath);
    var newPath = config.tempFilesPath + '/avatar-' + basename;
    var webPath = config.webTempFilesPath + '/avatar-' + basename;
    var self = this;

    mkdirp(config.tempFilesPath, 0755, function(err) {
      if (err) return callback(err);

      var crop = width + 'x' + height + '+' + left + '+' + top;
      imagemagick.convert([self.imageFilePath, '-crop', crop, newPath], function(err, stdout, stderr) {
        if (err) return callback(err);

        self.avatar = {
          crop: {
            height: height,
            left: left,
            top: top,
            width: width
          },
          height: height,
          src: webPath,
          width: width,
        };
        self.avatarFilePath = newPath;
        callback(null, self.avatar, self.image);
      });
    });
  } else {
    callback(new Error('Empty uploaded image'));
  }
};
