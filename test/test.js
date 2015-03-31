/*!
 * read-data <https://github.com/jonschlinkert/read-data>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

require('should');
var path = require('path');
var file = require('../index');
var assert = require('assert');
var YAML = require('js-yaml');


var testJsonPath = path.join('test', 'fixtures', 'test.json');
var testJsonContents = {"foo": {"bar": "baz"}};

var testYamlPath = path.join('test', 'fixtures', 'test.yaml');
var testYamlContents = {"foo": {"bar": "baz", "qux": true}};

describe('file.readJSONSync', function () {
  it('should read the json file', function () {
    var expected = testJsonContents;
    var actual = file.readJSONSync(testJsonPath);
    actual.should.be.eql(expected);
  });
});

describe('file.readJSON', function () {
  it('should read the json file (async)', function (done) {
    var expected = testJsonContents;
    file.readJSON(testJsonPath, function (err, actual) {
      actual.should.be.eql(expected);
      done();
    });
  });
});

// describe('file.readYAMLSync', function () {
//   it('should read the yaml file', function () {
//     var expected = testYamlContents;
//     var actual = file.readYAMLSync(testYamlPath);
//     actual.should.be.eql(expected);
//   });
// });

// describe('file.readYAML', function () {
//   it('should read the yaml file (async)', function (done) {
//     var expected = testYamlContents;
//     file.file.readYAML(testYamlPath, function (err, actual) {
//       actual.should.be.eql(expected);
//       done();
//     });
//   });
// });

describe('file.readYAML', function () {
  it('should read the yaml file asynchronously.', function (done) {
    var expected = testYamlContents;
    file.readYAML(testYamlPath, 'utf8', function (err, actual) {
      assert.equal(err == null, true);
      actual.should.eql(expected);
      done();
    });
  });
  it('should support options.', function (done) {
    var expected = {"foo": {"bar": "baz", "qux": "true"}};
    file.readYAML(testYamlPath, {schema: YAML.FAILSAFE_SCHEMA}, function (err, actual) {
      assert.equal(err == null, true);
      actual.should.eql(expected);
      done();
    });
  });
  it('should fail when it cannot parse the file as YAML.', function (done) {
    file.readYAML('index.js', function (err) {
      err.should.be.an.instanceof(YAML.YAMLException);
      err.should.have.property('message');
      err.message.should.containEql('index.js');
      arguments.should.have.length(1);
      done();
    });
  });
  it('should fail when it cannot read the file.', function (done) {
    file.readYAML('__foo__', function (err) {
      err.should.be.an.instanceof(Error);
      err.should.have.property('message');
      err.message.should.containEql('__foo__');
      arguments.should.have.length(1);
      done();
    });
  });
});

describe('file.readYAMLSync', function () {
  it('should read the yaml file synchronously.', function () {
    file.readYAMLSync(testYamlPath, 'utf8').should.eql(testYamlContents);
  });
  it('should support options.', function () {
    var expected = {"foo": {"bar": "baz", "qux": "true"}};
    var actual = file.readYAMLSync(testYamlPath, {schema: YAML.FAILSAFE_SCHEMA});
    actual.should.eql(expected);
  });
  it('should throw an error when it cannot parse the file as YAML.', function () {
    (function() {
      file.readYAMLSync('README.md', 'utf8');
    }).should.throw(YAML.YAMLException);
  });
  it('should throw an error when it cannot read the file.', function () {
    (function() {
      file.readYAMLSync('node_modules');
    }).should.throw(/EISDIR/);
  });
});

describe('file.readDataSync', function () {
  it('should read the YAML file automatically', function () {
    var expected = testYamlContents;
    var actual = file.readDataSync(testYamlPath);
    actual.should.be.eql(expected);
  });

  it('should read the JSON file automatically', function () {
    var expected = testJsonContents;
    var actual = file.readDataSync(testJsonPath);
    actual.should.be.eql(expected);
  });
});

describe('file.readData', function () {
  it('should read the JSON file automatically (async)', function (done) {
    var expected = testJsonContents;
    file.readData(testJsonPath, function (err, actual) {
      actual.should.be.eql(expected);
      done();
    });
  });

  it('should read the YAML file automatically (async)', function (done) {
    var expected = testYamlContents;
    file.readData(testYamlPath, function (err, actual) {
      actual.should.be.eql(expected);
      done();
    });
  });
});
