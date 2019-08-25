require('dotenv').config()

const Telegram = require('../clients/Telegram')
const Tenor = require('../clients/Tenor')
const queryProcessorFactory = require('../factories/QueryProcessorFactory')
const TenorShareRegistrar = require('../functions/TenorShareRegistrar')

function start () {
  var tenorClient = Tenor.createClient(process.env.TENOR_CONTENT_FILTER, process.env.TENOR_MEDIA_FILTER)
  var telegramClient = Telegram.createClient(tenorClient)
  var queryProcessor = queryProcessorFactory.createQueryProcessor(tenorClient)

  telegramClient.on('inline_query', queryProcessor.processQuery)
  TenorShareRegistrar.listenForChosenInlineResult(telegramClient, tenorClient)
  return telegramClient
}

module.exports = {
  'teletenorBot': start()
}
