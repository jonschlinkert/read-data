/*!
 * read-data <https://github.com/jonschlinkert/read-data>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var fs = require('graceful-fs');
var path = require('path');
var waterfall = require('run-waterfall');

var INI = require('ini');
var YAML = require('read-yaml');
var CSON = require('cson-parser');
var TOML = require('toml');

var file = module.exports = {};

/**
 * Read INI file asynchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * file.readIni('config.ini', function(err, data) {
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
file.readINI = file.readIni = function _readIni(filepath, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  waterfall([
    function (next) { fs.readFile(filepath, 'utf8', next); },
    function (contents, next) {
      try {
        next(null, INI.parse(contents));
      } catch (err) {
        err.message = 'readIni() failed to parse "' + filepath + '": ' + err.message;
        next(err);
      }
    }
  ],
  callback);
};

/**
 * Read INI file synchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * var config = file.readIniSync('config.ini');
 * ```
 *
 * @param {String} `filepath` path of the file to read.
 * @return {Object} JSON
 * @api public
 */
file.readINISync = file.readIniSync = function _readINISync(filepath) {
  var buffer = fs.readFileSync(filepath).toString();
  try {
    return INI.parse(buffer);
  } catch (err) {
    err.message = 'readIniSync() failed to parse "' + filepath + '": ' + err.message;
    throw err;
  }
};

/**
 * Read JSON file asynchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * file.readJson('config.json', function(err, data) {
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
file.readJSON = file.readJson = function _readJSON(filepath, options, callback) {
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
        err.message = 'readJson() failed to parse "' + filepath + '": ' + err.message;
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
 * var config = file.readJsonSync('config.json');
 * ```
 *
 * @param {String} `filepath` path of the file to read.
 * @return {Object} JSON
 * @api public
 */
file.readJSONSync = file.readJsonSync = function _readJSONSync(filepath) {
  var buffer = fs.readFileSync(filepath).toString();
  try {
    return JSON.parse(buffer);
  } catch (err) {
    err.message = 'readJsonSync() failed to parse "' + filepath + '": ' + err.message;
    throw err;
  }
};

/**
 * Read CSON file asynchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * file.readCson('config.cson', function(err, data) {
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
file.readCSON = file.readCson = function _readCSON(filepath, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  waterfall([
    function (next) { fs.readFile(filepath, 'utf8', next); },
    function (contents, next) {
      try {
        next(null, CSON.parse(contents));
      } catch (err) {
        err.message = 'readCson() failed to parse "' + filepath + '": ' + err.message;
        next(err);
      }
    }
  ],
  callback);
};

/**
 * Read CSON file synchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * var config = file.readCsonSync('config.cson');
 * ```
 *
 * @param {String} `filepath` path of the file to read.
 * @return {Object} JSON
 * @api public
 */
file.readCSONSync = file.readCsonSync = function _readCSONSync(filepath) {
  var buffer = fs.readFileSync(filepath).toString();
  try {
    return CSON.parse(buffer);
  } catch (err) {
    err.message = 'readCsonSync() failed to parse "' + filepath + '": ' + err.message;
    throw err;
  }
};

/**
 * Read TOML file asynchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * file.readToml('config.toml', function(err, data) {
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
file.readTOML = file.readToml = function _readTOML(filepath, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  waterfall([
    function (next) { fs.readFile(filepath, 'utf8', next); },
    function (contents, next) {
      try {
        next(null, TOML.parse(contents));
      } catch (err) {
        err.message = 'readToml() failed to parse "' + filepath + '": ' + err.message;
        next(err);
      }
    }
  ],
  callback);
};

/**
 * Read TOML file synchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * var config = file.readTomlSync('config.toml');
 * ```
 *
 * @param {String} `filepath` path of the file to read.
 * @return {Object} JSON
 * @api public
 */
file.readTOMLSync = file.readTomlSync = function _readTOMLSync(filepath) {
  var buffer = fs.readFileSync(filepath).toString();
  try {
    return TOML.parse(buffer);
  } catch (err) {
    err.message = 'readTomlSync() failed to parse "' + filepath + '": ' + err.message;
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
 * file.readYaml('config.yml', function(err, data) {
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
file.readYAML = file.readYaml = YAML;

/**
 * Read YAML file synchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * var config = file.readYamlSync('config.yml');
 * var config = file.readYaml.sync('config.yml');
 * ```
 *
 * @param {String} `filepath` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @return {Object} JSON
 * @api public
 */
file.readYAML.sync = file.readYaml.sync = YAML.sync;
file.readYAMLSync = file.readYamlSync = YAML.sync;

/**
 * Determine the reader based on extension, asynchronously
 *
 * **Example:**
 *
 * ```js
 * var file = require('read-data');
 *
 * file.readData('config.ini', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 *
 * file.readData('config.json', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 *
 * file.readData('config.cson', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 *
 * file.readData('config.toml', function(err, data) {
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
    case 'ini':
      reader = file.readINI;
      break;
    case 'json':
      reader = file.readJSON;
      break;
    case 'cson':
      reader = file.readCSON;
      break;
    case 'toml':
      reader = file.readTOML;
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
 * var configINI  = file.readDataSync('config.ini');
 * var configJSON = file.readDataSync('config.json');
 * var configCSON = file.readDataSync('config.cson');
 * var configTOML = file.readDataSync('config.toml');
 * var configYAML = file.readDataSync('config.yml');
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
    case 'ini':
      reader = file.readINISync;
      break;
    case 'json':
      reader = file.readJSONSync;
      break;
    case 'cson':
      reader = file.readCSONSync;
      break;
    case 'toml':
      reader = file.readTOMLSync;
      break;
    case 'yml':
    case 'yaml':
      reader = file.readYAMLSync;
      break;
  }
  return reader(filepath, options);
};

/**
 * Read optional JSON ([Read optional by Ben Alman](https://gist.github.com/2876125))
 *
 * @param {String} `filepath` path of the file to read.
 * @return {Object} JSON
 * @api public
 */
file.readOptionalJSON = file.readOptionalJson = function _readOptionalJSON(filepath) {
  var buffer = {};
  try {
    buffer = file.readJSONSync(filepath);
  } catch (e) {}
  return buffer;
};

/**
 * Read optional CSON ([Read optional by Ben Alman](https://gist.github.com/2876125))
 *
 * @param {String} `filepath` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @return {Object} JSON
 * @api public
 */
file.readOptionalCSON = file.readOptionalCson = function _readOptionalCSON(filepath, options) {
  var buffer = {};
  try {
    buffer = file.readCSONSync(filepath, options);
  } catch (e) {}
  return buffer;
};

/**
 * Read optional TOML ([Read optional by Ben Alman](https://gist.github.com/2876125))
 *
 * @param {String} `filepath` path of the file to read.
 * @return {Object} JSON
 * @api public
 */
file.readOptionalTOML = file.readOptionalToml = function _readOptionalTOML(filepath) {
  var buffer = {};
  try {
    buffer = file.readTOMLSync(filepath);
  } catch (e) {}
  return buffer;
};

/**
 * Read optional YAML ([Read optional by Ben Alman](https://gist.github.com/2876125))
 *
 * @param {String} `filepath` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @return {Object} JSON
 * @api public
 */
file.readOptionalYAML = file.readOptionalYaml = function _readOptionalYAML(filepath, options) {
  var buffer = {};
  try {
    buffer = file.readYAMLSync(filepath, options);
  } catch (e) {}
  return buffer;
};
