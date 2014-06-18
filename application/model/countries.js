var Model = require('./Model');


var model = module.exports = new Model([
  {
    "id": 1,
    "name": "Украина",
    "nameForms": [
      "Украина",
      "Украины",
      "Украине",
      "Украину",
      "Украиной",
      "Украине"
    ],
  },
  {
    "id": 2,
    "name": "Россия",
    "nameForms": [
      "Россия",
      "России",
      "России",
      "Россию",
      "Россией",
      "России",
    ],
  }
]);

var getAll = model.getAll;

/**
 * @param {string=} opt_query
 * @return {!Array.<Countries.Item>}
 */
model.getAll = function(opt_query) {
  var countries = getAll.call(model);

  return countries.filter(function(country) {
    if (opt_query) {
      var query = opt_query.toUpperCase();

      return 0 == country.name.toUpperCase().indexOf(query);
    } else {
      return true;
    }
  });
};
