goog.provide('napp.dataTypes');
goog.provide('napp.dataTypes.Gender');

goog.require('goog.object');


/**
 * @enum {number}
 */
napp.dataTypes.Gender = {
  MALE: 1,
  FEMALE: 2
};


/**
 * @param {*} gender
 * @return {napp.dataTypes.Gender?}
 */
napp.dataTypes.getGender = (function() {
  var map = goog.object.transpose(napp.dataTypes.Gender);

  return function(gender) {
    return map[gender] ? /** @type {!napp.dataTypes.Gender} */ (gender) : null;
  };
})();
