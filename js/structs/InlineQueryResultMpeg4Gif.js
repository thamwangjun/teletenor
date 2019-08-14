const struct = require('superstruct').struct

const InlineQueryResultMpeg4Gif = struct({
  'type': 'string',
  'id': 'string',
  'title': 'string?',
  'caption': 'string?',
  'mpeg4_url': 'string',
  'thumb_url': 'string',
  'parse_mode': 'string?',
  'mpeg4_width': 'number?',
  'mpeg4_height': 'number?',
  'mpeg4_duration': 'number?'
}, {
  'type': 'mpeg4_gif',
  'parse_mode': 'Markdown',
  'caption': '_via_ [Tenor](http://tenor.com/)'
})

module.exports = InlineQueryResultMpeg4Gif
