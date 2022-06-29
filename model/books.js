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
    coverImage : {
        type : Buffer,
        required : true
    },
    coverImageType : {
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
    if(this.coverImage != null && this.coverImage != null) {
        return `data:${this.coverImageType};charset=utf-8;base64, ${this.coverImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Books', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath