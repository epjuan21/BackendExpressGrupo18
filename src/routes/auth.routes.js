const express = require('express')
const router = express.Router()
const msg = require('../helpers/messages')
const User = require('../models/user')
const authService = require('../services/auth.service')
const { check, validationResult } = require('express-validator')

router.get('/profile', async (req, res) => {
    try {
        const user = new User(req.body)
        res.send('bien')
    } catch (error) {
        res.send(error)
    }
})

router.post('/register', [
    check('name', 'El nombre debe vener mas de 2 caracteres').isLength({min: 2}),
    check('email', 'Email no valido').isEmail(),
    check('password', 'Contraseña debil').isStrongPassword()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    try {
        const user = new User(req.body)
        const token = await authService.register(user)
        res.status(token.code).json(token);
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body
        if(!email || !password) {
            res.status(400).json(msg.fieldsRequired)
        }
        const token = await authService.login(req.body)
        res.status(token.code).json(token)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router