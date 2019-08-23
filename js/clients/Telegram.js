const Telegraf = require('telegraf')
const pjson = require('../../package.json')
const commandMsg = require('../messages/commandMsg')

module.exports = {
  'createClient': createClient
}

var messageMarkdownOption = { 'parse_mode': 'HTML' }

function createClient () {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

  bot.command('version', replyVersion)
  bot.start(replyStart)
  setCommandReplies(bot)
  bot.launch()
  return bot
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
