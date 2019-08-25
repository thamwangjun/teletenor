module.exports = {
  listenForChosenInlineResult: listenForChosenInlineResult
}

function listenForChosenInlineResult (telegramBot, tenorClient) {
  telegramBot.on('chosen_inline_result', handleChosenInlineResult)
}

function handleChosenInlineResult (context, next) {
  var chosenInlineResult = context.chosenInlineResult

  this.tenorClient.registerShare(chosenInlineResult.query, chosenInlineResult.result_id, chosenInlineResult.from.language_code)
    .then(function () {
      return next(context)
    })
}
