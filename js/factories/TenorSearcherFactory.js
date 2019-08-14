const tenorSearcherPrototype = require('../functionPrototypes/TenorSearcherPrototype')

module.exports = {
  'createTenorSearcher': createTenorSearcher
}

function createTenorSearcher (tenorClient, extractDataHandle, resultLimit) {
  var searcher = {
    client: tenorClient,
    extractDataHandle: extractDataHandle,
    resultLimit: resultLimit
  }

  searcher.search = tenorSearcherPrototype.search.bind(searcher)
  searcher.searchHandlingFunction = tenorSearcherPrototype.searchHandlingFunction.bind(searcher)

  return searcher
}
