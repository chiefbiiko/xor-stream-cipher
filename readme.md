# xor-stream-cipher

[![build status](http://img.shields.io/travis/chiefbiiko/xor-stream-cipher.svg?style=flat)](http://travis-ci.org/chiefbiiko/xor-stream-cipher) [![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/xor-stream-cipher?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/xor-stream-cipher)

***

A simple `xor` stream cipher. Uses [`seed-bytes`](https://github.com/chiefbiiko/seed-bytes) for the key stream.

***

## Get it!

```
npm install --save xor-stream-cipher
```

***

## Usage

``` js
var XOR = require('xor-stream-cipher')
var thru = require('stream').PassThrough()

var plain = 'the money is in the attic'
var shared = '419'
var a = XOR(shared)
var b = XOR(shared)

function ondata (name, chunk) {
  console.log(name + ':', chunk.toString())
}

a.pipe(thru).pipe(b)

a.on('data', ondata.bind(null, 'alice'))
b.on('data', ondata.bind(null, 'bob'))

a.end(plain)
```

***

## API

### `XOR(init[, algo])`

Create a new `XOR` stream. `init` is the seed for a random byte generator used as key stream. `algo` indicates the algorithm to use for the internal random number generator, defaults to `'alea'`. Check out  [`seedrandom`](https://github.com/davidbau/seedrandom#other-fast-prng-algorithms) for a list of supported algorithms.

***

## License

[MIT](./license.md)
