const TenorResultConverter = require('../functions/TenorResultConverter')

module.exports = {
  'createTenorSearcher': createTenorSearcher
}

function createTenorSearcher (tenorClient, extractDataHandle, resultLimit) {
  var searcher = {
    client: tenorClient,
    extractDataHandle: extractDataHandle,
    resultLimit: resultLimit
  }

  searcher.search = searchFunc.bind(searcher)
  searcher.convertTenorResults = TenorResultConverter.convertTenorResults.bind(searcher)

  return searcher
}

function searchFunc (context, locale) {
  return this.client.searchTenorGifsWithQuery(context, context.inlineQuery.query, locale, this.resultLimit, context.inlineQuery.offset)
}
