// All global vars are declared here
GLOBAL._ = require('lodash')

let express = require('express')
let app = express()
let mongoose = require('mongoose')
var bodyParser = require('body-parser')
let config = require('../config')
let { errorHandling, authentication } = require('./middleware')

mongoose.connect('mongodb://localhost/boxd_api')

require('./helpers')
require('./models')

app.use(bodyParser.json({ type: '*/*' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('cors')())

app.use(authentication.authenticateUser)
app.use('/', require('./routes'))
app.use(errorHandling.routeNotFound)
app.use(errorHandling.handleErrors)

app.listen(config.port)
