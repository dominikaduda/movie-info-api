const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const movieInteractionRouter = require('./routers/movieInteraction')
const movieRouter = require('./routers/movie')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(movieInteractionRouter)
app.use(movieRouter)

module.exports = app