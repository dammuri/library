const express = require('express')
const router = express.Router()
const Book = require('../model/books')

router.get('/', async (req,res) =>{
    let books
    try{
        books = await Book.find().sort({createAt : 'desc'}).limit(10).exec()
    }
    catch{
        books = []
        res.redirect('/books')
    }
    res.render('index', {book : books})
})

module.exports = router