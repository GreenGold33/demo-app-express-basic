const express = require('express')

//
const router = express.Router()

const listUsers = require('./handlers/listUsers')
const addUser = require('./handlers/addUser')
const removeUser = require('./handlers/removeUser')
const editUser = require('./handlers/editUser')

router.get('/users', listUsers)
router.post('/users', addUser)
router.delete('/user/:id', removeUser)
router.put('/user/:id', editUser)

module.exports = router
