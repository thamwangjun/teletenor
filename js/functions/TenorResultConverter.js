const TenorSearchResponse = require('../structs/TenorSearchResponse')

module.exports = {
  convertTenorResults: convertTenorResults
}

function convertTenorResults (responseObj) {
  var inlineQueryResultMpeg4GifArr = []
  var searchResponse = TenorSearchResponse(responseObj.res)
  searchResponse.results.forEach(gifObj => {
    inlineQueryResultMpeg4GifArr.push(this.extractDataHandle.extractData(gifObj))
  })
  return {
    resultArr: inlineQueryResultMpeg4GifArr,
    context: responseObj.context
  }
}
