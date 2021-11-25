# babel-plugin-safari-for-in-workaround

## Important!

This plugin is highly experimental at the moment, and the authors do not take any responsibility for any consequences of its usage.

The rewrite is _not_ fully equivalent and is likely to break some javascript code. The intention of the plugin is to rewrite the output of the elm-compiler to workaround the bug mentioned below, and it seems to do the job so far.

## Description

> Workaround for safari 15 for..in bug

This plugin intends to rewrite for-in loops in a way that should be compatible with a majority of browsers.

The main use case for this is to circumvent a bug in webkit as described [here](https://bugs.webkit.org/show_bug.cgi?id=230801)

The following browsers seems to be affected:

- Safari 15.0, 15.1
- Safari/webkit on iOS 15

## Example transform

### From

```js
// variant 1 - block body
for (var key in obj) {
  foo(key);
}

// variant 2 - expression body
for (var key in obj) foo(key);
```

### To

```js
// variant 1 - block body
for (let _keys = Object.keys(obj), _i = 0; _i < _keys.length; _i++) {
  var key = _keys[_i];
  foo(key);
}

// variant 2 - expression body
for (let _keys2 = Object.keys(obj), _i2 = 0; _i2 < _keys2.length; _i2++) {
  var key = _keys2[_i2];
  foo(key);
}
```
