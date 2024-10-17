const express = require('express')
const db = require('../database/db.js')
const { register, login, logout } = require('../controller/auth.js')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router
