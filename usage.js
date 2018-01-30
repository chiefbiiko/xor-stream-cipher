var passthru = require('stream').PassThrough
var XOR = require('./index')

var plain = Buffer.from('the money is in the attic')
var shared = Buffer.from([ 4, 1, 9 ])
var a = XOR(shared)
var b = XOR(shared)
var thru = passthru()

function ondata (name, chunk) {
  console.log(name + ':', chunk.toString())
}

a.pipe(thru).pipe(b)

a.on('data', ondata.bind(null, 'alice'))
b.on('data', ondata.bind(null, 'bob'))

a.end(plain)
