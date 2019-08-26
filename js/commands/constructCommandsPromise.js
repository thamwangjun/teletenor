const fastGlob = require('fast-glob')

const commands = {}
var commandList = '<b>List of teletenor commands</b>\n'

const commandPromise = fastGlob('js/commands/cmd/*.js', { absolute: true })
  .then(createAllCommandsObj)

function createAllCommandsObj (filesArr) {
  filesArr.forEach(createCommandObj)
  createListCommands(commands, commandList)
  return commands
}

function createCommandObj (file) {
  var cmd = require(file)
  Object.assign(commands, cmd)
  Object.keys(cmd).forEach(addToCommandList)
}

function addToCommandList (key) {
  commandList = commandList + '/' + key + '\n'
}

function createListCommands (commands, commandList) {
  commandList = commandList + '/list\n'
  commands.list = commandList
}

module.exports = commandPromise
