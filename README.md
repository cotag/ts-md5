# Introduction

A MD5 implementation for TypeScript

* Can handle Unicode strings
* Supports incremental hashing
* Works with Files and Blobs

Based on work by

* Joseph Myers: http://www.myersdaily.org/joseph/javascript/md5-text.html
* André Cruz: https://github.com/satazor/SparkMD5
* Raymond Hill: https://github.com/gorhill/yamd5.js


## Usage

1. Import the class
     * `import {Md5} from 'ts-md5/dist/md5';`
2. Hash some things
     * `Md5.hashStr('blah blah blah')` => hex:string
     * `Md5.hashStr('blah blah blah', true)` => raw:Int32Array(4)
     * `Md5.hashAsciiStr('blah blah blah')` => hex:string
     * `Md5.hashAsciiStr('blah blah blah', true)` => raw:Int32Array(4)

For more complex uses:

```typescript

md5 = new Md5();

// Append incrementally your file or other input
// Methods are chainable
md5.appendStr('somestring')
    .appendAsciiStr('a different string')
    .appendByteArray(blob);

// Generate the MD5 hex string
md5.end();

```


## Building from src

The project is written in typescript and transpiled into ES5.

1. Install TypeScript: `npm install -g typescript` (if you haven't already)
2. Configure compile options in `tsconfig.json`
3. Perform build using: `tsc`

You can find more information here: https://github.com/Microsoft/TypeScript/wiki/tsconfig.json

## Type Definitions

These allow projects like jasmine to work with .ts files. This is here as a guide more than anything else.
See: https://github.com/typings/typings

1. Install typings: `npm install typings --global` (if you haven't already)
2. Download definitions: `typings install jasmine --ambient --save`
     * Note: ambient means we are searching in https://github.com/DefinitelyTyped/DefinitelyTyped
3. Reference the typings using `/// <reference path="../typings/main.d.ts" />` from tests

To update typings:

*  From command line run: `typings install`


## Scripts

1. Build Script: `npm run build`
2. Test Script: `npm run test`


## Publishing

1. Sign up to https://www.npmjs.com/
2. Configure `package.json` https://docs.npmjs.com/files/package.json
3. run `npm publish` https://docs.npmjs.com/cli/publish


# License

MIT
