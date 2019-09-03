function createRecord (id, body) {
  return {
    messageId: `${id}`,
    receiptHandle: `receiptHandle-${id}`,
    body: body,
    attributes: {},
    messageAttributes: {},
    md5OfBody: '',
    eventSource: 'aws:sqs',
    eventSourceARN: 'arn:aws:sqs:moon-01:001:queue',
    awsRegion: 'moon-01' }
}

function createRecords (idArr, bodyArr) {
  if (idArr.length !== bodyArr.length) {
    throw Error('idArr.length !== bodyArr.length')
  }

  var arrLength = idArr.length
  var records = []

  for (let i = 0; i < arrLength; i++) {
    var id = idArr[i]
    var body = bodyArr[i]
    records.push(createRecord(id, body))
  }

  return {
    Records: records
  }
}

exports.createRecord = createRecords
