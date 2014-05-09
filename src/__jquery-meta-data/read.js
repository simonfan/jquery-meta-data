define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var helpers = require('./helpers');

	function echo(d) {
		return d;
	}

	/**
	 *
	 *
	 */
	exports.all = function readAll(el, o) {


		var raw = el.data(),
			// prevents verification on looping
			parse = o.parse || echo;

		if (o.prefix) {
			// prefixed
			// [1] build prefixRe RegExp
			var prefixRe = helpers.buildPrefixRegExp(o.prefix);

			// [2] loop through raw properties
			return _.transform(raw, function (results, value, fullKey) {

				// [2.1] parse the fullKey
				var parsedKey = fullKey.match(prefixRe);
				// [2.2] if fullKey matches the parse, it means it has archData
				if (parsedKey) {

					// [3] parsedKey is an array contanining
					//  0: the full key string
					//  1: the unprefixedKey name (may not be undefined)
					//
					// set results accordingly

					// [4] get unprefixedKey
					var unprefixedKey = helpers.lowercaseFirst(parsedKey[1]);


					// [5] parse
					value = parse(value, unprefixedKey, fullKey);

					// [5.1] and replace if requested
					if (o.replace) {
						el.data(fullKey, value);
					}

					// [5] set
					results[unprefixedKey] = value;

				} // else it is a common raw attribute, so ignore

			});

		} else {
			// no prefix
			return _.mapValues(raw, function (value, fullKey) {
				return parse(value, fullKey, fullKey);
			})
		}

	}

	/**
	 *
	 * @method single
	 * @param el {jqObject}
	 * @param [prefix] {String}
	 * @param key {String}
	 * @param [parse] {Function}
	 */
	exports.single = function readSingle(el, o, key) {

		var fullKey = helpers.fullKey(o.prefix, key),
			value = el.data(fullKey);

		if (o.parse) {

			value = o.parse(value, key, fullKey);

			if (o.replace) {
				el.data(fullKey, value);
			}

		}// else: no parse, no need to replace

		return value;
	};


});
