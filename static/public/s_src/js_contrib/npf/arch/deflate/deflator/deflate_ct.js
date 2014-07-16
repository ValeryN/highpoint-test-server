goog.provide('npf.arch.deflate.deflator.DeflateCt');


/**
 * @constructor
 */
npf.arch.deflate.deflator.DeflateCt = function() {

  /**
   * Father node in Huffman tree or length of bit string
   * @type {number}
   */
  this.dl = 0;

  /**
   * Frequency count or bit string
   * @type {number}
   */
  this.fc = 0;
};
