var Model = require('./model').Model;
var config = require('../config');


/**
 * Элементы массива:
 * 0 — ширина оригинального изображения
 * 1 — высота оригинального изображения
 * 2 — ширина квадратного изображения
 * 3 — высота квадратного изображения
 * 4 — смещение по горизонтали квадратного изображения
 * 5 — смещение по вертикали квадратного изображения
 * 6 — ширина изображения 3:4
 * 7 — высота изображения 3:4
 * 8 — смещение по горизонтали изображения 3:4
 * 9 — смещение по вертикали изображения 3:4
 */
var avatarCrops = {
  'avatar_1': [600, 400, 400, 400, 19, 0, 300, 400, 108, 0],
  'avatar_2': [2560, 1440, 1000, 1000, 592, 0, 1080, 1440, 644, 0],
  'avatar_3': [1920, 1080, 1080, 1080, 427, 0, 810, 1080, 478, 0],
  'avatar_4': [512, 768, 425, 425, 26, 0, 512, 682, 0, 0],
  'avatar_5': [2560, 1440, 1440, 1440, 544, 0, 1080, 1440, 907, 0],
  'avatar_6': [2500, 1791, 1300, 1300, 378, 104, 1227, 1636, 430, 154],
  'avatar_7': [2560, 1440, 1440, 1440, 916, 0, 1080, 1440, 1056, 0],
  'avatar_8': [1680, 1050, 800, 800, 664, 4, 753, 1004, 723, 44],
  'avatar_9': [1680, 1050, 850, 850, 408, 0, 788, 1050, 455, 0],
  'avatar_10': [1680, 1050, 1050, 1050, 450, 0, 788, 1050, 575, 0],
  'avatar_11': [1600, 1200, 650, 650, 302, 0, 750, 1000, 221, 19],
  'avatar_12': [866, 577, 400, 400, 128, 0, 433, 577, 124, 0],
  'avatar_13': [1920, 1200, 1100, 1100, 500, 0, 900, 1200, 585, 0],
  'avatar_14': [1680, 1050, 850, 850, 437, 146, 675, 900, 525, 151],
  'avatar_15': [1024, 768, 535, 535, 312, 0, 576, 768, 295, 0],
  'avatar_16': [640, 853, 405, 405, 37, 0, 540, 720, 0, 0],
  'avatar_17': [1920, 1200, 1200, 1200, 631, 0, 900, 1200, 725, 0],
  'avatar_18': [1200, 1600, 850, 850, 348, 224, 795, 1060, 405, 210],
  'avatar_19': [600, 712, 350, 350, 96, 59, 495, 660, 12, 0],
  'avatar_20': [800, 1063, 600, 600, 108, 0, 600, 800, 126, 0],
};

var getSquareCrop = function(name) {
  var r = avatarCrops[name];
  return r ? r[2] + 'x' + r[3] + '+' + r[4] + '+' + r[5] : '';
};

var getHighCrop = function(name) {
  var r = avatarCrops[name];
  return r ? r[6] + 'x' + r[7] + '+' + r[8] + '+' + r[9] : '';
};

var getSquareImageSrc = function(name) {
  return config.address + '/images/avatar/square/' + name;
};

var getHighImageSrc = function(name) {
  return config.address + '/images/avatar/high/' + name;
};

var getOriginImageSrc = function(name) {
  return config.address + '/s/avatars/' + name + '.jpg';
};

var avatars = (function() {
  var avatars = [];

  for (var i = 1; i <= 20; i++) {
    avatars.push({
      highCrop: getHighCrop('avatar_' + i),
      highImage: {
        src: getHighImageSrc('avatar_' + i),
        width: avatarCrops['avatar_' + i][6],
        height: avatarCrops['avatar_' + i][7],
      },
      originalImage: {
        src: getOriginImageSrc('avatar_' + i),
        width: avatarCrops['avatar_' + i][0],
        height: avatarCrops['avatar_' + i][1],
      },
      squareCrop: getSquareCrop('avatar_' + i),
      squareImage: {
        src: getSquareImageSrc('avatar_' + i),
        width: avatarCrops['avatar_' + i][2],
        height: avatarCrops['avatar_' + i][3],
      },
    });
  }

  return avatars;
})();

var model = module.exports = new Model(avatars, null);
model.getHighCrop = getSquareCrop;
model.getSquareCrop = getSquareCrop;
