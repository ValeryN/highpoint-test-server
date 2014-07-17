var Model = require('./Model');


var model = module.exports = new Model([
  {
    id: 1,
    name: 'Менеджер проекта',
  },
  {
    id: 2,
    name: 'CEO',
  },
  {
    id: 3,
    name: 'Серверный разработчик на Питоне',
  },
  {
    id: 4,
    name: 'Финансовый директор',
  },
  {
    id: 5,
    name: 'Технический директор',
  },
  {
    id: 6,
    name: 'Генеральный директор',
  },
  {
    id: 7,
    name: 'Веб-разработчик',
  },
  {
    id: 8,
    name: 'Дизайнер',
  },
]);

var idCounter = 100;

model.getNextId = function() {
  return ++idCounter;
};
