goog.provide('dev.api.JsonParser');

goog.require('goog.array');
goog.require('napp.api.server.JsonParser');
goog.require('dev.dataTypes.Option');
goog.require('dev.dataTypes.Option.Type');
goog.require('dev.dataTypes.Section');
goog.require('dev.dataTypes.Tab');
goog.require('dev.dataTypes.option.Action');
goog.require('dev.dataTypes.option.Radio');


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
 * @return {dev.dataTypes.Option}
 */
dev.api.JsonParser.prototype.getOption = function(jsonOption) {
	if (goog.isObject(jsonOption)) {
		/** @type {string} */
		var name = this.getString(jsonOption['name']);
		/** @type {dev.dataTypes.Option.Type?} */
		var type = dev.dataTypes.Option.getType(jsonOption['type']);

		if (name && type) {
			switch (type) {
				case dev.dataTypes.Option.Type.ACTION:
					var jsonValue = jsonOption['value'];

					if (goog.isObject(jsonValue)) {
						return new dev.dataTypes.option.Action({
							name: name,
							value: jsonValue
						});
					}

					break;

				case dev.dataTypes.Option.Type.RADIO:
					/** @type {string} */
					var key = this.getString(jsonOption['key']);
					var jsonItems = jsonOption['items'];
					/** @type {!Array.<dev.dataTypes.option.Radio.Item>} */
					var items = [];

					if (goog.isArray(jsonItems)) {
						goog.array.forEach(jsonItems, function(jsonItem) {
							/** @type {string} */
							var name = this.getString(jsonItem['name']);

							if (name) {
								items.push({
									name: name,
									value: jsonItem['value']
								});
							}
						}, this);
					}

					if (key && items[0]) {
						return new dev.dataTypes.option.Radio({
							key: key,
							items: items,
							name: name
						});
					}

					break;
			}
		}
	}

	return null;
};

/**
 * @param {*} jsonOptions
 * @return {!Array.<dev.dataTypes.Option>}
 */
dev.api.JsonParser.prototype.getOptions = function(jsonOptions) {
	return this.getArrayOfObject(jsonOptions, this.getOption, this);
};

/**
 * @param {*} jsonSection
 * @return {dev.dataTypes.Section}
 */
dev.api.JsonParser.prototype.getSection = function(jsonSection) {
	if (goog.isObject(jsonSection)) {
		/** @type {string} */
		var name = this.getString(jsonSection['name']);
		/** @type {!Array.<dev.dataTypes.Option>} */
		var options = this.getOptions(jsonSection['options']);

		if (name && options[0]) {
			return new dev.dataTypes.Section({
				name: name,
				options: options
			});
		}
	}

	return null;
};

/**
 * @param {*} jsonSections
 * @return {!Array.<dev.dataTypes.Section>}
 */
dev.api.JsonParser.prototype.getSections = function(jsonSections) {
	return this.getArrayOfObject(jsonSections, this.getSection, this);
};

/**
 * @param {*} jsonTab
 * @return {dev.dataTypes.Tab}
 */
dev.api.JsonParser.prototype.getTab = function(jsonTab) {
	if (goog.isObject(jsonTab)) {
		/** @type {string} */
		var name = this.getString(jsonTab['name']);
		/** @type {!Array.<dev.dataTypes.Section>} */
		var sections = this.getSections(jsonTab['sections']);

		if (name && sections[0]) {
			return new dev.dataTypes.Tab({
				name: name,
				sections: sections
			});
		}
	}

	return null;
};

/**
 * @param {*} jsonTabs
 * @return {!Array.<dev.dataTypes.Tab>}
 */
dev.api.JsonParser.prototype.getTabs = function(jsonTabs) {
	return this.getArrayOfObject(jsonTabs, this.getTab, this);
};
