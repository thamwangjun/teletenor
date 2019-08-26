var cachedVersion = null

function versionGet () {
  if (cachedVersion) {
    return cachedVersion
  }
  if (process.env.npm_package_version) {
    cachedVersion = process.env.npm_package_version
  } else {
    const { version } = require('../../package.json')
    cachedVersion = version
  }
  return cachedVersion
}

module.exports = versionGet
