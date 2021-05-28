const express = require('express')
const websocket = require('websocket').server
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()


app.use(cors())
app.use(express.json())


app.get('/', async (request, response) => {
  return response.json({ "name": "arpan" })
})


// const wsServer = new websocket({
//   httpServer: server
// })


module.exports = app;