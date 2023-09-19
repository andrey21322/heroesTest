const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { allHeroes, newHero, delImg, uploadImage } = require('./controllers/heroController')


const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.get('/heroes', allHeroes)

app.post('/upload', uploadImage)

app.post('/hero', newHero)

app.delete('/deleteImg', delImg)

app.listen(port, () => {
  console.log(`Port ${port}`)
})