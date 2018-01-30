var tape = require('tape')
var passthru = require('stream').PassThrough
var XOR = require('./index')

tape('simple xor cipher', function (t) {

  var plain = Buffer.from('the money is in the attic'.repeat(419))
  var shared = Buffer.from([ 4, 1, 9 ])
  var a = XOR(shared)
  var b = XOR(shared)
  var thru = passthru()
  var chunks = []

  a.pipe(thru).pipe(b)

  b.on('data', function (chunk) {
    chunks.push(chunk)
  })

  b.on('end', function () {
    t.true(Buffer.concat(chunks).equals(plain), 'xor de/cipher')
    t.end()
  })

  a.end(plain)

})
