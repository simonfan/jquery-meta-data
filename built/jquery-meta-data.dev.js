define('__jquery-meta-data/helpers',['require','exports','module','jquery','lodash'],function (require, exports, module) {
	

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

define('__jquery-meta-data/read',['require','exports','module','lodash','./helpers'],function (require, exports, module) {
	

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

define('__jquery-meta-data/set',['require','exports','module','lodash','./helpers'],function (require, exports, module) {
	

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

//     jquery-meta-data
//     (c) simonfan
//     jquery-meta-data is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module jquery-meta-data
 */

define('jquery-meta-data',['require','exports','module','jquery','lodash','./__jquery-meta-data/read','./__jquery-meta-data/set'],function (require, exports, module) {
	

	var $ = require('jquery'),
		_ = require('lodash');

	var read = require('./__jquery-meta-data/read'),
		set  = require('./__jquery-meta-data/set');

	/**
	 * Holds the sets of options.
	 *
	 * @prop metaSets
	 * @type Object
	 */
	var metaSets = {};


	/**
	 * Sets options
	 * @method metaData {Static}
	 *
	 */
	$.metaData = function jqMetaDataConfig() {

		if (_.isObject(arguments[0])) {
			// arguments = [sets]
			_.assign(metaSets, arguments[0]);
		} else {
			// arguments = [setName, set]
			metaSets[arguments[0]] = arguments[1];
		}
	};

	/**
	 *
	 *
	 * @param options   {Object}
	 *     @param parse     {Function}
	 *     @param stringify {Function}
	 *     @param replace   {Boolean}
	 *         whether to replace unparsed data with parsed data // defaults to true
	 * @param [key|values]   {String|Object}
	 * @param [value] {Whatever}
	 *
	 */
	$.prototype.metaData = function jqMetaData(options) {

		// get metaset if the options is a string.
		options = _.isString(options) ? metaSets[options] : options;

		if (arguments.length === 1) {
			// arguments = [options]
			// only options were passed. read all
			return read.all(this, options);

		} else if (arguments.length === 2) {

			if (_.isString(arguments[1])) {
				// arguments = [options, key];
				// read single
				return read.single(this, options, arguments[1]);
			} else if (_.isObject(arguments[1])) {
				// arguments = [options, values]
				// set multiple

				set.multiple(this, options, arguments[1]);

				return this;
			}
		} else {
			// arguments = [options, key, value]
			// set single
			set.single(this, options, arguments[1], arguments[2]);

			return this;
		}

	};

	/*

	$el.metaData({
		prefix: 'arch',
		parse: function (val) {

			// do parsing
			// ...

			return {
				val: 'value'
			}
		},

		stringify: function (data) {
			return data.key + data.whatever;
		}
	})


	*/


});

