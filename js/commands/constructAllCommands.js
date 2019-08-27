const cmds = require('./cmd')

var commandList = '<b>List of teletenor commands</b>\n'

const allCommands = createAllCommandsObj(cmds)

function createAllCommandsObj (cmds) {
  Object.keys(cmds).forEach(addToCommandList)
  createListCommands(cmds, commandList)
  return cmds
}

function addToCommandList (key) {
  commandList = commandList + '/' + key + '\n'
}

function createListCommands (commands, commandList) {
  commandList = commandList + '/list\n'
  commands.list = commandList
}

module.exports = allCommands
