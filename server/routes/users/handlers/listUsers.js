function listUsers (req, res) {
  const users = req.session.users
  res.render('users', { users })
}

module.exports = listUsers
