const express = require('express')
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const POST = process.env.POST || 3000
const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

app.use(cookieParser())

let sugar = 0
let chocolate = 0
let lemon = 0

app.get('/', (req, res)=>{
  sugar = req.cookies.sugar || 0
  chocolate = req.cookies.chocolate || 0
  lemon = req.cookies.lemon || 0

  return res.render('flavor', {sugar, chocolate, lemon})
})

app.post('/sugar', (req, res)=>{
  sugar++
  res.cookie('sugar', sugar, {maxAge: 90000})
  res.redirect('/')
})

app.post('/chocolate', (req, res)=>{
  chocolate++
  res.cookie('chocolate', chocolate, {maxAge: 90000})
  res.redirect('/')
})

app.post('/lemon', (req, res)=>{
  lemon++
  res.cookie('lemon', lemon, {maxAge: 90000})
  res.redirect('/')
})

app.post('/feeling-guilty', (req, res)=>{
  sugar = 0
  chocolate = 0
  lemon = 0

  res.cookie('sugar', sugar, {maxAge: 90000})
  res.cookie('chocolate', chocolate, {maxAge: 90000})
  res.cookie('lemon', lemon, {maxAge: 90000})

  res.redirect('/')
})

app.listen(POST, ()=>{
  console.log('Cookies are running...')
})
