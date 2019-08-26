const teletenorBotUsername = process.env.TELETENOR_BOT_USERNAME
const referenceMsg = require('../msg/referenceMsg')

module.exports = {
  'help': `<b>What can teletenor do?</b>

  Mention ${teletenorBotUsername} for inline tenor.com GIF search for telegram!

  <b>Example</b>
  Type <code>${teletenorBotUsername} cute cats</code>
  Cat GIF suggestions will appear!
  Select a GIF to post them in your chat!

  This bot is open-source too! <a href="https://git.io/fj5xN">Github: teletenor</a>
  ${referenceMsg}`
}
