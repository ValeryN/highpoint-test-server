var Gender = require('./Gender');
var Model = require('./model').Model;
var avatars = require('./avatars');


var model = module.exports = new Model([
  {
    id: 1,
    avatar: avatars.getAt(19),
    city_id: 1,
    createdAt: '2012-08-02 00:02:56',
    dateOfBirth: '1984-11-04',
    gender: Gender.MALE,
    name: 'Влад',
  }
]);
