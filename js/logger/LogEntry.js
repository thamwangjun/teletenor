const chalk = require('chalk')
const logSymbols = require('log-symbols')
const timestamp = require('time-stamp')

module.exports = {
  createInlineLogEntry: createInlineLogEntry,
  createShareLogEntry: createShareLogEntry,
  createLambdaBatchLogEntry: createLambdaBatchLogEntry,
  createCommandReplyEntry: createCommandReplyEntry,
  createLambdaContextEntry: createLambdaContextEntry
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

function createLambdaBatchLogEntry (numRecords) {
  return {
    symbol: chalk.bgCyan(logSymbols.info),
    action: chalk.bgYellow('Action:LambdaBatchInvoke'),
    timestamp: chalk.white(`Time:"${timestamp('DD-MM-YYYY:mm:ss:ms')}"`),
    numRecords: chalk.green(`Number of Records:"${numRecords}"`)
  }
}

function createCommandReplyEntry (command) {
  return {
    symbol: chalk.bgCyan(logSymbols.info),
    action: chalk.bgYellow('Action:CommandReply'),
    timestamp: chalk.white(`Time:"${timestamp('DD-MM-YYYY:mm:ss:ms')}"`),
    command: chalk.green(`Command:"${command}"`)
  }
}

function createLambdaContextEntry (context) {
  return {
    symbol: chalk.bgCyan(logSymbols.info),
    action: chalk.bgYellow('Action:LambdaInvoke'),
    timestamp: chalk.white(`Time:"${timestamp('DD-MM-YYYY:mm:ss:ms')}"`),
    memoryLimitInMB: chalk.green(`memoryLimitInMB:"${context.memoryLimitInMB}"`),
    awsRequestId: chalk.yellow(`From:"${context.awsRequestId}"`),
    remainingTimeInMillis: chalk.yellow(`remainingTimeInMillis:"${context.getRemainingTimeInMillis()}"`)
  }
}
