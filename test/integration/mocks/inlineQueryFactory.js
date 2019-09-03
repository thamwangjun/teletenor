const { createUser } = require('./userFactory')

function createInlineQueries (idArr) {
  return idArr.map(function (id) {
    return {
      id: `inline-query-${id}`,
      from: createUser(id),
      query: '',
      offset: 12
    }
  })
}

function createInlineQuery (id, query) {
  return {
    id: `inline-query-${id}`,
    from: createUser(id),
    query: query,
    offset: 12
  }
}

exports.createInlineQueries = createInlineQueries
exports.createInlineQuery = createInlineQuery
