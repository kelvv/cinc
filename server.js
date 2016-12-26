'use strict'
const AV = require('leanengine')
const env = require('./env/config')

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY || env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || env.LEANCLOUD_APP_MASTER_KEY
})

AV.Cloud.useMasterKey()

let app = require('./app')

let PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000)
app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT)

  process.on('uncaughtException', function (err) {
    console.error('Caught exception:', err.stack)
  })
  process.on('unhandledRejection', function (reason, p) {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack)
  })
})
