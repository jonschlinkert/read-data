/*!
 * read-data <https://github.com/jonschlinkert/read-data>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

require('mocha');
var assert = require('assert');
var yaml = require('js-yaml');
var read = require('./');

describe('read-data', function() {
  describe('read', function() {
    describe('sync', function() {
      it('should read the YAML file', function() {
        assert.deepEqual(read.sync('fixtures/test.yaml'), {'a': {'b': 'c', 'd': true}});
      });

      it('should read the JSON file', function() {
        assert.deepEqual(read.sync('fixtures/test.json'), {'a': {'b': 'c'}});
      });
    });

    describe('async', function() {
      it('should read a JSON file', function(cb) {
        read('fixtures/test.json', function(err, data) {
          if (err) return cb(err);
          assert.deepEqual(data, {'a': {'b': 'c'}});
          cb();
        });
      });

      it('should read a YAML file', function(cb) {
        read('fixtures/test.yaml', function(err, data) {
          if (err) return cb(err);
          assert.deepEqual(data, {'a': {'b': 'c', 'd': true}});
          cb();
        });
      });
    });
  });

  describe('.json', function() {
    describe('sync', function() {
      it('should read a json file', function() {
        assert.deepEqual(read.json.sync('fixtures/test.json'), {'a': {'b': 'c'}});
      });
    });

    describe('async', function() {
      it('should read a json file asynchronously', function(cb) {
        read.json('fixtures/test.json', function(err, data) {
          if (err) return cb(err);
          assert.deepEqual(data, {'a': {'b': 'c'}});
          cb();
        });
      });
    });
  });

  describe('.yaml', function() {
    describe('sync', function() {
      it('should read the yaml file', function() {
        assert.deepEqual(read.yaml.sync('fixtures/test.yaml'), {'a': {'b': 'c', 'd': true}});
      });

      it('should read the yaml file synchronously.', function() {
        assert.deepEqual(read.yaml.sync('fixtures/test.yaml', 'utf8'), {'a': {'b': 'c', 'd': true}});
      });

      it('should support options.', function() {
        var data = read.yaml.sync('fixtures/test.yaml', {schema: yaml.FAILSAFE_SCHEMA});
        assert.deepEqual(data, {'a': {'b': 'c', 'd': 'true'}});
      });

      it('should throw an error when it cannot parse the file as yaml.', function() {
        assert.throws(function() {
          read.yaml.sync('README.md', 'utf8');
        }, yaml.YAMLException);
      });

      it('should throw an error when it cannot read the data.', function() {
        assert.throws(function() {
          read.yaml.sync('node_modules');
        }, /EISDIR/);
      });
    });

    describe('async', function() {
      it('should read the yaml file (async)', function(cb) {
        read.yaml('fixtures/test.yaml', function(err, data) {
          if (err) return cb(err);
          assert.deepEqual(data, {'a': {'b': 'c', 'd': true}});
          cb();
        });
      });

      it('should read the yaml file asynchronously.', function(cb) {
        read.yaml('fixtures/test.yaml', 'utf8', function(err, data) {
          if (err) return cb(err);
          assert.deepEqual(data, {'a': {'b': 'c', 'd': true}});
          cb();
        });
      });

      it('should support options.', function(cb) {
        read.yaml('fixtures/test.yaml', {schema: yaml.FAILSAFE_SCHEMA}, function(err, data) {
          if (err) return cb(err);
          assert.deepEqual(data, {'a': {'b': 'c', 'd': 'true'}});
          cb();
        });
      });

      it('should fail when it cannot parse the file as yaml.', function(cb) {
        read.yaml('index.js', function(err) {
          assert(err instanceof yaml.YAMLException);
          assert(err.message);
          assert(/index\.js/.test(err.message));
          cb();
        });
      });

      it('should fail when it cannot read the data.', function(cb) {
        read.yaml('__a__', function(err) {
          assert(err instanceof Error);
          assert(err.message);
          assert(/__a__/.test(err.message));
          cb();
        });
      });
    });
  });
});
