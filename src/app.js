const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
const authRoutes = require('./routes/auth.routes')

// Configuraciones
app.set('port', process.env.PORT || 3000)
mongoose.connect(process.env.DB_STRING)
    .then(db => console.log('Connected to Database'))
    .catch(err => console.error(err))

// Middlewares
app.use(morgan('dev'))
app.use(cors())

// Routes
app.use('/auth', authRoutes)

// Inicio del Servidor
app.listen(app.get('port'), () => {
    console.log("Server Running")
})