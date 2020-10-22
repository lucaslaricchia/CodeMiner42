import express from 'express'
import cors from 'cors'
import 'reflect-metadata'
import 'express-async-errors'
import routes from './routes.js'
import errorHandler from './errors/handler.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorHandler)

module.exports = app;