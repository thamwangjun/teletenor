const main = require('./main')

const bot = main.teletenorBot

var okayResponse = {
  'statusCode': 200
}

var internalErrorResponse = {
  'statusCode': 500
}

function returnOkayResponse () {
  return okayResponse
}

function returnErrorResponse (error) {
  return Object.assign({ 'body': error.message }, internalErrorResponse)
}

exports.handler = async function (event) {
  var eventBody = JSON.parse(event.body)
  return bot.handleUpdate(eventBody)
    .then(returnOkayResponse)
    .catch(returnErrorResponse)
}
