goog.provide('dev.dataTypes.ServerSetting');
goog.provide('dev.dataTypes.ServerSetting.Type');

goog.require('goog.object');


/**
 * @param {dev.dataTypes.ServerSetting.Type} type
 * @param {string} name
 * @param {!Array.<dev.dataTypes.ServerOption>} options
 * @constructor
 */
dev.dataTypes.ServerSetting = function(type, name, options) {

  /**
   * @type {dev.dataTypes.ServerSetting.Type}
   */
  this.type = type;

  /**
   * @type {string}
   */
  this.name = name;

  /**
   * @type {!Array.<dev.dataTypes.ServerOption>}
   */
  this.options = options;
};

/**
 * @enum {string}
 */
dev.dataTypes.ServerSetting.Type = {
  ME_USER: 'meUser',



  AVATAR_CROP: 'avatarCrop',
  AVATAR_UPLOAD: 'avatarUpload',
  CALL_REQUEST_REMOVE: 'callRequestRemove',
  CALL_REQUESTS: 'callRequests',
  CALL_REQUESTS_REMOVE: 'callRequestsRemove',
  CALLS_ANSWER: 'callsAnswer',
  CALLS_CALL: 'callsCall',
  CALLS_HISTORY: 'callsHistory',
  CALLS_INFO: 'callsInfo',
  CALLS_REMOVE_ALL_SKIPPED_CALLS: 'callsRemoveAllSkippedCalls',
  CALLS_REMOVE_SKIPPED_CALL: 'callsRemoveSkippedCall',
  CALLS_REVEAL: 'callsReveal',
  CALLS_SKIPPED: 'callsSkipped',
  CHAT: 'chat',
  CONTACT_ID: 'contactId',
  CONTACTS: 'contacts',
  CONTACTS_REMOVE: 'contactsRemove',
  EMAIL_CHANGE: 'emailChange',
  EMAIL_CONFIRM: 'emailConfirm',
  FAVORITES: 'favorites',
  FAVORITES_ADMIRERS: 'favoritesAdmirers',
  INCOGNITO_INCOMING_CALL_ID: 'incognitoIncomingCallId',
  INCOGNITO_OUTGOING_CALL_ID: 'incognitoOutgoingCallId',
  INCOMING_CALL_ID: 'incomingCallId',
  LOCATIONS_CITIES: 'locationsCities',
  LOCATIONS_COUNTRIES: 'locationsCountries',
  LOCATIONS_REGIONS: 'locationsRegions',
  MATRIX_USERS: 'matrixUsers',
  ME_FILTER_UPDATE: 'meFilterUpdate',
  MESSAGES_HISTORY: 'messagesHistory',
  MESSAGES_UNREAD: 'messagesUnread',
  OUTGOING_CALL_ID: 'outgoingCallId',
  SETTINGS: 'settings',
  SIGNIN: 'signin',
  SIGNUP: 'signup',
  USERS_SETTINGS: 'usersSettings',
  USERS_FILTER: 'usersFilter',
  USERS_UPDATE: 'usersUpdate',
  USERS_UPDATE_SETTINGS: 'usersUpdateSettings',
  VALIDATORS_UNIQUENESS: 'validatorsUniqueness'
};

/**
 * @param {*} type
 * @return {dev.dataTypes.ServerSetting.Type?}
 */
dev.dataTypes.ServerSetting.getType = (function() {
  var map = goog.object.transpose(dev.dataTypes.ServerSetting.Type);

  return function(type) {
    return map[type] ? type : null;
  };
})();
