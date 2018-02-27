const express = require('express')
const model = require('./model')

const app = express()

app.get('/products', (request, response) => {
  model.Product.findAll()
    .then((products) => {
      response.json(products)
    })
})

const PORT = 4000

app.listen(4000, () => {
  console.log(`Listening on PORT ${4000}`)
})
