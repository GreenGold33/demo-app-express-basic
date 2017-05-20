const express = require('express')

const router =  express.Router()

router.get('/users', (req, res) => {
  const users = req.session.users
  res.render('users', { users })
})

router.post('/users', (req, res) => {
  let users = req.session.users
  const { username } = req.body
  users.push(username)
  res.redirect('/users')
})

router.delete('/users/:id', (req, res) => {
  let users = req.session.users
  const { id } = req.params
  users.splice(id, 1)
  res.send(`Success removing element ${id}!!`)
})

router.put('/users/:id', (req, res) => {
  let users = req.session.users
  const { id } = req.params
  const { editedValue } = req.body
  users[id] = editedValue
  res.send(`Success editing element ${id}!!`)
})

module.exports = router