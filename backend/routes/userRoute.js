const express = require('express')
const router = express()
const {
    signinUser,
    signupUser,
    updateUser
} = require('../controllers/userController')
const isAuth = require('../utils')

router.post('/signin', signinUser)

router.post('/signup', signupUser)

router.put('/profile',isAuth,  updateUser)


module.exports = router