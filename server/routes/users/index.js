const express = require('express')
const _ = require('lodash')
const router =  express.Router()

router.get('/users', (req, res) => {
  const users = req.session.users
  res.render('users', { users })
})

router.post('/users', (req, res) => {
  const { username } = req.body
  const id = +new Date()
  req.session.users.push({ id, username })
  res.redirect('/users')
})

router.delete('/user/:id', (req, res) => {
  const idToRemove = +req.params.id
  _.remove(req.session.users, user => user.id == idToRemove)
  res.send(`Success removing element ${idToRemove}!!`)
})

router.put('/user/:id', (req, res) => {
  const idToEdit = +req.params.id
  const { editedValue } = req.body
  _.find(req.session.users, { id: idToEdit }).username = editedValue
  res.send(`Success editing element ${idToEdit}!!`)
})

module.exports = router