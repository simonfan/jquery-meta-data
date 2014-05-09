define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var helpers = require('./helpers');

	/**
	 *
	 *
	 */
	exports.single = function setSingle(el, o, key, value) {

		// get the full key
		var fullKey = helpers.fullKey(o.prefix, key);

		// stringify if needed.
		value = o.stringify ? o.stringify(value, key, fullKey) : value;

		// set
		el.data(fullKey, value);
	};

	/**
	 *
	 *
	 *
	 */
	exports.multiple = function setMultiple(el, o, values) {
		_.each(values, function (value, key) {
			exports.single(el, o, key, value);
		});
	};

});
