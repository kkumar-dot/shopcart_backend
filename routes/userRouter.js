// import controllers user
const req = require('express/lib/request')
const userController = require('../controllers/user.controller.js')

// router
const router = require('express').Router()

// use routers
router.post('/signup', userController.signUp)
router.post('/login', userController.login)


module.exports = router