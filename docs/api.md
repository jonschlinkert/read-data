## JSON

### readJSON

Read JSON files asynchronously.

```js
var file = require('read-data');
file.readJSON('foo.json', callback);
```

### readJSONSync

Read JSON files synchronously.

```js
var file = require('read-data');
file.readJSONSync('foo.json');
```


## YAML

### readYAML

Read YAML files asynchronously.

```js
var file = require('read-data');
file.readYAML('foo.yaml', callback);
```

### readYAMLSync

Read YAML files synchronously.

```js
var file = require('read-data');
file.readYAMLSync('foo.yaml');
```


## Data (automatic)

Automatically read a JSON or YAML data file based on its file extension.

### readData

Read JSON or YAML files asynchronously.

```js
var file = require('read-data');
file.readData('foo.json', callback);
file.readData('foo.yml', callback);
```

### readDataSync

Read JSON or YAML files synchronously.

```js
var file = require('read-data');
file.readDataSync('foo.json');
file.readDataSync('foo.yml');
```

### lang

With the `readData` methods, you can also explicitly set the language to read by passing a `lang` option as a second parameter.

```js
file.readDataSync('foo.json', {lang: 'json'});
```

This is useful if you need to set this value dynamically.