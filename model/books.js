const mongoose = require('mongoose')
const coverImageBasePath = 'upload/bookCovers'
const path = require('path')
const {Schema} = mongoose

const bookSchema = Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    publishDate : {
        type : String,
        required : true
    },
    pageCount : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    },
    coverImageName : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Author'
    }
})

bookSchema.virtual('coverImagePath').get(function() {
    if(this.coverImageName != null) {
        return path.join('/', coverImageBasePath, this.coverImageName)
    }
})
module.exports = mongoose.model('Books', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath