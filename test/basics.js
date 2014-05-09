(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'jquery-meta-data',
		// dependencies for the test
		deps = [mod, 'should', 'jquery', 'lodash', 'text!/test/fixture.html'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(JqueryMetaData, should, $, _, fixture) {
	'use strict';

	describe('JqueryMetaData basics', function () {
		beforeEach(function (done) {

			this.$fixture = $(fixture).appendTo($('body'));

			this.archData = {
				el: '(this)',
				option1: 'root-1',
				option2: 'root-2',
				option3: 'require:/path-to-bananas',
				c: 'require:/path-to-module-c({ el, option2 }, option3)',
				b: 'require:/path-to-module-b({ el, dock:option1, option2 })',
				a: 'require:/path-to-module-a(el)'
			};

			done();
		});

		afterEach(function () {
			this.$fixture.remove();
		})

		it('reads prefixed data', function () {

			// all
			this.$fixture.metaData({ prefix: 'arch' })
				.should.eql(this.archData);

			// single
			this.$fixture.metaData({ prefix: 'arch' }, 'option3')
				.should.eql('require:/path-to-bananas');

		});

		it('sets prefixed data', function () {

			var $fixture = this.$fixture;

			// single-set
			$fixture.metaData({ prefix: 'arch' }, 'el', '(not-this)')
			// read
			.data('archEl').should.eql('(not-this)');
			$fixture.metaData({ prefix: 'arch' }, 'el').should.eql('(not-this)');

			// multi-set
			$fixture.metaData({ prefix: 'arch' }, {
				a: 'a',
				b: 'b',
				c: 'c'
			})
			// read
			.data('archA').should.eql('a');

			$fixture.data('archB').should.eql('b');
			$fixture.data('archC').should.eql('c');

			$fixture.metaData({ prefix: 'arch' }, 'a').should.eql('a');
		});

		it('can parse out data before returning', function () {

			var $fixture = this.$fixture;


			function fakeParse(value, key, fullKey) {
				return 'parsed-' + value;
			}

			// no replacing
			$fixture.metaData({
				prefix: 'arch',
				parse: fakeParse
			})
			.should.eql(_.mapValues(this.archData, fakeParse));

			// check no replacing
			$fixture.metaData({ prefix: 'arch' })
			.should.eql(this.archData);

		});

		it('can parse and replace the data', function () {
			var $fixture = this.$fixture;


			function fakeParse(value, key, fullKey) {
				return 'parsed-' + value;
			}

			// no replacing
			$fixture.metaData({
				prefix:  'arch',
				parse:   fakeParse,
				replace: true
			})
			.should.eql(_.mapValues(this.archData, fakeParse));

			// check that data was replaced
			$fixture.metaData({ prefix: 'arch' })
			.should.eql(_.mapValues(this.archData, fakeParse));
		});


		it('can stringify values on set', function () {
			var $fixture = this.$fixture;


			function fakeParse(value, key, fullKey) {
				return 'parsed-' + value;
			}

			function fakeStringify(value, key, fullKey) {
				return value.replace(/^parsed-/, '');
			}



			var metaOptions = {
					prefix:    'arch',
					parse:     fakeParse,
					stringify: fakeStringify
				},

				metaData = {
					lalala: 'parsed-lalala',
					whatever: 'parsed-whatever',
				};

			$fixture
				// set
				.metaData(metaOptions, metaData);

			// read to check
			var data = $fixture.data();

			data.archLalala.should.eql('lalala');
			data.archWhatever.should.eql('whatever');

		})

		it('is capable of storing metadata options', function () {

			var $fixture = this.$fixture;

			// store meta set
			$.metaData('arch', {
				prefix: 'arch'
			});

			$fixture.metaData('arch').should.eql(this.archData)

		})
	});
});
