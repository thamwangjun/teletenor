const versionGet = require('../../functions/VersionGet')
const referenceMsg = require('../msg/referenceMsg')

module.exports = {
  'version': `My teletenor version is <b>${versionGet()}</b>
  ${referenceMsg}`
}
