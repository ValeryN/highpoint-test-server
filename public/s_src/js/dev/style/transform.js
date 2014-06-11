goog.provide('dev.style.transform');

goog.require('npf.userAgent.support');


/**
 * @param {number} left
 * @param {number} top
 * @return {string}
 */
dev.style.transform.getTransition = function(left, top) {
  return npf.userAgent.support.getCssTransforms3d() ?
    'translate3d(' + left + 'px,' + top + 'px,0)' :
    'translate(' + left + 'px,' + top + 'px)';
};
