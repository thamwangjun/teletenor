const rp = require('request-promise')
const buildUrl = require('build-url')
const ISO6391 = require('iso-639-1')

var clientProto = {
  searchTenorGifsWithQuery: searchTenorGifsWithQuery,
  getEndpointUrl: getEndpointUrl,
  registerShare: registerShare
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

function registerShare (query, id, locale) {
  return rp({
    uri: buildRegisterShareUrl(query, id, locale, this.accessToken),
    json: true
  }).then(function (jsonRes) {
    console.log(`Register Share, id:${id}, status ${jsonRes.status}`)
  })
}

function getEndpointUrl (query, locale, contentFilter, mediaFilter, limit, accessKey) {
  var queryParams = buildQueryParams(query, locale, contentFilter, mediaFilter, limit, accessKey)

  if (query) {
    return buildSearchUrl(queryParams)
  } else {
    return buildTrendingUrl(queryParams)
  }
}

function buildSearchUrl (queryParams) {
  return buildUrl('https://api.tenor.com', {
    path: 'v1/search',
    queryParams: queryParams
  })
}

function buildTrendingUrl (queryParams) {
  return buildUrl('https://api.tenor.com', {
    path: 'v1/trending',
    queryParams: queryParams
  })
}

function buildRegisterShareUrl (query, id, locale, accessKey) {
  var requestParams = buildRegisterShareParams(query, id, locale, accessKey)

  return buildUrl('https://api.tenor.com', {
    path: 'v1/registershare',
    queryParams: requestParams
  })
}

function buildQueryParams (query, locale, contentFilter, mediaFilter, limit, accessKey) {
  var params = {}

  setQueryParam(query, params)

  setLocaleParam(locale, params)

  setContentFilterParam(contentFilter, params)

  setMediaFilterParam(mediaFilter, params)

  setLimitParam(limit, params)

  setAccessKeyParam(accessKey, params)

  return params
}

function buildRegisterShareParams (query, id, locale, accessKey) {
  var params = {}

  setAccessKeyParam(accessKey, params)
  setLocaleParam(locale, params)
  setQueryParam(query, params)

  return params
}

function setAccessKeyParam (accessKey, params) {
  if (accessKey) {
    params.key = accessKey
  }
}

function setLocaleParam (locale, params) {
  if (locale && ISO6391.validate(locale)) {
    params.locale = locale
  }
}

function setQueryParam (query, params) {
  if (query) {
    params.q = query
  }
}

function setContentFilterParam (contentFilter, params) {
  if (contentFilter) {
    params.contentfilter = contentFilter
  }
}

function setMediaFilterParam (mediaFilter, params) {
  if (mediaFilter) {
    params.media_filter = mediaFilter
  }
}

function setLimitParam (limit, params) {
  if (limit) {
    params.limit = limit
  }
}
