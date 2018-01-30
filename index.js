var Transform = require('stream').Transform
var inherits = require('util').inherits
var seed = require('seed-bytes')

function XOR (init, algo) {
  if (!(this instanceof XOR)) return new XOR(init, algo)
  Transform.call(this)
  this._next = seed(init, algo)
}

inherits(XOR, Transform)

XOR.prototype._nxor = function nxor (n, a, b) {
  var buf = Buffer.alloc(n)
  for (var i = 0; i < n; i++) buf[i] = a[i] ^ b[i]
  return buf
}

XOR.prototype._transform = function transform (chunk, _, next) {
  this.push(this._nxor(chunk.length, chunk, this._next(chunk.length)))
  next()
}

module.exports = XOR
