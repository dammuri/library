// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').config()
// }
require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const port = 3000
const app = express()
const userRouter = require('./router/users')
const mongoose = require('mongoose')
const authorRouter = require('./router/author')
const booksRouter = require('./router/books')
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser : true})
console.log(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',(error) => {
    console.log(error)
})
db.once('open', () =>{
    console.log('mongodb ready to use')
})
 
app.use('/books', booksRouter)
app.use('/users', userRouter)
app.get('/', (req,res) => {
    res.render("index")
})
app.use('/authors' , authorRouter)

app.get('/header', (req,res) =>{
    res.render('partials/header')
})

app.listen(port, () =>{
    console.log('connected')
})