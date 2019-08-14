require('dotenv').config()

var Telegram = require('../clients/Telegram')
var Tenor = require('../clients/Tenor')
const queryProcessorFactory = require('../factories/QueryProcessorFactory')

function start () {
  var telegramClient = Telegram.createClient()
  var tenorClient = Tenor.createClient(process.env.TENOR_CONTENT_FILTER, 'basic')
  var queryProcessor = queryProcessorFactory.createQueryProcessor(tenorClient)

  telegramClient.on('inline_query', queryProcessor.processQuery)
}

start()
