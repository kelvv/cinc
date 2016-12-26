'use strict'
var express = require('express')
var AV = require('leanengine')

var app = express()

require('./cloud')
app.use(AV.express())

module.exports = app
