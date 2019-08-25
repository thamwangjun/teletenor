const registerSharePerSecond = process.env.REGISTER_SHARE_PER_SECOND || 100
const Bottleneck = require('bottleneck')

module.exports = {
  listenForChosenInlineResult: listenForChosenInlineResult
}

function listenForChosenInlineResult (bot, tenorClient) {
  var limiter = new Bottleneck(createBottleneckOptions())

  var wrappedInlineResultHandler = limiter.wrap(handleChosenInlineResult.bind(bot))

  bot.on('chosen_inline_result', wrappedInlineResultHandler)
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
