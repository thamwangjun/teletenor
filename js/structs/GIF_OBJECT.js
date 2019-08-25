const struct = require('superstruct').struct

const GIF_OBJECT = struct.interface({
  created: 'number',
  hasaudio: 'boolean?',
  id: 'string',
  media: ['object?'],
  tags: ['string?'],
  title: 'string?',
  itemurl: 'string',
  hascaption: 'boolean?',
  url: 'string'
})

module.exports = GIF_OBJECT
