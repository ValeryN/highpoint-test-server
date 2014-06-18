var application = require('../');

exports['test GET /v201405/me'] = function(beforeExit, assert) {
  assert.response(application.server, {
    url: '/v201405/me'
  }, {
    body: '{"data":{"user":{"id":1,"avatar":{"highCrop":"600x800+126+0","highImage":{"src":"http://localhost:3002/images/avatar/high/avatar_20","width":600,"height":800},"originalImage":{"src":"http://localhost:3002/s/avatars/avatar_20.jpg","width":800,"height":1063},"squareCrop":"600x600+108+0","squareImage":{"src":"http://localhost:3002/images/avatar/square/avatar_20","width":600,"height":600}},"career":[{"id":1,"companyId":1,"fromYear":2000,"postId":1,"toYear":2004},{"id":2,"companyId":2,"fromYear":2004,"postId":2,"toYear":2008},{"id":3,"fromYear":2009,"postId":1,"toYear":2012}],"cityId":1,"createdAt":"2012-08-02 00:02:56","dateOfBirth":"1984-11-04","education":[{"id":1,"fromYear":2000,"schoolId":1,"specialityId":1,"toYear":2004},{"id":2,"fromYear":2004,"schoolId":2,"specialityId":2,"toYear":2008},{"id":3,"fromYear":2009,"specialityId":1,"toYear":2012}],"email":"red.scorpix@gmail.com","favoriteCityIds":[1,2,3],"favoritePlaceIds":[1,2,3],"filter":{"genders":[2],"maxAge":29,"minAge":20,"viewType":1},"gender":1,"languageIds":[1,2],"maxEntertainmentPrice":{"amount":100000,"currency":"usd"},"minEntertainmentPrice":{"amount":10000,"currency":"usd"},"name":"Влад","nameForms":["Влад","Влада","Владу","Влада","Владом","Владе"],"visibility":1}}}'
  });
};
