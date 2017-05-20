const express = require('express')

const router =  express.Router()

router.get('/users', (req, res) => {
  const users = req.session.users
  res.render('users', { users })
})

router.post('/users', (req, res) => {
  const { username } = req.body
  req.session.users.push(username)
  res.redirect('/users')
})

router.delete('/users/:id', (req, res) => {
  const { id } = req.params
  req.session.users.splice(id, 1)
  res.send(`Success removing element ${id}!!`)
})

router.put('/users/:id', (req, res) => {
  const { id } = req.params
  const { editedValue } = req.body
  req.session.users[id] = editedValue
  res.send(`Success editing element ${id}!!`)
})

module.exports = router