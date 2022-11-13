const Router = require('express')
const socialVkAuthController = require('../../controllers/socialVkAuthController')
const authMiddleware = require('../../middleware/auth.Middleware')
const router = new Router()

//Method POST to create
router.post('/social_auth', socialVkAuthController.authAndRegistrationSocialVk)

module.exports = router