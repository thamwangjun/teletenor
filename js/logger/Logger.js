const log = require('loglevel')
const LogEntry = require('./LogEntry')
const logLevel = process.env.LOG_LEVEL || 'error'
const loggingEnabled = process.env.LOGGING_ENABLED === 'true' || false

module.exports = {
  initLogLevel: initLogLevel,
  logInline: logInline,
  logRegisterShare: logRegisterShare,
  logError: logError,
  logLambdaBatch: logLambdaBatch,
  logCommandReply: logCommandReply,
  logLambdaContext: logLambdaContext
}

function initLogLevel () {
  log.setLevel(logLevel)
}

function logError (error) {
  log.error(error)
  throw error
}

function logInline (context, next) {
  if (context.inlineQuery) {
    var logEntry = LogEntry.createInlineLogEntry(context.inlineQuery)
    log.info(logEntry.symbol, logEntry.timestamp, logEntry.action, logEntry.inlineId, logEntry.userId, logEntry.username, logEntry.userLang, logEntry.query)
  }
  return next(context)
}

function logRegisterShare (context, next) {
  if (context.chosenInlineResult) {
    var logEntry = LogEntry.createShareLogEntry(context.chosenInlineResult)
    log.info(logEntry.symbol, logEntry.timestamp, logEntry.action, logEntry.resultId, logEntry.userId, logEntry.username, logEntry.userLang, logEntry.query)
  }
  return next(context)
}

function logLambdaBatch (numRecords) {
  if (loggingEnabled) {
    var logEntry = LogEntry.createLambdaBatchLogEntry(numRecords)
    log.info(logEntry.symbol, logEntry.timestamp, logEntry.action, logEntry.numRecords)
  }
}

function logLambdaContext (context) {
  if (loggingEnabled) {
    var logEntry = LogEntry.createLambdaContextEntry(context)
    log.info(logEntry.symbol, logEntry.timestamp, logEntry.action, logEntry.memoryLimitInMB, logEntry.awsRequestId, logEntry.remainingTimeInMillis)
  }
}

function logCommandReply (command) {
  if (loggingEnabled) {
    var logEntry = LogEntry.createCommandReplyEntry(command)
    log.info(logEntry.symbol, logEntry.timestamp, logEntry.action, logEntry.command)
  }
}
