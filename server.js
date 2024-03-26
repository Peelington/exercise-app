const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt } = require('express-jwt')
const path = require("path")

require('dotenv').config()

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "__dist")))

mongoose.set('strictQuery', false)

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true})
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "__dist", "index.html"));
});

app.listen(9000, () => {
  console.log('Server is running on local port 9000')
})
