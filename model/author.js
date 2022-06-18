const mongoose = require('mongoose')

const {Schema} = mongoose

const authorSchema = Schema({
    name : {
        type : String,
        required : true
    },
})

module.exports = mongoose.model('Author', authorSchema)