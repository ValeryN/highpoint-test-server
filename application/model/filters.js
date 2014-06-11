var Model = require('./model').Model;
var FilterViewType = require('./FilterViewType');
var Gender = require('./Gender');


module.exports = new Model([
  {
    genders: [Gender.FEMALE],
    maxAge: 29,
    minAge: 20,
    viewType: FilterViewType.ALL
  }
], null);
