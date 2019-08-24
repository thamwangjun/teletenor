const main = require('./main')

const bot = main.teletenorBot

var okayResponse = {
  statusCode: 200,
  body: ''
}

function returnOkayResponse () {
  return okayResponse
}

exports.handler = async function (event) {
  var eventBody = JSON.parse(event.body)
  return bot.handleUpdate(eventBody)
    .then(returnOkayResponse)
}
