const struct = require('superstruct').struct
const InlineQueryResultMpeg4Gif = require('./InlineQueryResultMpeg4Gif')

const QueryAnswer = struct({
  resultArr: [InlineQueryResultMpeg4Gif],
  context: 'object',
  nextOffset: 'string?'
})

module.exports = QueryAnswer
