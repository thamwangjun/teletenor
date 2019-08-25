const Bottleneck = require('bottleneck')

const registerSharePerSecond = parseInt(process.env.REGISTER_SHARE_PER_SECOND) || 100

module.exports = {
  listenForChosenInlineResult: listenForChosenInlineResult
}

function listenForChosenInlineResult (telegramBot, tenorClient) {
  var limiter = new Bottleneck(createBottleneckOptions())

  var wrappedInlineResultHandler = limiter.wrap(handleChosenInlineResult.bind(telegramBot))

  telegramBot.on('chosen_inline_result', wrappedInlineResultHandler)
}

function handleChosenInlineResult (context, next) {
  var chosenInlineResult = context.chosenInlineResult

  this.tenorClient.registerShare(chosenInlineResult.query, chosenInlineResult.result_id, chosenInlineResult.from.language_code)
    .then(function () {
      return next(context)
    })
}

function createBottleneckOptions () {
  var minimumTimePerRequest = 1000 / registerSharePerSecond
  return {
    minTime: minimumTimePerRequest,
    highWater: registerSharePerSecond,
    strategy: Bottleneck.strategy.LEAK
  }
}
