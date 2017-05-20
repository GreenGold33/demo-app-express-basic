function addUser (req, res) {
  const { username } = req.body
  const id = +new Date()
  req.session.users.push({ id, username })
  res.redirect('/users')
}

module.exports = addUser
