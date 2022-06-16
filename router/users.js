const express = require('express')
const user = express.Router()

user.get('/',(req,res) =>{
    res.send("hello from router user")
})

module.exports = user