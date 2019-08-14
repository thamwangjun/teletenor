const Telegraf = require('telegraf')
const pjson = require('../../package.json')

module.exports = {
  'createClient': createClient
}

function createClient () {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

  bot.command('version', replyVersion)
  bot.start(replyStart)
  bot.launch()
  return bot
}

function replyVersion (context) {
  context.reply(`My teletenor version is ${pjson.version}`)
}

function replyStart (context) {
  context.reply(`I am currently running. My teletenor version is ${pjson.version}`)
}
