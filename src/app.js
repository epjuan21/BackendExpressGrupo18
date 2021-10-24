const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/auth.routes')

// Configuraciones
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(cors())

// Routes
app.use('/auth', authRoutes)

// Inicio del Servidor
app.listen(app.get('port'), () => {
    console.log("Server Running")
})