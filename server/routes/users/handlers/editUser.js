const _ = require('lodash')

function editUser (req, res) {
  const idToEdit = +req.params.id
  const { editedValue } = req.body
  _.find(req.session.users, { id: idToEdit }).username = editedValue
  res.send(`Success editing element ${idToEdit}!!`)
}

module.exports = editUser
