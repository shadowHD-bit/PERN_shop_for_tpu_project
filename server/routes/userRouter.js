const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/auth.Middleware')

//Method POST to create
router.post('/registration', userController.registration)
router.post('/login', userController.login)

//Method GET to get auth
router.get('/auth', authMiddleware,userController.checkAuth)


module.exports = router