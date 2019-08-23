const Telegraf = require('telegraf')
const Bottleneck = require('bottleneck')
const pjson = require('../../package.json')
const commandMsg = require('../messages/commandMsg')
const registerSharePerSecond = process.env.REGISTER_SHARE_PER_SECOND || 100

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

  listenForChosenInlineResult(bot, registerSharePerSecond, tenorClient)

  bot.launch()
  return bot
}

function listenForChosenInlineResult (bot, tenorClient) {
  var limiter = new Bottleneck(createBottleneckOptions())

  var wrappedInlineResultHandler = limiter.wrap(handleChosenInlineResult.bind(bot))

  bot.use((context, next) => {
    if (context.chosenInlineResult) {
      return wrappedInlineResultHandler(context, next)
    }
    return next(context)
  })
}

function handleChosenInlineResult (context, next) {
  var chosenInlineResult = context.chosenInlineResult

  this.tenorClient.registerShare(chosenInlineResult.query, chosenInlineResult.result_id, chosenInlineResult.from.language_code)
    .then(function () {
      return next(context)
    })
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

function createBottleneckOptions () {
  var minimumTimePerRequest = 1000 / registerSharePerSecond
  return {
    minTime: minimumTimePerRequest,
    highWater: registerSharePerSecond,
    strategy: Bottleneck.strategy.LEAK
  }
}
