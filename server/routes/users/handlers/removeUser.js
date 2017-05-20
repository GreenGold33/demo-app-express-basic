const _ = require('lodash')

function removeUser (req, res) {
  const idToRemove = +req.params.id
  _.remove(req.session.users, user => user.id === idToRemove)
  res.send(`Success removing element ${idToRemove}!!`)
}

module.exports = removeUser
