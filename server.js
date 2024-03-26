const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt } = require('express-jwt')
require('dotenv').config()

app.use(express.json())
app.use(morgan('dev'))

mongoose.set('strictQuery', false)

async function connectToDB() {
  try {
    await mongoose.connect('mongodb+srv://altonpeel123:yyG7ZKXm9LgMu73H@cluster0.ayubfzt.mongodb.net/')
  } catch (err) {
    console.log(err)
  }
}

connectToDB().then(() => console.log('Connected To DB'))

//routes
app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api/goal', require('./routes/goalRouter.js'))
app.use('/api/home', require('./routes/savedRouter.js'))

app.use((err, req, res, next) => {
  console.log(err)
  if (err.name === "UnauthorizedError") {
    res.status(err.status)
  }
  return res.send({ errMsg: err.message })
})

app.listen(9000, () => {
  console.log('Server is running on local port 9000')
})
