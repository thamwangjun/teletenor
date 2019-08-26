const Telegraf = require('telegraf')
const Logger = require('../logger/Logger')
const commandPromise = require('../commands/constructCommandsPromise')

const loggingEnabled = process.env.LOGGING_ENABLED === 'true' || false
const launchDisabled = process.env.DISABLE_LAUNCH === 'true' || false

module.exports = {
  'createClient': createClient
}

var messageMarkdownOption = { 'parse_mode': 'HTML' }

function createClient (tenorClient) {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
  bot.tenorClient = tenorClient

  setCommandReplies(bot)
  useLogger(bot)

  if (!launchDisabled) {
    bot.launch()
  }

  return bot
}

function useLogger (bot) {
  if (loggingEnabled) {
    Logger.initLogLevel()
    bot.use(Logger.logInline)
    bot.use(Logger.logRegisterShare)
  }
}

function setCommandReplies (bot) {
  commandPromise.then(function (commands) {
    var commandKeys = Object.keys(commands)
    for (var key of commandKeys) {
      bot.command(key, createReplyMessageFunc(commands[key]))
    }
  })
}

function createReplyMessageFunc (message) {
  return function (context) {
    return context.reply(message, messageMarkdownOption)
  }
}
