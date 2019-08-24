const Logger = require('../logger/Logger')
const cacheTime = process.env.TELEGRAM_INLINE_RESPONSE_CACHE_TIME || 300

const processQueryProto = {
  processQuery: processQuery
}

module.exports = processQueryProto

function processQuery (context) {
  var userLangCode = context.inlineQuery.from.language_code

  return this.tenorSearcher.search(context, userLangCode)
    .then(this.tenorSearcher.convertTenorResults)
    .then(answerQuery)
    .catch(Logger.logError)
}

function answerQuery (searchResponse) {
  var context = searchResponse.context
  return context.answerInlineQuery(searchResponse.resultArr, { 'cache_time': cacheTime })
}
