const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(
  express.urlencoded({
    extended: false
  })
)

app.set('view engine', 'njk')

const checkMiddleware = (req, res, next) => {
  const { age } = req.query
  age ? next() : res.redirect('/')
}

app.get('/', (req, res) => res.render('age'))

app.post('/check', (req, res) => {
  const { age } = req.body
  return res.redirect(`/${age > 18 ? 'major' : 'minor'}?age=${age}`)
})

app.get('/minor', checkMiddleware, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.get('/major', checkMiddleware, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.listen(3000)
