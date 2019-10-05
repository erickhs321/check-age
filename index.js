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

app.post('/check', (req, res) => {
  console.log(req.body)
})

app.listen(3000)
