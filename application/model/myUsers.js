var Currency = require('./Currency');
var Gender = require('./Gender');
var Model = require('./Model');
var Visibility = require('./Visibility');
var avatars = require('./avatars');
var careerItems = require('./careerItems');
var educationItems = require('./educationItems');
var filters = require('./filters');


module.exports = new Model([
  {
    id: 1,
    avatar: avatars.getAt(19),
    career: [careerItems.get(1), careerItems.get(2), careerItems.get(3)],
    cityId: 1,
    createdAt: "2012-08-02 00:02:56",
    dateOfBirth: "1984-11-04",
    education: [educationItems.get(1), educationItems.get(2), educationItems.get(3)],
    email: 'red.scorpix@gmail.com',
    favoriteCityIds: [1, 2, 3],
    favoritePlaceIds: [1, 2, 3],
    filter: filters.getAt(0),
    gender: Gender.MALE,
    languageIds: [1, 2],
    maxEntertainmentPrice: { amount: 100000, currency: Currency.USD },
    minEntertainmentPrice: { amount: 10000, currency: Currency.USD },
    name: 'Влад',
    nameForms: ['Влад', 'Влада', 'Владу', 'Влада', 'Владом', 'Владе'],
    visibility: Visibility.PUBLIC,
  }
]);
