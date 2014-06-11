goog.provide('dev.dataTypes.Message.Error');

goog.require('goog.object');


/**
 * @enum {string}
 */
dev.dataTypes.Message.Error = {
  BANNED: 'banned',
  DUPLICATE: 'duplicate',
  NOT_IN_CONTACTS: 'not_in_contacts',
  RATE_LIMIT: 'ratelimit'
};
