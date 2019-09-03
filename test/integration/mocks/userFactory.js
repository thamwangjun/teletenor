function createUsers (idArr) {
  return idArr.map(createUser)
}

function createUser (id) {
  return {
    id: `${id}`,
    is_bot: false,
    first_name: `firstName-${id}`,
    last_name: `lastName-${id}`,
    username: `username-${id}`,
    language_code: 'fr'
  }
}

exports.createUsers = createUsers
exports.createUser = createUser
