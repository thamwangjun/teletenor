const got = require('got')
const HttpAgent = require('agentkeepalive')
const { HttpsAgent } = HttpAgent
const buildUrl = require('build-url')
const TenorParamsBuilder = require('../functions/TenorParamsBuilder')
const SearchContextResponse = require('../structs/SearchContextResponse')
const TenorSearchResponse = require('../structs/TenorSearchResponse')

var clientProto = {
  searchTenorGifsWithQuery: searchTenorGifsWithQuery,
  getEndpointUrl: getEndpointUrl,
  registerShare: registerShare
}

module.exports = clientProto

var requestOptions = {
  json: true,
  timeout: 5000,
  decompress: true,
  agent: {
    https: new HttpsAgent()
  }
}

function searchTenorGifsWithQuery (context, query, locale, resultLimit, offset) {
  return createRequestPromise(getEndpointUrl(query, locale, this.clientContentFilter, this.clientMediaFilter, resultLimit, this.accessToken, offset))
    .then(createSearchResponse(context))
}

function registerShare (query, id, locale) {
  return createRequestPromise(buildRegisterShareUrl(query, id, locale, this.accessToken))
    .then(returnBody)
}

function createRequestPromise (uri) {
  return got(uri, requestOptions)
}

function createSearchResponse (context) {
  return function (response) {
    return SearchContextResponse({
      res: TenorSearchResponse(response.body),
      context: context
    })
  }
}

function getEndpointUrl (query, locale, contentFilter, mediaFilter, limit, accessKey, offset) {
  var queryParams = TenorParamsBuilder.buildQueryParams(query, locale, contentFilter, mediaFilter, limit, accessKey, offset)

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
  var requestParams = TenorParamsBuilder.buildRegisterShareParams(query, id, locale, accessKey)

  return buildUrl('https://api.tenor.com', {
    path: 'v1/registershare',
    queryParams: requestParams
  })
}

function returnBody (response) {
  return response.body
}
