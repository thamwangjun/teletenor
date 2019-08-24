const ISO6391 = require('iso-639-1')

module.exports = {
  buildQueryParams: buildQueryParams,
  buildRegisterShareParams: buildRegisterShareParams
}

function buildQueryParams (query, locale, contentFilter, mediaFilter, limit, accessKey, offset) {
  var params = {}

  setQueryParam(query, params)

  setLocaleParam(locale, params)

  setContentFilterParam(contentFilter, params)

  setMediaFilterParam(mediaFilter, params)

  setLimitParam(limit, params)

  setAccessKeyParam(accessKey, params)

  setPosParam(offset, params)

  return params
}

function buildRegisterShareParams (query, id, locale, accessKey) {
  var params = {}

  setAccessKeyParam(accessKey, params)
  setIdParam(id, params)
  setLocaleParam(locale, params)
  setQueryParam(query, params)

  return params
}

function setAccessKeyParam (accessKey, params) {
  if (accessKey) {
    params.key = accessKey
  }
}

function setIdParam (id, params) {
  if (id) {
    params.id = id
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

function setPosParam (offset, params) {
  if (offset) {
    params.pos = offset
  }
}
