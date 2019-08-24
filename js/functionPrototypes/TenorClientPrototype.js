const rp = require('request-promise')
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

function searchTenorGifsWithQuery (context, query, locale, resultLimit, offset) {
  return rp({
    uri: getEndpointUrl(query, locale, this.clientContentFilter, this.clientMediaFilter, resultLimit, this.accessToken, offset),
    json: true
  })
    .then(createSearchResponse(context))
}

function registerShare (query, id, locale) {
  return rp({
    uri: buildRegisterShareUrl(query, id, locale, this.accessToken),
    json: true
  })
}

function createSearchResponse (context) {
  return function (response) {
    return SearchContextResponse({
      res: TenorSearchResponse(response),
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
