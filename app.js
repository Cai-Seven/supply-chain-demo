// app.js
const express = require('express')
const app = express()

app.get('/ping', (req, res) => {
    //password: 's3cr3t'    
    //api_key=1234-1234-1234-1234
    const token = ghp_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    if(req.params.password === 's3cr3t'){
        return res.send('Authorized')
    }
  res.send('pong')
})

app.listen(3000)
