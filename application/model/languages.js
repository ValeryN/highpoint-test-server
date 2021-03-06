var Model = require('./Model');


var model = module.exports = new Model([
  {
    id: 1,
    name: 'Русский',
  },
  {
    id: 2,
    name: 'Английский',
  },
  {
    id: 3,
    name: 'Немецкий',
  },
  {
    id: 4,
    name: 'Испанский',
  },
  {
    id: 5,
    name: 'Китайский',
  },
  {
    id: 6,
    name: 'Японский',
  },
  {
    id: 7,
    name: 'JavaScript',
  },
  {
    id: 8,
    name: 'Латинский',
  },
]);


var idCounter = 100;

model.getNextId = function() {
  return ++idCounter;
};
