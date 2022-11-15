const express = require('express')
const logger = require('./middleware/logger')
const { notFound, errorHandler } = require('./middleware/errors') 
const connectToDB = require("./config/db")
require('dotenv').config()
const path = require('path')

connectToDB()


const app = express()

app.use(express.static(path.join(__dirname, 'Image' )))

app.use(express.json())
app.use(logger)


app.use('/books', require('./routes/books'))
app.use('/authors', require('./routes/authors'))
app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/upload', require('./routes/upload'))


// Error Handler Middleware
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`)
})