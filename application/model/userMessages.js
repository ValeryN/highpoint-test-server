var dateUtil = require('../core/date');
var messagesModel = require('./messages');


var Model = function(userId1, userId2) {
  this.userId1 = userId1;

  this.userId2 = userId2;

  this.messages = [];
};

Model._periods = [1000, 3600000, 10000000, 604800000];

Model._maxCount = 1000000;

Model.prototype.add = function(message) {
  this.messages.unshift(message);
};

/**
 * @param {number} id
 * @param {number} fromId
 * @return {Date}
 */
var getCreatedDate = function(id, fromId) {
  var index = id - fromId;
  var now = new Date();
  var ms = +(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1));

  for (var i = 0; i < index; i++) {
    ms -= Model._periods[i % Model._periods.length];
  }

  return new Date(ms);
};

Model.prototype.getList = function(opt_afterMessageId, opt_count) {
  var index = -1;
  var count = opt_count || 20;

  if (opt_afterMessageId) {
    for (var i = 0; i < this.messages.length; i++) {
      if (this.messages[i].id == opt_afterMessageId) {
        index = i;
        break;
      }
    }
  }

  var fromId = (this.userId1 + 10000 * this.userId2) * Model._maxCount;
  var messageCount = messagesModel.getCount();
  var messages = [];

  for (var i = index + 1; i < count + index + 1; i++) {
    if (!this.messages[i]) {
      var message = messagesModel.getAt(i % messageCount);
      message.id = fromId + i;
      message.createdAt = dateUtil.dateTimeToIsoString(
        getCreatedDate(message.id, fromId), true);

      if (i % 2) {
        message.sourceId = this.userId1;
        message.destinationId = this.userId2;
      } else {
        message.sourceId = this.userId2;
        message.destinationId = this.userId1;
      }

      this.messages[i] = message;
    }

    messages.push(this.messages[i]);
  }

  return messages;
};

var models = {};

module.exports = function(userId1, userId2) {
  var strId = userId1 + '_' + userId2;

  if (!models[strId]) {
    models[strId] = new Model(userId1, userId2);
  }

  return models[strId];
};
