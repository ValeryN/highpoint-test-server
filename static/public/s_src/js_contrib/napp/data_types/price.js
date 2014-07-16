goog.provide('napp.dataTypes.Price');


/**
 * @param {number} amount
 * @param {napp.dataTypes.Currency} currency
 * @constructor
 */
napp.dataTypes.Price = function(amount, currency) {

  /**
   * @type {number}
   */
  this.amount = amount;

  /**
   * @type {napp.dataTypes.Currency}
   */
  this.currency = currency;
};


/**
 * @param {napp.dataTypes.Price} price1
 * @param {napp.dataTypes.Price} price2
 * @return {boolean}
 */
napp.dataTypes.Price.equals = function(price1, price2) {
  if (!price1 && !price2) {
    return true;
  } else if (
    (price1 && !price2) ||
    (!price1 && price2)
  ) {
    return false;
  }

  return price1.amount == price2.amount &&
    price2.currency.id == price2.currency.id;
};

/**
 * @return {!napp.dataTypes.Price}
 */
napp.dataTypes.Price.prototype.clone = function() {
  return new napp.dataTypes.Price(this.amount, this.currency.clone());
};

/**
 * @param {napp.dataTypes.Price} price
 * @return {boolean}
 */
napp.dataTypes.Price.prototype.equals = function(price) {
  return napp.dataTypes.Price.equals(this, price);
};
