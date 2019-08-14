const InlineQueryResultMpeg4Gif = require('../structs/InlineQueryResultMpeg4Gif')

module.exports = {
  'InlineQueryResultMpeg4Gif': InlineQueryResultMpeg4Gif,
  'createDataExtractor': createDataExtractor
}

function createDataExtractor (gifFormat, previewGifFormat) {
  var handle = {
    gifFormat: gifFormat,
    previewGifFormat: previewGifFormat
  }

  handle.extractData = extractData.bind(handle)

  return handle
}

function extractData (gifObj) {
  var data = {
    'id': gifObj.id
  }

  setTitle(gifObj, data)
  setCaptionLink(gifObj, data)

  extractDataFromMedia(gifObj.media, data, this.gifFormat, this.previewGifFormat)

  return InlineQueryResultMpeg4Gif(data)
}

function extractDataFromMedia (media, data, gifFormat, previewGifFormat) {
  media.forEach((mediaElement) => {
    if (mediaElement[gifFormat]) {
      setGifFormatProps(mediaElement[gifFormat], data)
    }
    if (mediaElement[previewGifFormat]) {
      setThumbUrl(mediaElement[previewGifFormat], data)
    }
  })
}

function setCaptionLink (gifObj, data) {
  data['caption'] = `_via_ [Tenor](${gifObj.itemurl})`
}

function setTitle (gifObj, data) {
  if (gifObj.title) {
    data['title'] = gifObj.title
  } else if (gifObj.itemurl) {
    setUrlResourceAsTitle(gifObj, data)
  }
}

function setUrlResourceAsTitle (gifObj, data) {
  var splitted = gifObj.itemurl.split('/')
  var lastSplittedObj = splitted[splitted.length - 1]
  data['title'] = lastSplittedObj
}

function setThumbUrl (mediaObject, data) {
  data['thumb_url'] = mediaObject.url
}

function setGifFormatProps (mediaObject, data) {
  setMp4Url(mediaObject, data)
  setMp4Dimensions(mediaObject, data)
}

function setMp4Url (mediaObject, data) {
  data['mpeg4_url'] = mediaObject.url
}

function setMp4Dimensions (mediaObject, data) {
  if (mediaObject['dims']) {
    data['mpeg4_width'] = mediaObject['dims'][0]
    data['mpeg4_height'] = mediaObject['dims'][1]
  }
}
