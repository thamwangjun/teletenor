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
  var answerOptions = {}
  setCacheTime(answerOptions)
  setNextOffset(answerOptions, searchResponse.nextOffset)
  return context.answerInlineQuery(searchResponse.resultArr, answerOptions)
}

function setCacheTime (answerOptions) {
  answerOptions.cache_time = cacheTime
  return answerOptions
}

function setNextOffset (answerOptions, nextOffset) {
  if (nextOffset) {
    answerOptions.next_offset = nextOffset
  }
  return answerOptions
}
