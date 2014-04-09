/**
 * read-data <https://github.com/assemble/read-data>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const fs = require('graceful-fs');
const async = require('async');
const YAML = require('js-yaml');
const file = module.exports = {};


// Read JSON file synchronously and parse content as JSON
file.readJSONSync = function(filepath) {
  var buffer = fs.readFileSync(filepath).toString();
  try {
    return JSON.parse(buffer);
  } catch (err) {
    err.message = 'Failed to parse "' + filepath + '": ' + err.message;
    throw err;
  }
};

// Read JSON file asynchronously and parse content as JSON
file.readJSON = function (filepath, callback) {
  async.waterfall([
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

// Read YAML file synchronously and parse content as JSON
file.readYAMLSync = function (filepath) {
  var buffer = fs.readFileSync(filepath).toString();
  try {
    return YAML.load(buffer);
  } catch (err) {
    err.message = 'Failed to parse "' + filepath + '": ' + err.message;
    throw err;
  }
};

// Read YAML file synchronously and parse content as JSON
file.readYAML = function (filepath, callback) {
  async.waterfall([
    function (next) { fs.readFile(filepath, 'utf8', next); },
    function (contents, next) {
      try {
        next(null, YAML.load(contents));
      } catch (err) {
        err.message = 'Failed to parse "' + filepath + '": ' + err.message;
        next(err);
      }
    }
  ],
  callback);
};

// Determine the reader based on extension.
file.readDataSync = function (filepath, options) {
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

// Determine the reader based on extension (async).
file.readData = function (filepath, options, callback) {
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
  reader(filepath, callback);
};

// Read optional JSON (Ben Alman <https://gist.github.com/2876125>)
file.readOptionalJSON = function(filepath) {
  var buffer = {};
  try {
    buffer = file.readJSONSync(filepath);
  } catch (e) {}
  return buffer;
};

file.readOptionalYAML = function(filepath) {
  var buffer = {};
  try {
    buffer = file.readYAMLSync(filepath);
  } catch (e) {}
  return buffer;
};
