module.exports = {
  convertTenorResults: convertTenorResults
}

function convertTenorResults (responseObj) {
  var inlineQueryResultMpeg4GifArr = []
  responseObj.res.results.forEach(gifObj => {
    inlineQueryResultMpeg4GifArr.push(this.extractDataHandle.extractData(gifObj))
  })
  return {
    resultArr: inlineQueryResultMpeg4GifArr,
    context: responseObj.context
  }
}
