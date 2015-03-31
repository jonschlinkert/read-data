/*!
 * read-data <https://github.com/jonschlinkert/read-data>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/* deps:mocha */
require('should');
var path = require('path');
var assert = require('assert');
var YAML = require('js-yaml');
var read = require('./');

describe('json', function () {
  describe('.json.sync()', function () {
    it('should read a json file', function () {
      read.json.sync('fixtures/test.json').should.be.eql({'a': {'b': 'c'}});
    });
  });

  describe('.json()', function () {
    it('should read a json file asynchronously', function (done) {
      read.json('fixtures/test.json', function (err, actual) {
        actual.should.be.eql({'a': {'b': 'c'}});
        done();
      });
    });
  });
});

describe('.yaml.sync()', function () {
  it('should read the yaml file', function () {
    read.yaml.sync('fixtures/test.yaml').should.be.eql({'a': {'b': 'c', 'd': true}});
  });
});

describe('.yaml()', function () {
  it('should read the yaml file (async)', function (done) {
    read.yaml('fixtures/test.yaml', function (err, actual) {
      actual.should.be.eql({'a': {'b': 'c', 'd': true}});
      done();
    });
  });
});

describe('.yaml()', function () {
  it('should read the yaml file asynchronously.', function (done) {
    read.yaml('fixtures/test.yaml', 'utf8', function (err, actual) {
      assert.equal(err == null, true);
      actual.should.eql({'a': {'b': 'c', 'd': true}});
      done();
    });
  });
  it('should support options.', function (done) {
    read.yaml('fixtures/test.yaml', {schema: YAML.FAILSAFE_SCHEMA}, function (err, actual) {
      assert.equal(err == null, true);
      actual.should.eql({'a': {'b': 'c', 'd': 'true'}});
      done();
    });
  });
  it('should fail when it cannot parse the file as YAML.', function (done) {
    read.yaml('index.js', function (err) {
      err.should.be.an.instanceof(YAML.YAMLException);
      err.should.have.property('message');
      err.message.should.containEql('index.js');
      arguments.should.have.length(1);
      done();
    });
  });
  it('should fail when it cannot read the data.', function (done) {
    read.yaml('__a__', function (err) {
      err.should.be.an.instanceof(Error);
      err.should.have.property('message');
      err.message.should.containEql('__a__');
      arguments.should.have.length(1);
      done();
    });
  });
});

describe('.yaml.sync()', function () {
  it('should read the yaml file synchronously.', function () {
    read.yaml.sync('fixtures/test.yaml', 'utf8').should.eql({'a': {'b': 'c', 'd': true}});
  });
  it('should support options.', function () {
    var actual = read.yaml.sync('fixtures/test.yaml', {schema: YAML.FAILSAFE_SCHEMA});
    actual.should.eql({'a': {'b': 'c', 'd': 'true'}});
  });
  it('should throw an error when it cannot parse the file as YAML.', function () {
    (function() {
      read.yaml.sync('README.md', 'utf8');
    }).should.throw(YAML.YAMLException);
  });
  it('should throw an error when it cannot read the data.', function () {
    (function() {
      read.yaml.sync('node_modules');
    }).should.throw(/EISDIR/);
  });
});

describe('.data.sync()', function () {
  it('should read the YAML file automatically', function () {
    read.data.sync('fixtures/test.yaml').should.be.eql({'a': {'b': 'c', 'd': true}});
  });

  it('should read the JSON file automatically', function () {
    read.data.sync('fixtures/test.json').should.be.eql({'a': {'b': 'c'}});
  });
});

describe('.data()', function () {
  it('should read the JSON file automatically (async)', function (done) {
    read.data('fixtures/test.json', function (err, actual) {
      actual.should.be.eql({'a': {'b': 'c'}});
      done();
    });
  });

  it('should read the YAML file automatically (async)', function (done) {
    read.data('fixtures/test.yaml', function (err, actual) {
      actual.should.be.eql({'a': {'b': 'c', 'd': true}});
      done();
    });
  });
});
