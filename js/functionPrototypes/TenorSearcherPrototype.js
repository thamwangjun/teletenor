var searchTenorProto = {
  'searchHandlingFunction': searchHandlingFunction,
  'search': search
}

module.exports = searchTenorProto

function search (context, locale) {
  return this.client.searchTenorGifsWithQuery(context, context.inlineQuery.query, locale, this.resultLimit).then(this.searchHandlingFunction)
}

function searchHandlingFunction (responseObj) {
  var inlineQueryResultMpeg4GifArr = []
  responseObj.res.results.forEach(gifObj => {
    inlineQueryResultMpeg4GifArr.push(this.extractDataHandle.extractData(gifObj))
  })
  return {
    resultArr: inlineQueryResultMpeg4GifArr,
    context: responseObj.context
  }
}
