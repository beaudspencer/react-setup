require('dotenv/config')
const express = require('express')

const app = express()

app.use(express.static('public'))

app.listen(process.env.PORT, () => {
  console.log('Listeneing on port', process.env.PORT)
})
