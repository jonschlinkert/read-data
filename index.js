/*!
 * read-data <https://github.com/jonschlinkert/read-data>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var path = require('path');
var fs = require('graceful-fs');
var waterfall = require('run-waterfall');
var yaml = require('read-yaml');
var file = module.exports = {};


/**
 * Read JSON file asynchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * file.readJSON('config.json', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 * ```
 *
 * @param {String} `filepath` path of the file to read.
 * @param {Function} `callback` callback function
 * @return {Object} JSON
 * @api public
 */
file.readJSON = function _readJSON(filepath, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  waterfall([
    function (next) { fs.readFile(filepath, 'utf8', next); },
    function (contents, next) {
      try {
        next(null, JSON.parse(contents));
      } catch (err) {
        err.message = 'Failed to parse "' + filepath + '": ' + err.message;
        next(err);
      }
    }
  ],
  callback);
};

/**
 * Read JSON file synchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * var config = file.readJSONSync('config.json');
 * ```
 *
 * @param {String} `filepath` path of the file to read.
 * @return {Object} JSON
 * @api public
 */
file.readJSONSync = function _readJSONSync(filepath) {
  var buffer = fs.readFileSync(filepath).toString();
  try {
    return JSON.parse(buffer);
  } catch (err) {
    err.message = 'Failed to parse "' + filepath + '": ' + err.message;
    throw err;
  }
};

/**
 * Read YAML file asynchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * file.readYAML('config.yml', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 * ```
 *
 * @param {String} `filepath` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @param {Function} `cb` callback function
 * @return {Object} JSON
 * @api public
 */
file.readYAML = file.readYaml = yaml;

/**
 * Read YAML file synchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * var config = file.readYAMLSync('config.yml');
 * var config = file.readYAML.sync('config.yml');
 * var config = file.readYaml.sync('config.yml');
 * ```
 *
 * @param {String} `filepath` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @return {Object} JSON
 * @api public
 */
file.readYAML.sync = file.readYaml.sync = yaml.sync;
file.readYAMLSync = file.readYamlSync = yaml.sync;

/**
 * Determine the reader based on extension, asynchronously
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * file.readData('config.json', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 *
 * file.readData('config.yml', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 * ```
 *
 * @param {String} `filepath` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @param {Function} `cb` callback function
 * @return {Object} JSON
 * @api public
 */
file.readData = function _readData(filepath, options, callback) {
  if (options && typeof options === 'function') {
    callback = options;
    options = {};
  }

  var ext = options.lang || path.extname(filepath).replace(/\./, '');
  var reader = file.readJSON;
  switch (ext) {
    case 'json':
      reader = file.readJSON;
      break;
    case 'yml':
    case 'yaml':
      reader = file.readYAML;
      break;
  }
  reader(filepath, options, callback);
};

/**
 * Determine the reader based on extension, synchronously
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * var configYAML = file.readDataSync('config.yml');
 * var configJSON = file.readDataSync('config.json');
 * ```
 *
 * @param {String} `filepath` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @return {Object} JSON
 * @api public
 */
file.readDataSync = function _readDataSync(filepath, options) {
  options = options || {};
  var ext = options.lang || path.extname(filepath).replace(/\./, '');
  var reader = file.readJSONSync;
  switch(ext) {
    case 'json':
      reader = file.readJSONSync;
      break;
    case 'yml':
    case 'yaml':
      reader = file.readYAMLSync;
      break;
  }
  return reader(filepath, options);
};

/**
 * [Read optional](https://gist.github.com/2876125) JSON by Ben Alman
 *
 * @param {String} `filepath` path of the file to read.
 * @return {Object} JSON
 * @api public
 */
file.readOptionalJSON = function _readOptionalJSON(filepath) {
  var buffer = {};
  try {
    buffer = file.readJSONSync(filepath);
  } catch (e) {}
  return buffer;
};

/**
 * [Read optional](https://gist.github.com/2876125) YAML by Ben Alman
 *
 * @param {String} `filepath` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @return {Object} JSON
 * @api public
 */
file.readOptionalYAML = function _readOptionalYAML(filepath, options) {
  var buffer = {};
  try {
    buffer = file.readYAMLSync(filepath, options);
  } catch (e) {}
  return buffer;
};
