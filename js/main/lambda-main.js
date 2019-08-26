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
  if (isFromSimpleQueueService(event)) {
    return handleRecords(event)
  } else {
    return handleSingleEvent(event)
  }
}

function handleSingleEvent (event) {
  var eventBody = JSON.parse(event.body)
  return bot.handleUpdate(eventBody)
    .then(returnOkayResponse)
    .catch(returnErrorResponse)
}

function handleRecords (event) {
  var Records = event.Records
  var recordsPromiseArr = []

  Records.forEach(function (record) {
    recordsPromiseArr.push(handleSingleEvent(record))
  })

  return Promise.all(recordsPromiseArr)
}

function isFromSimpleQueueService (event) {
  return (event.Records)
}
