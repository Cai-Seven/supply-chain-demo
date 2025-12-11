// app.js
const express = require('express')
const app = express()

app.get('/ping', (req, res) => {
    //password: 's3cr3t'    
  res.send('pong')
})

app.listen(3000)
