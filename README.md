# read-data [![NPM version](https://badge.fury.io/js/read-data.svg)](http://badge.fury.io/js/read-data)  [![Build Status](https://travis-ci.org/jonschlinkert/read-data.svg)](https://travis-ci.org/jonschlinkert/read-data) 

> Utils for reading data/config files like INI, JSON, CSON, YAML, TOML.

## Install with [npm](npmjs.org)

```bash
npm i read-data --save
```

## API
### [.readINI](./index.js#L39)

Read INI file asynchronously and parse content as JSON

* `filepath` **{String}**: path of the file to read.    
* `callback` **{Function}**: callback function    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

file.readIni('config.ini', function(err, data) {
  if (err) throw err;
  console.log(data);
});
```

### [.readINISync](./index.js#L73)

Read INI file synchronously and parse content as JSON

* `filepath` **{String}**: path of the file to read.    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

var config = file.readIniSync('config.ini');
```

### [.readJSON](./index.js#L102)

Read JSON file asynchronously and parse content as JSON

* `filepath` **{String}**: path of the file to read.    
* `callback` **{Function}**: callback function    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

file.readJson('config.json', function(err, data) {
  if (err) throw err;
  console.log(data);
});
```

### [.readJSONSync](./index.js#L136)

Read JSON file synchronously and parse content as JSON

* `filepath` **{String}**: path of the file to read.    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

var config = file.readJsonSync('config.json');
```

### [.readCSON](./index.js#L165)

Read CSON file asynchronously and parse content as JSON

* `filepath` **{String}**: path of the file to read.    
* `callback` **{Function}**: callback function    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

file.readCson('config.cson', function(err, data) {
  if (err) throw err;
  console.log(data);
});
```

### [.readCSONSync](./index.js#L199)

Read CSON file synchronously and parse content as JSON

* `filepath` **{String}**: path of the file to read.    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

var config = file.readCsonSync('config.cson');
```

### [.readTOML](./index.js#L228)

Read TOML file asynchronously and parse content as JSON

* `filepath` **{String}**: path of the file to read.    
* `callback` **{Function}**: callback function    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

file.readToml('config.toml', function(err, data) {
  if (err) throw err;
  console.log(data);
});
```

### [.readTOMLSync](./index.js#L262)

Read TOML file synchronously and parse content as JSON

* `filepath` **{String}**: path of the file to read.    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

var config = file.readTomlSync('config.toml');
```

### [.readYAML](./index.js#L292)

Read YAML file asynchronously and parse content as JSON

* `filepath` **{String}**: path of the file to read.    
* `options` **{Object|String}**: to pass to [js-yaml]    
* `cb` **{Function}**: callback function    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

file.readYaml('config.yml', function(err, data) {
  if (err) throw err;
  console.log(data);
});
```

### [.readYAMLSync](./index.js#L311)

Read YAML file synchronously and parse content as JSON

* `filepath` **{String}**: path of the file to read.    
* `options` **{Object|String}**: to pass to [js-yaml]    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

var config = file.readYamlSync('config.yml');
var config = file.readYaml.sync('config.yml');
```

### [.readData](./index.js#L354)

Determine the reader based on extension, asynchronously

* `filepath` **{String}**: path of the file to read.    
* `options` **{Object|String}**: to pass to [js-yaml]    
* `cb` **{Function}**: callback function    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

file.readData('config.ini', function(err, data) {
  if (err) throw err;
  console.log(data);
});

file.readData('config.json', function(err, data) {
  if (err) throw err;
  console.log(data);
});

file.readData('config.cson', function(err, data) {
  if (err) throw err;
  console.log(data);
});

file.readData('config.toml', function(err, data) {
  if (err) throw err;
  console.log(data);
});

file.readData('config.yml', function(err, data) {
  if (err) throw err;
  console.log(data);
});
```

### [.readDataSync](./index.js#L403)

Determine the reader based on extension, synchronously

* `filepath` **{String}**: path of the file to read.    
* `options` **{Object|String}**: to pass to [js-yaml]    
* `returns` **{Object}**: JSON  

**Example:**

```js
var file = require('read-data');

var configINI  = file.readDataSync('config.ini');
var configJSON = file.readDataSync('config.json');
var configCSON = file.readDataSync('config.cson');
var configTOML = file.readDataSync('config.toml');
var configYAML = file.readDataSync('config.yml');
```

### [.readOptionalJSON](./index.js#L435)

* `filepath` **{String}**: path of the file to read.    
* `returns` **{Object}**: JSON  

Read optional JSON ([Read optional by Ben Alman](https://gist.github.com/2876125))

### [.readOptionalCSON](./index.js#L451)

* `filepath` **{String}**: path of the file to read.      
* `returns` **{Object}**: JSON  

Read optional CSON ([Read optional by Ben Alman](https://gist.github.com/2876125))

### [.readOptionalTOML](./index.js#L466)

* `filepath` **{String}**: path of the file to read.    
* `returns` **{Object}**: JSON  

Read optional TOML ([Read optional by Ben Alman](https://gist.github.com/2876125))

### [.readOptionalYAML](./index.js#L482)

* `filepath` **{String}**: path of the file to read.    
* `options` **{Object|String}**: to pass to [js-yaml]    
* `returns` **{Object}**: JSON  

Read optional YAML ([Read optional by Ben Alman](https://gist.github.com/2876125))

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014-2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on March 31, 2015._

[js-yaml]: https://github.com/nodeca/js-yaml
