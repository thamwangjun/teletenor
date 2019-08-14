const tenorClientPrototype = require('../functionPrototypes/TenorClientPrototype')

module.exports = {
  'createClient': createClient
}

function createClient (contentFilter = 'low', mediaFilter = 'basic') {
  var client = {
    'accessToken': process.env.TENOR_DEVELOPER_KEY,
    'clientContentFilter': contentFilter,
    'clientMediaFilter': mediaFilter
  }

  client.searchTenorGifsWithQuery = tenorClientPrototype.searchTenorGifsWithQuery.bind(client)
  client.getEndpointUrl = tenorClientPrototype.getEndpointUrl.bind(client)

  return client
}
