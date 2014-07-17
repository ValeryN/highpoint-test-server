var Model = require('./Model');


var model = module.exports = new Model([
  {
    id: 1,
    name: 'Яндекс',
  },
  {
    id: 2,
    name: 'Островок',
  },
  {
    id: 3,
    name: 'Белые и пушистые',
  },
  {
    id: 4,
    name: 'Газпром',
  },
  {
    id: 5,
    name: 'Сбербанк',
  },
  {
    id: 6,
    name: 'Московский государственный университет',
  },
  {
    id: 7,
    name: 'Мосметрострой',
  },
  {
    id: 8,
    name: 'Procter and Gamble',
  },
]);

var idCounter = 100;

model.getNextId = function() {
  return ++idCounter;
};
