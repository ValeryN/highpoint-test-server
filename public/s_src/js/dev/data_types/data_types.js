goog.provide('dev.dataTypes');
goog.provide('dev.dataTypes.Reason');

goog.require('goog.object');


/**
 * @enum {string}
 */
dev.dataTypes.Reason = {
  DESTINATION_BANNED: 'destination_banned',
  DESTINATION_CALL: 'destination_call',
  DESTINATION_IN_CALL_LIMIT: 'destination_in_call_limit',
  DESTINATION_OFFLINE: 'destination_offline',
  MANUAL: 'manual',
  NOT_CALLING: 'not_calling',
  SOURCE_BANNED: 'source_banned',
  SOURCE_CALL: 'source_call',
  SOURCE_OFFLINE: 'source_offline',
  TIMEOUT: 'timeout',
  TIMEOUT_DEFERRED: 'timeout_deferred'
};

/**
 * @param {*} reason
 * @return {dev.dataTypes.Reason?}
 */
dev.dataTypes.getReason = (function() {
  var map = goog.object.transpose(dev.dataTypes.Reason);

  return function(reason) {
    return /** @type {dev.dataTypes.Reason?} */ (
      goog.isDef(map[reason]) ? reason : null);
  };
})();
