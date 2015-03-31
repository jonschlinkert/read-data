/*!
 * read-data <https://github.com/jonschlinkert/read-data>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var yaml = require('read-yaml');

/**
 * Asynchronously read a YAML file.
 *
 * ```js
 * var yaml = require('read-data').yaml;
 *
 * yaml('foo.yml', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 * ```
 *
 * @param {String} `fp` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @param {Function} `cb` callback function
 * @return {Object} JSON
 * @api public
 */

exports.yaml = yaml;

/**
 * Synchronously read a YAML file.
 *
 * ```js
 * var yaml = require('read-data').yaml;
 * var data = yaml.sync('foo.yml');
 * ```
 *
 * @param {String} `fp` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @return {Object} JSON
 * @api public
 */

exports.yaml.sync = yaml.sync;

/**
 * Asynchronously read a JSON file.
 *
 * ```js
 * var json = require('read-data');
 *
 * json('foo.json', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 * ```
 *
 * @param {String} `fp` path of the file to read.
 * @param {Function} `callback` callback function
 * @return {Object} JSON
 * @api public
 */

function json(fp, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts; opts = {};
  }
  // opts param exists to maintain the same arity as the
  // yaml method, so we can dynamically choose the reader
  fs.readFile(fp, 'utf8', function (err, data) {
    if (err) cb(err);
    cb(null, JSON.parse(data));
  });
}

/**
 * Synchronously read a JSON file.
 *
 * ```js
 * var json = require('read-data').json;
 * var data = json.sync('foo.json');
 * ```
 *
 * @param {String} `fp` path of the file to read.
 * @return {Object} JSON
 * @api public
 */

json.sync = function jsonSync(fp) {
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch (err) {
    err.message = 'read-data failed to parse "' + fp + '": ' + err.message;
    throw err;
  }
};

/**
 * Asynchronously read a JSON or YAML file, automatically determining the
 * reader based on extension.
 *
 * ```js
 * var read = require('read-data');
 *
 * read('foo.json', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 *
 * read('foo.yml', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 * ```
 *
 * @param {String} `fp` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @param {Function} `cb` callback function
 * @return {Object} JSON
 * @api public
 */

function data(fp, opts, cb) {
  if (opts && typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  opts = opts || {};
  var ext = opts.lang || path.extname(fp);
  var reader = json;
  switch (ext) {
    case '.json':
      reader = json;
      break;
    case '.yml':
    case '.yaml':
      reader = yaml;
      break;
  }
  reader(fp, opts, cb);
}

/**
 * Synchronously read a data file, and automatically determine the
 * reader based on extension.
 *
 * ```js
 * var read = require('read-data');
 *
 * var yaml = read('foo.yml');
 * var json = read('foo.json');
 * ```
 *
 * @param {String} `fp` path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @return {Object} JSON
 * @api public
 */

data.sync = function dataSync(fp, opts) {
  opts = opts || {};
  var ext = opts.lang || path.extname(fp);
  var reader = json.sync;
  switch(ext) {
    case '.json':
      reader = json.sync;
      break;
    case '.yml':
    case '.yaml':
      reader = yaml.sync;
      break;
  }
  return reader(fp, opts);
};

/**
 * expose methods
 */

module.exports = {
  data: data,
  json: json,
  yaml: yaml,
};
