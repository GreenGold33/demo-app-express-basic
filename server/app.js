// First of all we load the module `express`.
const express = require('express')
// We'll need the `path` module for things such as `path.join(__dirname, '../client')`.
const path = require('path')
// To use sessions we need the `express-session` module.
const session = require('express-session')
// This module wil be used to store the sessions in files (in the folder `sessions`).
const FileStore = require('session-file-store')(session)

// This module is necessary to get the data sent from a client (from a FROM or via AJAX).
const bodyParser = require('body-parser')

// We instantiate an `express()` application into the `app` variable.<br/>
// So `app` will inherite methods such as `app.use`, `app.get`, `app.set`...
const app = express()
// We set the port as a constant.
const PORT = 3000

// We load a router defined in another file that contain the logic for all the `users` routes
const userRoutes = require('./routes/users')

// We set this app (through _middlewares_) to use sessions w/ this configuration.<br/>
// Every user requesting some endpoint from this server will be assigned to his own _session_ in the server that will be unique for every user (controller by cookies on the client).<br/>
// The data of the user's sessions will be available on every request in `req.session`.
app.use(session({
  name: 'jm-server-session-cookie-id',
  secret: '4u6mVaJtJrrhZb2iHx2ugBof',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}))

// We set this app (through _middlewares_) to parse the data received from the client.<br/>
// This data will be available in `req.body`.

// [1] To properly parse data received from a FORM.
app.use(bodyParser.urlencoded({ extended: false }))
// [2] To properly parse data received from an AJAX request.
app.use(bodyParser.json())

// We set this app (through _middlewares_) to initialize the _variable_ session `users` as an empty array the first time the session in created
app.use((req, res, next) => {
  req.session.users = req.session.users || []
  next()
})

// We set this app (through _middlewares_) to use the `../client` as our _public_ folder (the one where express will look for css, js, images, html, etc...)
app.use(express.static(path.join(__dirname, '../client')))

// We set our app to use `pug` as our template engine and the folder where to look for these templates
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'))

// We set this to _prettify_ the generated HTML
app.locals.pretty = true

// We link (couple, add) the set of routes (and their logic) defined in another `router`
app.use(userRoutes)

// Start listining to requests
app.listen(PORT, () => console.log(`🤘 Magic happens at PORT ${PORT}...`))