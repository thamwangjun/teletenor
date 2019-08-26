const versionGet = require('../../functions/VersionGet')
const referenceMsg = require('../msg/referenceMsg')

module.exports = {
  'start': `I am currently <b>online</b>! My teletenor version is <b>${versionGet()}</b>
  ${referenceMsg}`
}
