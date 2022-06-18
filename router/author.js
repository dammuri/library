const express = require('express')
const author = require('../model/author')
const router = express.Router()

router.get('/', async (req,res) =>{
    const authorData = await author.find({})
    try{
        res.render("authors/index", {authors : authorData})
    }
    catch{
        res.redirect('/')
    }
})

router.get('/new',(req,res) =>{
    res.render('authors/new',{author : new author()})
})

router.post('/', async (req,res) =>{
    const value = req.body.name
    const authorValue = new author({
        name : value
    })
    try {
        const authorsave = await authorValue.save()
        res.redirect('/authors')
    }
    catch {
        res.render('authors/new',{
            author : author,
            errorMessage : "error occured while creating data"
        })
    }

})

module.exports = router