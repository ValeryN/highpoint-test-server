var Model = require('./Model');
var config = require('../config');


var getImageSrc = function(name) {
  return config.imageServerPath + '/images/photo/' + name;
};

var model = module.exports = new Model([
  {
    id: 1,
    image: { src: getImageSrc('photo_1'), width: 1365, height: 2048 },
    position: 1000,
    title: "Я и моя собака"
  },
  {
    id: 2,
    image: { src: getImageSrc('photo_2'), width: 2560, height: 1707 },
    position: 1000,
    title: "Я и сраная кошка"
  },
  {
    id: 3,
    image: { src: getImageSrc('photo_3'), width: 1365, height: 2048 },
    position: 1000,
    title: "Летний снегопад"
  },
  {
    id: 4,
    image: { src: getImageSrc('photo_4'), width: 1365, height: 2048 },
    position: 1000,
    title: "Продрогшие волосы"
  },
  {
    id: 5,
    image: { src: getImageSrc('photo_5'), width: 1365, height: 2048 },
    position: 1000,
    title: "100 лет одиночества"
  },
  {
    id: 6,
    image: { src: getImageSrc('photo_6'), width: 1365, height: 2048 },
    position: 1000,
    title: "Утром после пьянки"
  },
  {
    id: 7,
    image: { src: getImageSrc('photo_7'), width: 2560, height: 1707 },
    position: 1000,
    title: "В детстве"
  },
  {
    id: 8,
    image: { src: getImageSrc('photo_8'), width: 2560, height: 1707 },
    position: 1000,
    title: "Долго ходила, ходила и устала"
  },
  {
    id: 9,
    image: { src: getImageSrc('photo_9'), width: 1365, height: 2048 },
    position: 1000,
    title: "Наелась попкорна"
  },
  {
    id: 10,
    image: { src: getImageSrc('photo_10'), width: 1365, height: 2048 },
    position: 1000,
    title: "После встречи с программистом"
  },
  {
    id: 11,
    image: { src: getImageSrc('photo_11'), width: 2560, height: 1707 },
    position: 1000,
    title: "Босиком по росе верхом на коне"
  },
  {
    id: 12,
    image: { src: getImageSrc('photo_12'), width: 2560, height: 1707 },
    position: 1000,
    title: "5 лет, 4 месяца и 3 дня"
  },
  {
    id: 13,
    image: { src: getImageSrc('photo_13'), width: 1365, height: 2048 },
    position: 1000,
    title: "Хочу тату"
  }
]);

var idCounter = 100;

model.getNextId = function() {
  return ++idCounter;
};
