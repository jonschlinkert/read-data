/*!
 * read-data <https://github.com/jonschlinkert/read-data>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var should = require('should');
var path = require('path');
var file = require('../index');
var assert = require('assert');
var YAML = require('js-yaml');


var testIniPath = path.join('test', 'fixtures', 'test.ini');
var testJsonPath = path.join('test', 'fixtures', 'test.json');
var testCsonPath = path.join('test', 'fixtures', 'test.cson');
var testTomlPath = path.join('test', 'fixtures', 'test.toml');
var testYamlPath = path.join('test', 'fixtures', 'test.yaml');

var expectedJSON = {"foo": {"bar": "baz", "qux": true}};


describe('read and parse INI files', function () {
  it('should read the ini file asynchronously (file.readIni)', function (done) {
    file.readIni(testIniPath, function (err, actual) {
      actual.should.be.eql(expectedJSON);
      done();
    });
  });
  it('should read the ini file synchronously (file.readIniSync)', function (done) {
    var actual = file.readIniSync(testIniPath);
    actual.should.be.eql(expectedJSON);
    done();
  });
  it('should fail when it cannot parse the file as Ini.', function (done) {
    file.readIni(testJsonPath, function (err, res) {
      should.strictEqual(err, null);
      // console.log(res['{'], expectedJSON['foo'])
      should.notStrictEqual(res, expectedJSON)
      done();
    });
  });
});

describe('read and parse JSON files', function () {
  it('should read the json file asynchronously (file.readJson)', function (done) {
    file.readJson(testJsonPath, function (err, actual) {
      actual.should.be.eql(expectedJSON);
      done();
    });
  });
  it('should read the json file synchronously (file.readJsonSync)', function (done) {
    var actual = file.readJsonSync(testJsonPath);
    actual.should.be.eql(expectedJSON);
    done();
  });
  it('should fail when it cannot parse the file as JSON.', function (done) {
    file.readJson(testYamlPath, function (err) {
      should.notStrictEqual(err, null);
      err.should.have.property('message');
      should.ok(/readJson\(\)/.test(err.message))
      arguments.should.have.length(1);
      done();
    });
  });
});

describe('read and parse CSON files', function () {
  it('should read the cson file asynchronously (file.readCson)', function (done) {
    file.readCson(testCsonPath, function (err, actual) {
      actual.should.be.eql(expectedJSON);
      done();
    });
  });
  it('should read the cson file synchronously (file.readCsonSync)', function (done) {
    var actual = file.readCsonSync(testCsonPath);
    actual.should.be.eql(expectedJSON);
    done();
  });
  it('should fail when it cannot parse the file as CSON.', function (done) {
    file.readCson(testYamlPath, function (err) {
      should.notStrictEqual(err, null);
      err.should.have.property('message');
      should.ok(/readCson\(\)/.test(err.message))
      arguments.should.have.length(1);
      done();
    });
  });
});

describe('read and parse TOML files', function () {
  it('should read the toml file asynchronously (file.readToml)', function (done) {
    file.readToml(testTomlPath, function (err, actual) {
      actual.should.be.eql(expectedJSON);
      done();
    });
  });
  it('should read the toml file synchronously (file.readTomlSync)', function (done) {
    var actual = file.readTomlSync(testTomlPath);
    actual.should.be.eql(expectedJSON);
    done();
  });
  it('should fail when it cannot parse the file as TOML.', function () {
    file.readToml(testYamlPath, function (err) {
      err.should.be.an.instanceof(Error);
      err.should.have.property('message');
      err.message.should.contain('readToml()');
      arguments.should.have.length(1);
      done();
    });
  });
});

describe('file.readOptional*', function () {
  it('should read optional JSON', function (done) {
    file.readOptionalJson(testTomlPath).should.eql({});
    file.readOptionalJson(testJsonPath).should.eql(expectedJSON);
    done();
  });

  it('should read optional CSON', function (done) {
    file.readOptionalCson(testTomlPath).should.eql({});
    file.readOptionalCson(testCsonPath).should.eql(expectedJSON);
    done();
  });

  it('should read optional TOML', function (done) {
    file.readOptionalToml(testJsonPath).should.eql({});
    file.readOptionalToml(testTomlPath).should.eql(expectedJSON);
    done();
  });

  it('should read optional YAML', function (done) {
    file.readOptionalYaml(testIniPath).should.eql({});
    file.readOptionalYaml(testYamlPath).should.eql(expectedJSON);
    done();
  });
});

describe('file.readYaml', function () {
  it('should read the yaml file asynchronously.', function (done) {
    file.readYaml(testYamlPath, 'utf8', function (err, actual) {
      should.strictEqual(err, null);
      actual.should.eql(expectedJSON);
      done();
    });
  });
  it('should support options.', function (done) {
    var expected = {"foo": {"bar": "baz", "qux": "true"}};
    file.readYaml(testYamlPath, {schema: YAML.FAILSAFE_SCHEMA}, function (err, actual) {
      should.strictEqual(err, null);
      actual.should.eql(expected);
      done();
    });
  });
  it('should fail when it cannot parse the file as YAML.', function (done) {
    file.readYaml('index.js', function (err) {
      err.should.be.an.instanceof(YAML.YAMLException);
      err.should.have.property('message');
      err.message.should.containEql('index.js');
      arguments.should.have.length(1);
      done();
    });
  });
  it('should fail when it cannot read the file.', function (done) {
    file.readYaml('__foo__', function (err) {
      err.should.be.an.instanceof(Error);
      err.should.have.property('message');
      err.message.should.containEql('__foo__');
      arguments.should.have.length(1);
      done();
    });
  });
});

describe('file.readYamlSync', function () {
  it('should read the yaml file synchronously.', function (done) {
    file.readYamlSync(testYamlPath, 'utf8').should.eql(expectedJSON);
    done();
  });
  it('should support options.', function (done) {
    var expected = {"foo": {"bar": "baz", "qux": "true"}};
    var actual = file.readYamlSync(testYamlPath, {schema: YAML.FAILSAFE_SCHEMA});
    actual.should.eql(expected);
    done();
  });
  it('should throw an error when it cannot parse the file as YAML.', function (done) {
    (function() {
      file.readYamlSync('index.js', 'utf8');
    }).should.throw(YAML.YAMLException);
    done();
  });
  it('should throw an error when it cannot read the file.', function () {
    (function() {
      file.readYamlSync('node_modules');
    }).should.throw(/EISDIR/);
  });
});

describe('file.readData asynchronously', function () {
  it('should read the INI file automatically', function (done) {
    file.readData(testIniPath, function (err, actual) {
      actual.should.be.eql(expectedJSON);
      done();
    });
  });

  it('should read the JSON file automatically', function (done) {
    file.readData(testJsonPath, function (err, actual) {
      actual.should.be.eql(expectedJSON);
      done();
    });
  });

  it('should read the CSON file automatically', function (done) {
    file.readData(testCsonPath, function (err, actual) {
      actual.should.be.eql(expectedJSON);
      done();
    });
  });

  it('should read the TOML file automatically', function (done) {
    file.readData(testTomlPath, function (err, actual) {
      actual.should.be.eql(expectedJSON);
      done();
    });
  });

  it('should read the YAML file automatically', function (done) {
    file.readData(testYamlPath, function (err, actual) {
      actual.should.be.eql(expectedJSON);
      done();
    });
  });
});

describe('file.readDataSync', function () {
  it('should read the INI file automatically', function (done) {
    var actual = file.readDataSync(testIniPath);
    actual.should.be.eql(expectedJSON);
    done();
  });

  it('should read the JSON file automatically', function (done) {
    var actual = file.readDataSync(testJsonPath);
    actual.should.be.eql(expectedJSON);
    done();
  });

  it('should read the CSON file automatically', function (done) {
    var actual = file.readDataSync(testCsonPath);
    actual.should.be.eql(expectedJSON);
    done();
  });

  it('should read the TOML file automatically', function (done) {
    var actual = file.readDataSync(testTomlPath);
    actual.should.be.eql(expectedJSON);
    done();
  });

  it('should read the YAML file automatically', function (done) {
    var actual = file.readDataSync(testYamlPath);
    actual.should.be.eql(expectedJSON);
    done();
  });
});

