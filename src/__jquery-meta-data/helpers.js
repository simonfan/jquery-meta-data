define(function (require, exports, module) {
	'use strict';

	var $ = require('jquery'),
		_ = require('lodash');


//	/^prefix([A-Z$_].*$|$)/;

	/**
	 * Creates a Regular Expression to capture property name.
	 *
	 *
	 */
	exports.buildPrefixRegExp = function buildPrefixRegExp(prefix) {
		return new RegExp('^' + prefix + '([A-Z$_].*$)');
	};

	/**
	 * Returns the string with the first letter to lowercase.
	 */
	exports.lowercaseFirst = function lowercaseFirst(str) {
		return str.charAt(0).toLowerCase() + str.slice(1);
	};

	/**
	 * Returns the string with the first letter to uppercase.
	 */
	exports.uppercaseFirst = function uppercaseFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	/**
	 *
	 * @method fullKey
	 * @param prefix
	 * @param key
	 */
	exports.fullKey = function fullKey(prefix, key) {
		return prefix ? prefix + exports.uppercaseFirst(key) : key;
	};


});
