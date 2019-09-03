const { createInlineQuery } = require('./inlineQueryFactory')

function createUpdate (id, query) {
  return {
    update_id: id,
    inline_query: createInlineQuery(id, query)
  }
}

exports.createUpdate = createUpdate
