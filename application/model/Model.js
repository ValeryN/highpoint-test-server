/**
 * @param {!Array.<Object>} items
 * @param {string=} opt_idKey Defaults to 'id'.
 * @constructor
 */
var Model = module.exports = function(items, opt_idKey) {
  this._items = items;
  this._itemsMap = {};
  this._idKey = null;

  if (null !== opt_idKey) {
    this._idKey = opt_idKey || 'id';

    this._items.forEach(function(item) {
      if (item[this._idKey]) {
        this._itemsMap[item[this._idKey]] = item;
      }
    }, this);
  }
};

/**
 * @param {Object.<K,V>} obj
 * @return {!Object.<K,V>}
 * @template K,V
 */
Model.clone = function(obj) {
  var res = {};

  for (var key in obj) {
    res[key] = obj[key];
  }

  return res;
};

/**
 * @param {!Array.<Object>}
 * @private
 */
Model.prototype._items;

/**
 * @param {!Object.<number,Object>}
 * @private
 */
Model.prototype._itemsMap;

/**
 * @return {!Array.<Object>}
 */
Model.prototype.getAll = function() {
  var result = [];
  var count = this.getCount();

  for (var i = 0; i < count; i++) {
    var item = this.getAt(i);

    if (item) {
      result.push(item);
    }
  }

  return result;
};

/**
 * @return {number}
 */
Model.prototype.getCount = function() {
  return this._items.length;
};

/**
 * @param {number} id
 * @return {Object}
 */
Model.prototype.get = function(id) {
  return this._itemsMap[id] ? Model.clone(this._itemsMap[id]) : null;
};

/**
 * @param {number} index
 * @return {Object}
 */
Model.prototype.getAt = function(index) {
  return this._items[index] ? Model.clone(this._items[index]) : null;
};

/**
 * @param {Array.<number>} ids
 * @return {!Array.<Object>}
 */
Model.prototype.getList = function(ids) {
  var result = [];

  ids.forEach(function(id) {
    var item = this.get(id);

    if (item) {
      result.push(item);
    }
  }, this);

  return result;
};

/**
 * @return {Object}
 */
Model.prototype.getRandom = function(objMap) {
  var index = Math.floor(Math.random() * this.getCount());

  return this.getAt(index);
};

/**
 * @param {Date} date
 * @return {string}
 */
Model.prototype.getIsoDate = function(date) {
  return [
    date.getFullYear(),
    this._padNumber(date.getMonth() + 1),
    this._padNumber(date.getDate())
  ].join('-') + ' ' + [
    this._padNumber(date.getHours(), 2),
    this._padNumber(date.getMinutes(), 2),
    this._padNumber(date.getSeconds(), 2)
  ].join(':');
};

/**
 * @param {number} num
 * @param {number} length
 * @return {string}
 * @private
 */
Model.prototype._padNumber = function(num, length) {
  var s = String(num);
  var index = s.length;

  return (new Array(Math.max(0, length - index) + 1).join('0')) + s;
};

Model.prototype.add = function(item) {
  this._items.push(item);

  if (this._idKey) {
    this._itemsMap[item[this._idKey]] = item;
  }
};
