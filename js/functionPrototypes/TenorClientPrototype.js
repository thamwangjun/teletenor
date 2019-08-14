const rp = require('request-promise')
const buildUrl = require('build-url')
const ISO6391 = require('iso-639-1')

var clientProto = {
  searchTenorGifsWithQuery: searchTenorGifsWithQuery,
  getEndpointUrl: getEndpointUrl
}

module.exports = clientProto

function searchTenorGifsWithQuery (context, query, locale, resultLimit) {
  return rp({
    uri: getEndpointUrl(query, locale, this.clientContentFilter, this.clientMediaFilter, resultLimit, this.accessToken),
    json: true
  })
    .then(createSearchResponse(context))
}

function createSearchResponse (context) {
  return function (response) {
    return {
      res: response,
      context: context
    }
  }
}

function getEndpointUrl (query, locale, contentFilter, mediaFilter, limit, accessKey) {
  var queryParams = buildQueryParams(query, locale, contentFilter, mediaFilter, limit, accessKey)

  return buildSearchUrl(queryParams)
}

function buildSearchUrl (queryParams) {
  return buildUrl('https://api.tenor.com', {
    path: 'v1/search',
    queryParams: queryParams
  })
}

function buildQueryParams (query, locale, contentFilter, mediaFilter, limit, accessKey) {
  var params = {}

  if (query) {
    params.q = query
  }

  if (locale && ISO6391.validate(locale)) {
    params.locale = locale
  }

  if (contentFilter) {
    params.contentfilter = contentFilter
  }

  if (mediaFilter) {
    params.media_filter = mediaFilter
  }

  if (limit) {
    params.limit = limit
  }

  if (accessKey) {
    params.key = accessKey
  }

  return params
}
