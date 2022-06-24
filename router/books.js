const express = require('express')
const Book = require('../model/books')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const uploadPath = path.join('public', Book.coverImageBasePath)
const Author = require('../model/author')
const fs = require('fs')
const imageMimeTypes = ['image/jpeg','image/png','image/gif']
const upload = multer({
    dest : uploadPath,
    fileFilter : (req, file, callback) =>{
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

router.get('/', async (req,res) => {
    const searchOption = {}
    if(req.query.title !=null && req.query.title != ''){
        searchOption.title = new RegExp(req.query.title, 'i')
    }
    try {
        const book = await Book.find(searchOption)
        res.render('books/index', {book : book,
        searchOption : req.query})
    }
    catch {
        res.json({message : "error occured"})
    }

})

router.get('/new', async(req,res) =>{
    newRenderPage(res, new Book())
})

router.post('/', upload.single('cover'), async(req,res) =>{
    const fileName = req.file != null ? req.file.filename : null
    const publishDate = req.body.publishDate != null ? new Date(req.body.publishDate).toISOString().split('T')[0] : ''
    const book = new Book({
        title : req.body.title,
        author : req.body.author,
        publishDate : publishDate,
        pageCount : req.body.pageCount,
        coverImageName :  fileName,
        description : req.body.description
    })
    console.log(`${req.body.title} ${req.body.author} ${publishDate} ${req.body.pageCount} ${fileName} ${req.body.description}`)
    try{
        const newBook = await book.save()
        res.redirect('/books')
    }
    catch{
        if(book.coverImageName != null){
            removeBookCover(book.coverImageName)
        }

        newRenderPage(res, book, true)
    }
})

async function newRenderPage(res, book, hasError = false){
    try {
        const authors = await Author.find({})
        const params = {
            authors : authors,
            book : book
        }
        if(hasError) params.errorMessage = "error occured while creating book"
        res.render('books/new', params)
    }
    catch {
        res.redirect('/books')
    }
}

function removeBookCover(imageName){
    fs.unlink(path.join(uploadPath, imageName), err =>{
        if(err) console.error(err)
    })
}

module.exports = router