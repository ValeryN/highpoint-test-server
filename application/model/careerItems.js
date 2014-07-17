var Model = require('./Model');


var model = module.exports = new Model([
  {
    id: 1,
    companyId: 1,
    fromYear: 2000,
    postId: 1,
    toYear: 2004,
  },
  {
    id: 2,
    companyId: 2,
    fromYear: 2004,
    postId: 2,
    toYear: 2008,
  },
  {
    id: 3,
    fromYear: 2009,
    postId: 1,
    toYear: 2012,
  },
  {
    id: 4,
    companyId: 3,
    fromYear: 2009,
    postId: 3,
  },
  {
    id: 5,
    fromYear: 2000,
    postId: 3,
  },
]);


var idCounter = 100;

model.getNextId = function() {
  return ++idCounter;
};
