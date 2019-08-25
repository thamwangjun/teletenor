const Telegraf = require('telegraf')
const Logger = require('../logger/Logger')
const pjson = require('../../package.json')
const commandMsg = require('../messages/commandMsg')

const loggingEnabled = process.env.LOGGING_ENABLED === 'true' || false
const launchDisabled = process.env.DISABLE_LAUNCH === 'true' || false

module.exports = {
  'createClient': createClient
}

var messageMarkdownOption = { 'parse_mode': 'HTML' }

function createClient (tenorClient) {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
  bot.tenorClient = tenorClient

  bot.command('version', replyVersion)
  bot.start(replyStart)
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

function replyVersion (context) {
  context.reply(`My teletenor version is ${pjson.version}`)
}

function replyStart (context) {
  context.reply(`I am currently running now! My teletenor version is ${pjson.version}`)
}

function setCommandReplies (bot) {
  var commandKeys = Object.keys(commandMsg)
  for (var key of commandKeys) {
    bot.command(key, createReplyMessageFunc(commandMsg[key]))
  }
}

function createReplyMessageFunc (message) {
  return function (context) {
    context.reply(message, messageMarkdownOption)
  }
}
