const struct = require('superstruct').struct
const TenorSearchResponse = require('./TenorSearchResponse')

const SearchContextResponse = struct({
  res: TenorSearchResponse,
  context: 'object'
})

module.exports = SearchContextResponse
