# babel-plugin-safari-for-in-workaround

> Workaround for Safari for..in bug

This plugin intends to rewrite for-in loops in a way that should be compatible with a majority of browsers.

The main use case for this is to circumvent a bug in webkit as described [here](https://bugs.webkit.org/show_bug.cgi?id=230801)

The following browsers seems to be affected:

- Safari 15.0, 15.1
- Safari/webkit on iOS 15

## Install

Using npm:

```sh
npm install --save-dev babel-plugin-safari-for-in-workaround
```

or using yarn:

```sh
yarn add babel-plugin-safari-for-in-workaround --dev
```
