var XOR = require('./index')
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
