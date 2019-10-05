const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extendend: false }))

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/major', (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', (req, res) => {
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
