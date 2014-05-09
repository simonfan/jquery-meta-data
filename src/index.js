//     jquery-meta-data
//     (c) simonfan
//     jquery-meta-data is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module jquery-meta-data
 */

define(function (require, exports, module) {
	'use strict';

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
