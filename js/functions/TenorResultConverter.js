const TenorSearchResponse = require('../structs/TenorSearchResponse')
const QueryAnswer = require('../structs/QueryAnswer')

module.exports = {
  convertTenorResults: convertTenorResults
}

function convertTenorResults (searchContextResponse) {
  var inlineQueryResultMpeg4GifArr = []
  var searchResponse = TenorSearchResponse(searchContextResponse.res)
  searchResponse.results.forEach(gifObj => {
    inlineQueryResultMpeg4GifArr.push(this.extractDataHandle.extractData(gifObj))
  })
  return QueryAnswer({
    resultArr: inlineQueryResultMpeg4GifArr,
    context: searchContextResponse.context,
    nextOffset: searchResponse.next
  })
}
