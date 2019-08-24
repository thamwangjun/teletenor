const chalk = require('chalk')
const log = require('loglevel')
const logSymbols = require('log-symbols')
const timestamp = require('time-stamp')
const logLevel = process.env.LOG_LEVEL || 'error'

module.exports = {
  initLogLevel: initLogLevel,
  logInline: logInline,
  logRegisterShare: logRegisterShare,
  logError: logError
}

function initLogLevel () {
  log.setLevel(logLevel)
}

function logError (error) {
  log.error(error)
}

function logInline (context, next) {
  if (context.inlineQuery) {
    var logEntry = createInlineLogEntry(context.inlineQuery)
    log.info(logEntry.symbol, logEntry.timestamp, logEntry.action, logEntry.inlineId, logEntry.userId, logEntry.username, logEntry.userLang, logEntry.query)
  }
  return next(context)
}

function logRegisterShare (context, next) {
  if (context.chosenInlineResult) {
    var logEntry = createShareLogEntry(context.chosenInlineResult)
    log.info(logEntry.symbol, logEntry.timestamp, logEntry.action, logEntry.resultId, logEntry.userId, logEntry.username, logEntry.userLang, logEntry.query)
  }
  return next(context)
}

function createInlineLogEntry (inlineQuery) {
  return {
    symbol: chalk.bgCyan(logSymbols.info),
    action: chalk.bgYellow('Action:SearchQuery'),
    timestamp: chalk.white(`Time:"${timestamp('DD-MM-YYYY:mm:ss:ms')}"`),
    inlineId: chalk.green(`ID:"${inlineQuery.id}"`),
    userId: chalk.yellow(`From:"${inlineQuery.from.id}"`),
    username: chalk.yellow(`From:"${inlineQuery.from.username}"`),
    userLang: chalk.gray(`UserLang:"${inlineQuery.from.language_code}"`),
    query: chalk.magenta(`Query:"${inlineQuery.query}"`)
  }
}

function createShareLogEntry (chosenInlineResult) {
  return {
    symbol: chalk.bgCyan(logSymbols.info),
    action: chalk.bgYellow('Action:RegisterShare'),
    timestamp: chalk.white(`Time:"${timestamp('DD-MM-YYYY:mm:ss:ms')}"`),
    resultId: chalk.green(`ResultID:"${chosenInlineResult.result_id}"`),
    userId: chalk.yellow(`From:"${chosenInlineResult.from.id}"`),
    username: chalk.yellow(`From:"${chosenInlineResult.from.username}"`),
    userLang: chalk.grey(`UserLang:"${chosenInlineResult.from.language_code}"`),
    query: chalk.magenta(`Query:"${chosenInlineResult.query}"`)
  }
}
