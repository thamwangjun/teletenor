const helpCmd = require('./helpCmd')
const startCmd = require('./startCmd')
const termsCmd = require('./termsCmd')
const versionCmd = require('./versionCmd')

module.exports = Object.assign({},
  helpCmd,
  startCmd,
  termsCmd,
  versionCmd
)
