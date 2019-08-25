const struct = require('superstruct').struct
const GIF_OBJECT = require('./GIF_OBJECT')

const TenorSearchResponse = struct.interface({
  next: 'string?',
  results: [GIF_OBJECT]
})

module.exports = TenorSearchResponse
