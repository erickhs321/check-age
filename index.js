const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('index')
})

const checkAge = (req, res, next) => {
  const { age } = req.query

  age ? next() : res.redirect('/')
}

app.get('/major', checkAge, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', checkAge, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    res.redirect(`/major?age=${age}`)
  } else {
    res.redirect(`/minor?age=${age}`)
  }
})

app.listen(3000)
