const queryProcessorPrototype = require('../functionPrototypes/QueryProcessorPrototype')
const dataExtractorFactory = require('../factories/DataExtractorFactory')
const tenorSearcherFactory = require('../factories/TenorSearcherFactory')

const mp4MediaFormatString = process.env.MP4_MEDIA_FORMAT || 'mp4'
const gifMediaFormatString = process.env.GIF_MEDIA_FORMAT || 'nanogif'
const resultLimit = process.env.TENOR_SEARCH_RESULT_LIMIT || 12

module.exports = {
  'createQueryProcessor': createQueryProcessor
}

function createQueryProcessor (tenorClient) {
  var dataExtractor = dataExtractorFactory.createDataExtractor(mp4MediaFormatString, gifMediaFormatString)
  var tenorSearcher = tenorSearcherFactory.createTenorSearcher(tenorClient, dataExtractor, resultLimit)

  var processor = {
    tenorClient: tenorClient,
    dataExtractor: dataExtractor,
    tenorSearcher: tenorSearcher
  }

  processor.processQuery = queryProcessorPrototype.processQuery.bind(processor)

  return processor
}
