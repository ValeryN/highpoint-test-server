goog.provide('dev.api.JsonParser');

goog.require('napp.api.server.JsonParser');
goog.require('dev.dataTypes.ServerOption');
goog.require('dev.dataTypes.ServerSetting');


/**
 * @constructor
 * @extends {napp.api.server.JsonParser}
 */
dev.api.JsonParser = function() {
	dev.api.JsonParser.base(this, 'constructor');
};
goog.inherits(dev.api.JsonParser, napp.api.server.JsonParser);
goog.addSingletonGetter(dev.api.JsonParser);


/**
 * @param {*} jsonOption
 * @return {dev.dataTypes.ServerOption}
 */
dev.api.JsonParser.prototype.getServerOption = function(jsonOption) {
	if (goog.isObject(jsonOption)) {
		var name = this.getString(jsonOption['name']);

		if (name) {
			return new dev.dataTypes.ServerOption(name, jsonOption['value']);
		}
	}

	return null;
};

/**
 * @param {*} jsonOptions
 * @return {!Array.<dev.dataTypes.ServerOption>}
 */
dev.api.JsonParser.prototype.getServerOptions = function(jsonOptions) {
	return this.getArrayOfObject(jsonOptions, function(jsonOption) {
		return this.getServerOption(jsonOption);
	}, this);
};

/**
 * @param {*} jsonSetting
 * @return {dev.dataTypes.ServerSetting}
 */
dev.api.JsonParser.prototype.getServerSetting = function(jsonSetting) {
	if (goog.isObject(jsonSetting)) {
		/** @type {dev.dataTypes.ServerSetting.Type?} */
		var type = dev.dataTypes.ServerSetting.getType(jsonSetting['type']);
		/** @type {string} */
		var name = this.getString(jsonSetting['name']);
		var options = this.getServerOptions(jsonSetting['options']);

		if (type && name && options.length) {
			return new dev.dataTypes.ServerSetting(type, name, options);
		}
	}

	return null;
};

/**
 * @param {*} jsonSettings
 * @return {!Array.<dev.dataTypes.ServerSetting>}
 */
dev.api.JsonParser.prototype.getServerSettings = function(jsonSettings) {
	return this.getArrayOfObject(jsonSettings, function(jsonSetting) {
		return this.getServerSetting(jsonSetting);
	}, this);
};
