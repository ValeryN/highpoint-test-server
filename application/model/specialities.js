var Model = require('./Model');


var model = module.exports = new Model([
  {
    id: 1,
    name: 'Инженер газо-турбинных установок',
  },
  {
    id: 2,
    name: 'Техник-атомщик',
  },
  {
    id: 3,
    name: 'Бакалавр техники и технологии',
  },
  {
    id: 4,
    name: 'Финансист',
  },
  {
    id: 5,
    name: 'Маркетолог',
  },
  {
    id: 6,
    name: 'Менеджер предприятия',
  },
  {
    id: 7,
    name: 'Инженер-схемотехник',
  },
  {
    id: 8,
    name: 'Инженер-программист',
  },
]);


var idCounter = 100;

model.getNextId = function() {
  return ++idCounter;
};
