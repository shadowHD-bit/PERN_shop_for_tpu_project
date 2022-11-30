const Router = require('express')
const socialGoogleAuthController = require('../../controllers/socialGoogleAuthController')
const authMiddleware = require('../../middleware/auth.Middleware')
const router = new Router()

//Method POST to create
router.post('/social_auth', socialGoogleAuthController.authAndRegistrationSocialGoogle)

module.exports = router