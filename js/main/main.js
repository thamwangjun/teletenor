require('dotenv').config()

const Telegram = require('../clients/Telegram')
const Tenor = require('../clients/Tenor')
const queryProcessorFactory = require('../factories/QueryProcessorFactory')
const TenorShareRegistrar = require('../functions/TenorShareRegistrar')

const registerSharePerSecond = process.env.REGISTER_SHARE_PER_SECOND || 100

function start () {
  var tenorClient = Tenor.createClient(process.env.TENOR_CONTENT_FILTER, 'basic')
  var telegramClient = Telegram.createClient(tenorClient)
  var queryProcessor = queryProcessorFactory.createQueryProcessor(tenorClient)

  telegramClient.on('inline_query', queryProcessor.processQuery)
  TenorShareRegistrar.listenForChosenInlineResult(telegramClient, registerSharePerSecond, tenorClient)
}

start()
